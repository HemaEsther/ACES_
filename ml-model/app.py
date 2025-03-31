from flask import Flask, request, jsonify
import joblib
import numpy as np
from sentence_transformers import SentenceTransformer

# Load pre-trained model & encoder
ats_model = joblib.load("ats_model.pkl")
role_encoder = joblib.load("role_encoder.pkl")
bert_model = SentenceTransformer('all-MiniLM-L6-v2')

app = Flask(__name__)

@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    resume_text = data.get("resume_text", "")
    job_desc = data.get("job_desc", "")
    role = data.get("role", "")

    if not resume_text or not job_desc or not role:
        return jsonify({"error": "Resume text, job description, and role are required!"}), 400

    try:
        role_encoded = role_encoder.transform([role])[0]
    except ValueError:
        role_encoded = -1

    resume_embedding = bert_model.encode(resume_text)
    job_desc_embedding = bert_model.encode(job_desc)

    input_features = np.hstack((resume_embedding, job_desc_embedding, [role_encoded]))
    ats_score = ats_model.predict([input_features])[0]
    ats_score = round(float(ats_score), 2)

    return jsonify({
        "score": ats_score,
        "suggestions": [],  # Add empty array
        # Optionally remove "message" if not needed
    })

from dotenv import load_dotenv
import os

load_dotenv()  # Load environment variables from .env

port = int(os.getenv("PORT", 5000))  # Default to 5000 if not set


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))  # Default to 5000 if PORT is not set
    app.run(host="0.0.0.0", port=port, debug=True)
