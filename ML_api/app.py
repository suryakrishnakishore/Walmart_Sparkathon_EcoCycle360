from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pickle
import numpy as np
import pandas as pd

with open("../Model/eco_model.pkl", "rb") as f:
    model = pickle.load(f)

FEATURES = ["Material", "Weight (kg)", "Transport Distance (km)", "Region"]

app = Flask(__name__)
CORS(app)

@app.route("/predict", methods=["POST"])

def predict():
    try:
        data = request.get_json()

        features = data.get("features")
        if not features:
            return jsonify({"error": "'features' key missing"}), 400

        # Convert to DataFrame (must match training column order)
        df = pd.DataFrame([features])

        # Prediction
        prediction = model.predict(df)

        return jsonify({"prediction": prediction.tolist()})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)