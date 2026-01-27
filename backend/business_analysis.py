import pandas as pd
from collections import Counter
import re

DATA_PATH = "data/processed/final_absa_results.csv"

STOPWORDS = {...}
PROBLEM_WORDS = {...}

def load_data():
    return pd.read_csv(DATA_PATH)

# 1️⃣ Aspect sentiment distribution
def aspect_sentiment_distribution(df):
    dist = (
        df.groupby(["aspect", "sentiment"])
          .size()
          .reset_index(name="count")
    )
    dist["percentage"] = (
        dist.groupby("aspect")["count"]
        .transform(lambda x: round(100 * x / x.sum(), 2))
    )
    return dist

# 2️⃣ Rating vs aspect mismatch
def rating_mismatch(df, min_rating=4):
    high_rating = df[df["Rating"] >= min_rating]
    negative = high_rating[high_rating["sentiment"] == "negative"]

    mismatch_rate = round(
        100 * negative["e"].nunique() / high_rating["e"].nunique(), 2
    )

    aspect_causes = (
        negative["aspect"]
        .value_counts()
        .reset_index()
        .rename(columns={"index": "aspect", "aspect": "count"})
    )

    return mismatch_rate, aspect_causes

# 3️⃣ Root cause keywords
def root_causes(df, top_n=10):
    negative = df[df["sentiment"] == "negative"]
    results = {}

    for aspect in negative["aspect"].unique():
        texts = negative[negative["aspect"] == aspect]["sentence"]
        words = []

        for text in texts:
            tokens = re.findall(r"\b[a-z]{3,}\b", str(text).lower())
            words.extend([
                w for w in tokens
                if w not in STOPWORDS and w in PROBLEM_WORDS
            ])

        results[aspect] = Counter(words).most_common(top_n)

    return results