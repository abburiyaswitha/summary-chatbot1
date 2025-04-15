import requests

SERPER_API_KEY = "3168c96c1dfcb3f06e06ca29cd2cb558abbd18b8"

def fetch_search_results(query):
    url = "https://google.serper.dev/search"
    headers = {
        "X-API-KEY": SERPER_API_KEY,
        "Content-Type": "application/json"
    }
    payload = {
        "q": query
    }

    response = requests.post(url, headers=headers, json=payload)
    response.raise_for_status()

    results = response.json()

    if "organic" in results and len(results["organic"]) > 0:
        first_result = results["organic"][0]
        return {
            "title": first_result.get("title"),
            "link": first_result.get("link"),
            "snippet": first_result.get("snippet")
        }
    else:
        return {"message": "No results found."}
