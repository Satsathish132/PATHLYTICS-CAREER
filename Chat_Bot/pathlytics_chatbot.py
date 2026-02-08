import os
from groq import Groq

GROQ_API_KEY= "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"

print("PATHLYTICS BOT v2.0 (Website-Aware)")
client = Groq(api_key= GROQ_API_KEY)
print("Groq connected!")

# 1) Load your website content from local file
SITE_FILE = "site_content.txt"

if not os.path.exists(SITE_FILE):
    print(f"❌ {SITE_FILE} not found! Create it with text from your Netlify site.")
    raise SystemExit

with open(SITE_FILE, "r", encoding="utf-8") as f:
    site_text = f.read()

# 2) Build system prompt that forces answers based on the website
SYSTEM_PROMPT = f"""
You are the PATHLYTICS Career Bot for Indian students.

You MUST answer ONLY using information from the following website content.
If the user asks something that is not covered by this content, say:
"I’m not sure, this is not in the PATHLYTICS site yet."

----- WEBSITE CONTENT START -----
{site_text}
----- WEBSITE CONTENT END -----

Answer clearly, in simple language, and keep it relevant to Indian students.
"""

print("\n=== PATHLYTICS CAREER ADVISOR (Website Mode) ===")
print("I will answer only using info from our project website.")
print("Ask about features, how it works, or what the site offers. Type 'quit' to exit.\n")

messages = [
    {"role": "system", "content": SYSTEM_PROMPT}
]

while True:
    user = input("You: ").strip()
    if user.lower() in ["quit", "exit", "bye"]:
        print("Bye! Thanks for exploring the PATHLYTICS website bot!")
        break

    if not user:
        continue

    messages.append({"role": "user", "content": user})

    reply = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=messages,
        temperature=0.4,   # more grounded
        max_tokens=800
    )

    answer = reply.choices[0].message.content.strip()
    print("\nAI:", answer, "\n")
    messages.append({"role": "assistant", "content": answer})