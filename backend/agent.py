import os
from dotenv import load_dotenv
import google.generativeai as genai

from utils.fetch_content import fetch_search_results

load_dotenv()


GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY not found in environment variables")


genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-1.5-pro")
conversation_memory = {}

def summarize_topic(user_id, query):
    search_result = fetch_search_results(query)

    if "message" in search_result:
        return search_result["message"]

    content = f"Title: {search_result['title']}\n\nSnippet: {search_result['snippet']}\n\nLink: {search_result['link']}"
    prompt = f"Summarize the following content:\n\n{content}"

    try:
        response = model.generate_content(prompt)
        summary = response.text if hasattr(response, "text") else "Error: No summary returned from Gemini."
    except Exception as e:
        summary = f"Error generating summary: {str(e)}"


    if user_id not in conversation_memory:
        conversation_memory[user_id] = []

    conversation_memory[user_id].append({
        "query": query,
        "summary": summary,
        "link": search_result['link']
    })

    return summary
