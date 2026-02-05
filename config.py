"""
Config module for PATHLYTICS Career Recommendation Chatbot
"""
import os
from pathlib import Path

# Try to load from .env file
try:
    from dotenv import load_dotenv
    env_path = Path(__file__).parent / '.env'
    if env_path.exists():
        load_dotenv(env_path)
except ImportError:
    pass

# Configuration
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY', '').strip()
MODEL_NAME = "gemini-2.0-flash"
MAX_TOKENS = 1024
TEMPERATURE = 0.7

# Validate API key
if not GEMINI_API_KEY:
    print("⚠️  Warning: GEMINI_API_KEY not found!")
    print("\nTo set up your API key:")
    print("1. Go to https://aistudio.google.com/")
    print("2. Get your free API key")
    print("3. Create a .env file with: GEMINI_API_KEY=your_key_here")
    print("   OR set environment variable: set GEMINI_API_KEY=your_key_here")
