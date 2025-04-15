"use client";
import { useState } from "react";
import { summarize } from "./lib/api";

export default function Page() {
  const [query, setQuery] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setSummary("");

    try {
      const result = await summarize(query);
      setSummary(result);
    } catch (error) {
      console.error("Summarization failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <div className="wrapper">
        <section className="container">
          <div className="heading">
            <h1>✨ Website Summarizer Chatbot</h1>
            <p>
              Paste your content or a URL below and let AI give you the gist in
              seconds.
            </p>
          </div>

          <textarea
            rows={5}
            placeholder="Paste content or URL here..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />

          <button onClick={handleSubmit} disabled={loading}>
            {loading ? "Summarizing..." : "🔍 Summarize Now"}
          </button>

          {summary && (
            <div className="output">
              <div className="output-header">
                <h2 className="summary-title">📄 Summary</h2>
              </div>
              <p>{summary}</p>
            </div>
          )}
        </section>
      </div>

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        }

        .wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(to bottom right, #cbdcf9, #fce3f9);
          padding: 2rem;
        }

        .container {
          width: 100%;
          max-width: 600px;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 24px;
          padding: 2rem;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }

        .heading {
          text-align: center;
          margin-bottom: 2rem;
        }

        .heading h1 {
          font-size: 2rem;
          font-weight: bold;
          background: linear-gradient(to right, #6366f1, #a855f7, #ec4899);
          color: transparent;
          background-clip: text;
          -webkit-background-clip: text;
        }

        .heading p {
          color: #4b5563;
        }

        textarea {
          width: 80%;
          margin: 0 auto 1.5rem auto;
          display: block;
          padding: 1rem;
          font-size: 1rem;
          border-radius: 16px;
          border: 1px solid #ccc;
          resize: none;
          background: rgba(255, 255, 255, 0.95);
          text-align: center;
        }

        button {
          display: block;
          margin: 0 auto 2rem auto;
          padding: 0.75rem 2rem;
          font-size: 1rem;
          font-weight: bold;
          color: white;
          background: linear-gradient(to right, #6366f1, #a855f7, #ec4899);
          border: none;
          border-radius: 9999px;
          cursor: pointer;
          transition: transform 0.2s ease;
        }

        button:hover {
          transform: scale(1.05);
        }

        button:disabled {
          opacity: 0.5;
          cursor: wait;
        }

        .output {
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid #fbcfe8;
          padding: 1.25rem;
          border-radius: 16px;
          margin-top: 1.5rem;
        }

        .output-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.75rem;
        }

        .summary-title {
          font-size: 1.2rem;
          font-weight: bold;
          color: #4f46e5;
          margin: 0;
        }

        .output p {
          color: #333;
          font-size: 1rem;
          line-height: 1.6;
          white-space: pre-wrap;
        }
      `}</style>
    </main>
  );
}
