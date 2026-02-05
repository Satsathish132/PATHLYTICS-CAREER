import os
print("PATHLYTICS BOT v1.0")
from groq import Groq
client = Groq(api_key=os.getenv('GROQ_API_KEY'))
print("Groq connected!")

prompt = """PATHLYTICS Career Bot for Indian students.
Knows JEE, NEET, CUET, college admissions, Python careers."""

print("\n=== PATHLYTICS CAREER ADVISOR ===")
print("Class 12? Skills? Ask away! 'quit' to exit")

messages = [{"role": "system", "content": prompt}]
while 1:
    user = input("\nYou: ")
    if 'quit' in user.lower(): 
        print("Bye! Good luck with admissions!")
        break
    messages += [{"role": "user", "content": user}]
    reply = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=messages
    )
    print("\nAI:", reply.choices[0].message.content)
    messages += [{"role": "assistant", "content": reply.choices[0].message.content}]
