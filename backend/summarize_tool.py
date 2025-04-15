import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-pro")

def summarize_content(content: str):
    prompt = f"Summarize the following website content:\n\n{content}"
    response = model.generate_content(prompt)
    return response.text
