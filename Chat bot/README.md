# 🎯 PATHLYTICS-CAREER: AI Educational Career Recommendation Chatbot

An intelligent AI-powered career counselor that provides personalized educational career recommendations, guidance, and pathways for professional development.

## 📋 Features

- **Personalized Career Guidance**: Get tailored career recommendations based on your skills, interests, and goals
- **Educational Pathways**: Clear roadmaps for educational requirements to reach your target career
- **Skill Development**: Recommendations for skills to develop and certifications to pursue
- **Industry Insights**: Stay informed about job market trends and industry demand
- **Interactive Conversation**: Natural, conversational dialogue with an experienced career counselor
- **Multi-turn Q&A**: Maintains conversation context for coherent guidance over multiple exchanges

## 🚀 Getting Started

### Prerequisites

- Python 3.8+
- Google Gemini API key (free tier available at [Google AI Studio](https://aistudio.google.com/))
- Required packages: `google-genai`

### Installation

1. **Clone the repository** (if applicable):
```bash
git clone https://github.com/Satsathish132/PATHLYTICS-CAREER.git
cd PATHLYTICS-CAREER
```

2. **Set up your API key**:
   - Get your free API key from [Google AI Studio](https://aistudio.google.com/)
   - Set the environment variable:
     ```powershell
     # Windows PowerShell
     $env:GEMINI_API_KEY = 'your_api_key_here'
     
     # Or permanently add it to your system environment variables
     ```

3. **Install dependencies**:
```bash
pip install google-genai
```

### Usage

Run the chatbot:
```bash
python chatbot.py
```

### Example Conversation

```
👋 Welcome to the Educational Career Recommendation Chatbot!

You: I'm interested in technology and love problem-solving. I'm currently a high school student.

🤖 Counselor: That's great! Technology and problem-solving are excellent foundations for many rewarding careers. 
To give you better guidance, could you tell me more about:
1. Which aspects of technology interest you most? (e.g., software development, data science, AI, cybersecurity, web development)
2. Do you prefer working with people or solving problems independently?
3. Are you more interested in working on creative projects or infrastructure/systems?

You: I love building things and AI excites me. I prefer collaborative work.

🤖 Counselor: Perfect! Based on your interests, here are some career paths to consider:
...
```

## 📚 Career Topics Covered

The chatbot can provide guidance on:

- **Technology Careers**: Software Engineering, Data Science, AI/ML, Cybersecurity, Web Development, Cloud Computing
- **Business & Finance**: Business Analysis, Financial Analysis, Management Consulting, Entrepreneurship
- **Healthcare**: Medicine, Nursing, Biomedical Engineering, Health Informatics
- **Engineering**: Civil, Mechanical, Electrical, Chemical Engineering
- **Education**: Teaching, Curriculum Design, Educational Technology
- **Creative Fields**: Product Design, UX/UI, Animation, Game Development
- **And many more!**

## 🎓 What the Chatbot Can Help With

1. **Career Exploration**: Discover careers aligned with your interests
2. **Educational Planning**: Understand degree requirements and educational pathways
3. **Skill Assessment**: Identify skills needed for target careers
4. **Next Steps**: Get actionable recommendations for your career journey
5. **Industry Insights**: Learn about job market trends and salary ranges
6. **Certifications**: Find relevant certifications to boost your career

## 💡 Tips for Best Results

- **Be specific**: Share details about your skills, interests, and goals
- **Ask follow-ups**: The chatbot learns from context, so follow-up questions get better answers
- **Discuss challenges**: Share any concerns about careers you're considering
- **Explore options**: Don't hesitate to ask about alternative career paths
- **Update information**: Tell the chatbot if your interests change during the conversation

## 🔧 Customization

You can customize the system prompt in `chatbot.py` to:
- Focus on specific regions or countries
- Add specific industry expertise
- Adjust the tone or style of advice
- Include additional counseling frameworks

## 📝 Environment Variables

- `GEMINI_API_KEY`: Your Google Gemini API key (required)

## 🛠️ Troubleshooting

### "GEMINI_API_KEY not set" error
- Ensure you've set the environment variable before running the script
- Check that your API key is valid at [Google AI Studio](https://aistudio.google.com/)

### "Module not found" error
- Install google-genai: `pip install google-genai`

### Poor quality responses
- Ensure you're providing enough context about yourself
- Try being more specific in your questions
- The chatbot improves with more context in the conversation

## 📄 Requirements

```
google-genai>=1.0.0
```

## 🤝 Contributing

Feel free to fork this project and submit pull requests for improvements!

## 📄 License

This project is open source and available under the MIT License.

## 📧 Support

For questions or issues, please open an issue on GitHub or contact the repository owner.

---

**Made with ❤️ for students and career seekers everywhere** 🚀