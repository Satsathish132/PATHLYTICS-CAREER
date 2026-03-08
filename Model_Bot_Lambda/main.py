import os
import re
from typing import Any

import httpx
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from groq import Groq

from collections import defaultdict

conversation_store: dict[str, list[dict[str, str]]] = defaultdict(list)

load_dotenv()

SITE_FILE = "site_content.txt"

if not os.path.exists(SITE_FILE):
    raise RuntimeError(f"{SITE_FILE} not found. Please create it with your Pathalytics site content.")

with open(SITE_FILE, "r", encoding="utf-8") as f:
    SITE_TEXT = f.read()


GROQ_API_KEY = os.getenv("GROQ_API_KEY")

client = Groq(api_key=GROQ_API_KEY)  # uses Groq chat API[web:11][web:14]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # set your domain in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class ChatRequest(BaseModel):
    message: str
    current_page: str | None = None
    user_level: str | None = None
    session_id: str | None = "default"


class ChatResponse(BaseModel):
    reply: str
    intent: str | None = None
    target_url: str | None = None
    has_roadmap_json: bool = False

class RoadmapImageRequest(BaseModel):
    roadmap_spec: dict
    prompt: str | None = None


class RoadmapImageResponse(BaseModel):
    image_url: str

SYSTEM_PROMPT = f"""
You are the PATHLYTICS Career Bot mainly for Indian students and also support global students.

Primary knowledge source:
- You SHOULD prioritize and clearly use information from the PATHLYTICS site content below whenever it is relevant.
- You MAY also use your broader knowledge about careers, skills, degrees, and the job market to give richer, more practical guidance.
- When you go beyond the site content, keep your advice realistic and aligned with what Indian CS students typically face.

You MUST NOT contradict the PATHLYTICS site content.
If something in your broader knowledge conflicts with the site content, follow the site content.

----- WEBSITE CONTENT START -----
{SITE_TEXT}
----- WEBSITE CONTENT END -----

Your goals:
- Explain what PATHLYTICS-Career offers.
- Help users understand the available careers and roadmaps listed in the site content.
- Guide users to pick suitable roles from the careers/roadmaps that exist in the content.
- Also provide extra helpful context:
  - Typical daily responsibilities for each role.
  - Common tech stacks and tools used in industry.
  - Typical entry paths (degrees, bootcamps, internships, self-learning).
  - Realistic salary ranges and growth trends in India and globally (approximate, not guaranteed).
  - Example projects or portfolios that make a student stand out.
- Keep everything especially relevant to Indian Computer Science students and job seekers, but do not exclude global students.

Important behaviour:
- Do NOT invent completely new career titles or fake features that are not in the site content.
- You MAY talk about closely related concepts (for example: internships, freelancing, typical interview rounds, common frameworks) even if they are not literally listed in the site text.
- If a user asks for a very specific thing that contradicts the site content, clearly say you are not sure and that it is not in the PATHLYTICS site yet.
- When the user’s question is too broad or unclear, ask one simple follow-up question to clarify.

How to describe career paths (combine site content + extra knowledge):
- Start from the PATHLYTICS card-style info when available:
  - Demand (High Demand, Very High Demand)
  - Summary
  - Key skills
  - Salary range
  - Growth percentage
  - Education level if present
- Then add 2–4 more helpful details from your broader knowledge, such as:
  - Typical daily tasks for that role.
  - Common beginner → intermediate → advanced progression.
  - Example tools, libraries, or frameworks used in the industry.
  - Example projects or certifications that are valuable.

Only talk in detail about these careers if asked or clearly relevant:
  - AI/ML Engineer
  - Full Stack Developer
  - Cloud Solutions Architect
  - Data Scientist
  - Cybersecurity Analyst
  - DevOps Engineer

Only talk in detail about these roadmaps if asked or clearly relevant:
  - Frontend Developer
  - Backend Developer
  - Cloud Engineer
  - ML Engineer
  - Security Engineer

Style guidelines:
- Use simple, clear sentences that a college student in India can understand.
- Keep answers focused, but you can write 5–10 sentences when the user wants a deeper explanation.
- When a user asks “tell me more” or “give detailed information”, you SHOULD add extra context from your broader knowledge while staying realistic.
- It is okay to say "I’m not sure, this is not in the PATHLYTICS site yet." when the content is missing or very specific.
"""

