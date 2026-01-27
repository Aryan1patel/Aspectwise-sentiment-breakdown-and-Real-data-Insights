from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import re
from collections import defaultdict
from fastapi.middleware.cors import CORSMiddleware

# --------------------
# App
# --------------------
app = FastAPI(title="ABSA Sentiment API")



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for development only
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --------------------
# Load trained pipeline (TF-IDF + Logistic Regression)
# --------------------
sentiment_model = joblib.load("artifacts/sentiment_model.joblib")

# --------------------
# Schemas
# --------------------
class SentenceInput(BaseModel):
    sentence: str

class ReviewInput(BaseModel):
    review: str

# --------------------
# Utils
# --------------------
def split_sentences(text: str):
    """Split review into sentences"""
    return [s.strip() for s in re.split(r"[.!?]", text) if s.strip()]

def split_clauses(sentence: str):
    """Split sentence on contrast words (CRITICAL for ABSA)"""
    return [
        s.strip()
        for s in re.split(r"\bbut\b|\bhowever\b|\balthough\b|\bthough\b", sentence, flags=re.IGNORECASE)
        if s.strip()
    ]

# --------------------
# Aspect dictionary
# --------------------
ASPECT_DICT = {
    "battery": ["battery", "battery life", "charge", "charging"],
    "camera": ["camera", "photo", "picture", "video"],
    "display": ["screen", "display", "resolution"],
    "performance": ["performance", "speed", "lag", "slow", "fast"],
    "build": ["build quality", "design", "material"],
    "price": ["price", "cost", "value", "worth"]
}

def detect_aspects(text: str):
    text = text.lower()
    return [
        aspect
        for aspect, keywords in ASPECT_DICT.items()
        if any(k in text for k in keywords)
    ]

def aggregate(results):
    """Pick highest-confidence sentiment per aspect"""
    final = {}
    for aspect, entries in results.items():
        best = max(entries, key=lambda x: x["confidence"])
        final[aspect] = best
    return final

# --------------------
# Routes
# --------------------
@app.get("/")
def health():
    return {"status": "ok"}

@app.post("/sentiment")
def predict_sentence_sentiment(data: SentenceInput):
    sentence = data.sentence

    pred = sentiment_model.predict([sentence])[0]
    probs = sentiment_model.predict_proba([sentence])[0]
    confidence = float(max(probs))

    return {
        "sentence": sentence,
        "sentiment": pred,
        "confidence": round(confidence, 3)
    }

@app.post("/absa")
def analyze_review(data: ReviewInput):
    sentences = split_sentences(data.review)

    aspect_results = defaultdict(list)

    for sentence in sentences:
        clauses = split_clauses(sentence)

        for clause in clauses:
            aspects = detect_aspects(clause)
            if not aspects:
                continue

            pred = sentiment_model.predict([clause])[0]
            probs = sentiment_model.predict_proba([clause])[0]
            confidence = float(max(probs))

            for aspect in aspects:
                aspect_results[aspect].append({
                    "sentiment": pred,
                    "confidence": round(confidence, 3),
                    "sentence": clause
                })

    return aggregate(aspect_results)


# Mock insights data (replace with actual data loading when needed)
@app.get("/insights/aspect-distribution")
def aspect_distribution():
    # Mock data based on typical ABSA results
    return [
        {"aspect": "battery", "positive": 25.5, "negative": 52.3, "neutral": 22.2},
        {"aspect": "camera", "positive": 68.7, "negative": 18.4, "neutral": 12.9},
        {"aspect": "display", "positive": 58.2, "negative": 28.1, "neutral": 13.7},
        {"aspect": "performance", "positive": 62.4, "negative": 24.6, "neutral": 13.0},
        {"aspect": "build", "positive": 71.3, "negative": 15.2, "neutral": 13.5},
        {"aspect": "price", "positive": 45.8, "negative": 38.9, "neutral": 15.3},
    ]

@app.get("/insights/rating-mismatch")
def rating_mismatch_api():
    return {
        "mismatch_percentage": 34.7,
        "top_aspects": [
            {"aspect": "battery", "count": 1247},
            {"aspect": "price", "count": 892},
            {"aspect": "performance", "count": 634},
            {"aspect": "display", "count": 421},
            {"aspect": "camera", "count": 318},
        ]
    }

@app.get("/insights/root-causes")
def root_causes_api():
    return {
        "battery": [
            ["dead", 342],
            ["drain", 298],
            ["dies", 276],
            ["poor", 234],
            ["terrible", 198],
            ["bad", 187],
            ["short", 156],
            ["drains", 142],
        ],
        "camera": [
            ["blurry", 89],
            ["poor", 76],
            ["bad", 64],
            ["terrible", 52],
            ["disappointing", 41],
        ],
        "price": [
            ["expensive", 245],
            ["overpriced", 198],
            ["high", 167],
            ["costly", 134],
            ["waste", 98],
        ],
        "performance": [
            ["slow", 312],
            ["lag", 287],
            ["laggy", 234],
            ["freezes", 198],
            ["crashes", 156],
        ],
        "display": [
            ["dim", 123],
            ["dark", 98],
            ["poor", 87],
            ["bad", 76],
        ],
        "build": [
            ["cheap", 145],
            ["flimsy", 112],
            ["poor", 98],
            ["breaks", 87],
        ],
    }

