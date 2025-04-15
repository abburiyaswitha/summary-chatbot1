export async function POST(req) {
    const body = await req.json();
    const response = await fetch("http://localhost:8000/api/summarize", 
        {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
  
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  }
  