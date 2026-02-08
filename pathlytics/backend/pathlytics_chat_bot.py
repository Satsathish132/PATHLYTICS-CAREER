# backend/pathlytics_chatbot.py
import os
from groq import Groq
from flask import Flask, request, jsonify
from flask_cors import CORS

GROQ_API_KEY = "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"

print("PATHLYTICS BOT v2.0 (Website-Aware)")
client = Groq(api_key=GROQ_API_KEY)
print("Groq connected!")

SITE_FILE = "site_content.txt"

if not os.path.exists(SITE_FILE):
    print(f"❌ {SITE_FILE} not found! Create it with text from your Netlify site.")
    raise SystemExit

with open(SITE_FILE, "r", encoding="utf-8") as f:
    site_text = f.read()

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

# Flask app to expose this as an API
app = Flask(__name__)
CORS(app)  # allow requests from your frontend locally

# Keep conversation messages in memory (simple)
messages = [
    {"role": "system", "content": SYSTEM_PROMPT}
]

@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "PATHLYTICS Backend API is running!", "endpoint": "/chat"})

@app.route("/chat", methods=["POST"])
def chat():
    global messages

    data = request.get_json()
    user_message = data.get("message", "").strip()

    if not user_message:
        return jsonify({"reply": "Please type something to start chatting with Pathlytics Bot."})

    messages.append({"role": "user", "content": user_message})

    reply = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=messages,
        temperature=0.4,
        max_tokens=800
    )

    answer = reply.choices[0].message.content.strip()
    messages.append({"role": "assistant", "content": answer})

    return jsonify({"reply": answer})

if __name__ == "__main__":
    print("Starting Pathlytics backend API on http://localhost:5000 ...")
    app.run(host="127.0.0.1", port=5000, debug=False)
