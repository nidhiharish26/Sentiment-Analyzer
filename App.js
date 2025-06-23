import React, { useState } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!text.trim()) return;

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error analyzing text:", error);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  const getEmoji = (sentiment) => {
    if (sentiment === "Positive") return "😄";
    if (sentiment === "Negative") return "😞";
    return "😐"; // for Neutral
  };

  return (
    <div className="outer">
      <div className="App">
        <h1>Sentiment Analyzer</h1>

        <textarea
          rows="5"
          placeholder="Type your sentence here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button onClick={handleAnalyze} disabled={loading}>
          {loading ? "Analyzing..." : "Analyze Sentiment"}
        </button>

        {result && (
          <div className="result">
            <p className={result.sentiment.toLowerCase()}>
              <strong>Sentiment:</strong> {result.sentiment}{" "}
              {getEmoji(result.sentiment)}
            </p>
            <p>
              <strong>Polarity:</strong> {result.polarity}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
