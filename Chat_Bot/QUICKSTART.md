# 🚀 Quick Start Guide

## 1️⃣ Get Your API Key (2 minutes)

- Go to [Google AI Studio](https://aistudio.google.com/)
- Click "Create API key"
- Copy your free API key

## 2️⃣ Setup (1 minute)

### Option A: Using .env file (Recommended)
```powershell
# Create .env file with your API key
"GEMINI_API_KEY=your_api_key_here" | Out-File -Encoding UTF8 .env
```

### Option B: Set Environment Variable
```powershell
$env:GEMINI_API_KEY = 'your_api_key_here'
```

## 3️⃣ Install Dependencies

```powershell
pip install -r requirements.txt
```

## 4️⃣ Run the Chatbot

```powershell
python chatbot.py
```

## 5️⃣ Start Getting Career Advice!

Once running, just type your questions and the AI career counselor will help you:
- ✨ Explore career options based on your interests
- 📚 Understand educational requirements
- 🎯 Get a roadmap for your career journey
- 💡 Learn about industry trends

Example topics:
- "I'm interested in AI and want to know what careers I can pursue"
- "What skills do I need to become a data scientist?"
- "I love helping people, what careers should I consider?"
- "What's the job market like for software engineers?"

**Type 'quit' to exit**

---

## 💻 System Requirements

- Python 3.8 or higher
- Internet connection (for API calls)
- Valid Google Gemini API key (free)

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| "GEMINI_API_KEY not set" | Make sure you created .env file or set environment variable |
| "Module not found" | Run `pip install -r requirements.txt` |
| "Connection error" | Check your internet connection |
| "API key not working" | Get a new key from google.ai.studio.com |

## 📞 Need Help?

Check the main [README.md](README.md) for more details!