SYSTEM_PROMPT = SYSTEM_PROMPT + """
Conversation behaviour:
- Remember what the user already told you in this chat (skills, interests, confusion).
- Do NOT ask the same clarification question again if the user already answered it.
- When the user compares options (like CSE vs AIDS vs CSBS), give a clear, direct recommendation and explain briefly WHY.
- For someone who knows Python, SQL, and frontend and is confused between CSE, AIDS, and CSBS:
  - Say that CSE gives the broadest base and keeps all options open.
  - Explain that AIDS is best if they are sure about AI/data.
  - Explain that CSBS is best if they love tech + business.
- Use 3–8 sentences, focused and personal, instead of repeating generic lists.
"""


MODEL_NAME = "llama-3.3-70b-versatile"  # good general chat model on Groq[web:11][web:14]


def parse_navigation(reply_text: str) -> tuple[str, str | None]:
    """
    Extract NAVIGATE:/path if present at the end of the model reply.
    Example:
      'You can check the detailed roadmap.\n\nNAVIGATE:/roadmaps/data-scientist'
    """
    target_url = None
    lines = reply_text.strip().splitlines()
    if lines and lines[-1].startswith("NAVIGATE:"):
        target_url = lines[-1].replace("NAVIGATE:", "").strip()
        # remove navigation marker from visible reply
        reply_text = "\n".join(lines[:-1]).strip()
    return reply_text, target_url

ROADMAP_JSON_PATTERN = re.compile(r"```json(.*?)```", re.DOTALL)
def detect_roadmap_json(reply_text: str) -> bool:
    return bool(ROADMAP_JSON_PATTERN.search(reply_text))

@app.post("/api/chat", response_model=ChatResponse)
async def chat_endpoint(req: ChatRequest):
    session_id = req.session_id or "default"

    # initialize history with system prompt
    if not conversation_store[session_id]:
        conversation_store[session_id].append(
            {"role": "system", "content": SYSTEM_PROMPT}
        )

    user_context = f"(Current page: {req.current_page}, Level: {req.user_level})"
    user_message = f"{user_context}\n\nUser: {req.message}"

    conversation_store[session_id].append({"role": "user", "content": user_message})

    chat_completion = client.chat.completions.create(
        model=MODEL_NAME,
        messages=conversation_store[session_id],
        temperature=0.4,
        max_completion_tokens=512,
        top_p=1,
        stream=False,
    )

    reply_text = chat_completion.choices[0].message.content.strip()

    # save assistant reply into history BEFORE parsing NAVIGATE etc.
    conversation_store[session_id].append(
        {"role": "assistant", "content": reply_text}
    )

    reply_text, target_url = parse_navigation(reply_text)
    has_roadmap = detect_roadmap_json(reply_text)

    if target_url:
        intent = "navigation"
    elif has_roadmap:
        intent = "roadmap"
    else:
        intent = "career_guidance"

    return ChatResponse(
        reply=reply_text,
        intent=intent,
        target_url=target_url,
        has_roadmap_json=has_roadmap,
    )


@app.post("/api/roadmap-image", response_model=RoadmapImageResponse)
async def generate_roadmap_image(req: RoadmapImageRequest):
    # TODO: replace with your real image provider
    async with httpx.AsyncClient() as http:
        resp = await http.post(
            "https://api.example.com/v1/text2image",
            json={
                "prompt": req.prompt or f"Career roadmap diagram: {req.roadmap_spec.get('title', '')}",
                "metadata": req.roadmap_spec,
            },
            timeout=60,
        )
        resp.raise_for_status()
        data: Any = resp.json()
        image_url = data["image_url"]
    return RoadmapImageResponse(image_url=image_url)
