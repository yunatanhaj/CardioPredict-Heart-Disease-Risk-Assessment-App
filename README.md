# ⚕️ CardioPredict: Heart Disease Risk Assessment App

**CardioPredict** is a full-stack web application designed to predict the risk of heart disease in a patient based on **13 key physiological and health metrics**. This project demonstrates an **end-to-end Machine Learning deployment pipeline**, connecting a modern **React UI** to a **Python-based prediction API**.

The training and validation process for the core ML model is available in the dedicated [Heart Disease Classification Repository](<https://github.com/yunatanhaj/heart-disease-classification.git>).

---

## ✨ Features

* **⚡ Responsive UI:** A clean, engaging, and mobile-friendly interface built with **React** and styled using **Tailwind CSS**.
* **🧠 Predictive Model:** Instantly utilizes a pre-trained **Scikit-learn model** (`HeartDiseaseClassification.pkl`) to predict the presence (**1**) or absence (**0**) of heart disease.
* **📡 Real-time API:** Secure communication via a **POST** request to the **Flask** API for prediction.
* **📊 Clear Results:** Displays the prediction result (**Positive/Negative**) and the associated probability for transparency.

---

## 🛠️ Tech Stack

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React (JSX) | Component-based UI development |
| **Styling** | Tailwind CSS | Utility-first responsive design |
| **Backend** | Python 3.x | Core language for the API |
| **Web Framework** | Flask | Lightweight RESTful API server |
| **ML/Data** | Scikit-learn, NumPy | Model loading and prediction |

---
[Watch the CardioPredict Demo](https://drive.google.com/file/d/1pEF1UX7yg0X5Scerw3P-KT8sA7-noDLW/view?usp=sharing)
