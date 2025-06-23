# backend/app.py

from flask import Flask, request, jsonify
from flask_cors import CORS
from textblob import TextBlob

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend access

@app.route('/analyze', methods=['POST'])
def analyze_sentiment():
    data = request.get_json()
    text = data.get("text", "")
    
    if not text:
        return jsonify({"error": "No text provided"}), 400

    blob = TextBlob(text)
    polarity = blob.sentiment.polarity

    sentiment = "Positive" if polarity > 0 else "Negative" if polarity < 0 else "Neutral"

    return jsonify({
        "text": text,
        "polarity": polarity,
        "sentiment": sentiment
    })

if __name__ == '__main__':
    app.run(debug=True)
