from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import os
import joblib
import numpy as np

# ─── Environment Setup ─────────────────────────
load_dotenv()
port = int(os.getenv("PORT", 5000))  # default port

# ─── Flask App Initialization ─────────────────
app = Flask(__name__)
CORS(app)

# ─── Global Model References ──────────────────
ats_model = None
role_encoder = None
bert_model = None

# ─── Lazy Load Models ─────────────────────────
def load_models():
    global ats_model, role_encoder, bert_model
    if ats_model is None:
        ats_model = joblib.load("ats_model.pkl")
    if role_encoder is None:
        role_encoder = joblib.load("role_encoder.pkl")
    if bert_model is None:
        from sentence_transformers import SentenceTransformer
        bert_model = SentenceTransformer('all-MiniLM-L6-v2')

# ─── Prediction Route ─────────────────────────
@app.route("/predict", methods=["POST"])
def predict():
    data = request.get_json()
    resume_text = data.get("resume_text", "")
    job_desc = data.get("job_desc", "")
    role = data.get("role", "")

    if not resume_text or not job_desc or not role:
        return jsonify({"error": "Resume text, job description, and role are required!"}), 400

    # Ensure models are loaded only once
    load_models()

    try:
        role_encoded = role_encoder.transform([role])[0]
    except ValueError:
        role_encoded = -1

    # Encode resume and job description
    resume_embedding = bert_model.encode(resume_text)
    job_desc_embedding = bert_model.encode(job_desc)

    input_features = np.hstack((resume_embedding, job_desc_embedding, [role_encoded]))
    ats_score = ats_model.predict([input_features])[0]
    ats_score = round(float(ats_score), 2)

    return jsonify({
        "score": ats_score,
        "suggestions": []  # Placeholder for future
    })

# ─── Run the App ──────────────────────────────
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=port, debug=False)  # Set debug=False in prod
