import pickle
import json
import numpy as np
import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS

# --- Configuration ---
app = Flask(__name__)
# Enable CORS for all routes, allowing the React frontend (running on a different port) to access it
CORS(app) 

# Define the expected feature names in the order your model expects them
# This list MUST match the order and number of features the model was trained on (13 features)
FEATURE_NAMES = [
    'age', 'sex', 'cp', 'trestbps', 'chol', 'fbs', 'restecg', 'thalach', 
    'exang', 'oldpeak', 'slope', 'ca', 'thal'
]

# --- Model Loading ---
model = None
try:
    # IMPORTANT: Ensure your model file is in the same directory as this app.py file
    with open('HeartDiseaseClassification.pkl', 'rb') as f:
        model = pickle.load(f)
    print("Model loaded successfully: HeartDiseaseClassification.pkl")
except FileNotFoundError:
    print("ERROR: Model file not found. Please ensure 'HeartDiseaseClassification.pkl' is in the same directory.")
except Exception as e:
    print(f"ERROR: Could not load model. Check the file format. Details: {e}")

# --- API Endpoint ---

@app.route('/predict', methods=['POST'])
def predict_heart_disease():
    if not model:
        return jsonify({
            "error": "Model failed to load.",
            "message": "Check the server console for model loading errors."
        }), 500

    try:
        # 1. Get JSON data from the request body
        data = request.get_json(force=True)
        print(f"Received data: {data}")

        # 2. Extract and prepare features for the model
        
        # Ensure all expected features are present and convert them to float/int
        features = []
        for feature_name in FEATURE_NAMES:
            # We convert the incoming string values (from HTML form) to float
            try:
                features.append(float(data[feature_name]))
            except KeyError:
                return jsonify({
                    "error": "Missing feature", 
                    "message": f"Required feature '{feature_name}' is missing from the request."
                }), 400
            except ValueError:
                return jsonify({
                    "error": "Invalid data type", 
                    "message": f"Value for '{feature_name}' must be a valid number."
                }), 400
        
        # Convert the single list of features into a 2D numpy array 
        # (required format for scikit-learn models: [[feature1, feature2, ...]])
        feature_array = np.array([features])

        # 3. Make prediction
        
        # Predict the class (0 or 1)
        prediction_class = model.predict(feature_array)[0]
        
        # Predict the probability of the positive class (1 = disease)
        # Note: Check your model's output format. predict_proba usually returns [[prob_0, prob_1]]
        prediction_proba = model.predict_proba(feature_array)[0][1]
        
        # 4. Format and return the response
        response = {
            "prediction": int(prediction_class), # Ensure it's a standard Python int
            "probability": float(prediction_proba) # Ensure it's a standard Python float
        }
        
        return jsonify(response)

    except Exception as e:
        print(f"An unexpected error occurred during prediction: {e}")
        return jsonify({
            "error": "Internal server error",
            "message": str(e)
        }), 500

# To run the server locally:
if __name__ == '__main__':
    # Running on port 5000 is common for Flask APIs
    # This also allows your React app (e.g., on port 3000) to communicate with it.
    app.run(debug=True, port=5000)
