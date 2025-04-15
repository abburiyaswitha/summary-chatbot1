// frontend/lib/api.ts
export async function summarize(query: string): Promise<string> {
  const res = await fetch("http://127.0.0.1:8000/summarize", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: "user1", query }),
  });
  if (!res.ok) throw new Error(`Backend error: ${res.status}`);

  const data = await res.json();
  return data.summary as string;
}