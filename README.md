⚕️ CardioPredict: Heart Disease Risk Assessment AppOverviewCardioPredict is a full-stack web application designed to predict the risk of heart disease in a patient based on 13 key physiological and health metrics. The frontend is built with React for a responsive user experience, and the prediction logic is handled by a Python Flask API serving a pre-trained Scikit-learn model.The training and validation process for the ML model is available in the dedicated Heart Disease Classification Repository.This project demonstrates an end-to-end Machine Learning deployment pipeline.🚀 FeaturesResponsive UI: A clean, single-page interface built with React and styled using Tailwind CSS for optimal viewing on desktop and mobile devices.Predictive Model: Uses a serialized model (HeartDiseaseClassification.pkl) to instantly predict the presence (1) or absence (0) of heart disease.Real-time Communication: The frontend sends patient data via a POST request to the Flask API.Risk Display: Clearly displays the prediction result (Positive/Negative) and the associated probability.Input Validation: Numeric fields are constrained, and all required fields are included for the model's prediction.🛠️ Tech StackFrontend (Client)React (with Hooks and functional components)JavaScript (or TypeScript)Tailwind CSS (for styling and responsiveness)Backend (API)Python 3.xFlask (Web Framework for the REST API)Scikit-learn (For loading and running the classification model)Pandas/NumPy (For data handling)⚙️ Setup and InstallationPrerequisitesYou need the following installed locally:Node.js & npm (or yarn)Python 3.xGitStep 1: Clone the Repositorygit clone <YOUR_REPO_URL>
cd <your-project-directory>

Step 2: Backend Setup (API)The backend handles the model loading and prediction endpoint.Create a Virtual Environment (Recommended)python3 -m venv venv
source venv/bin/activate  # On Windows, use: venv\Scripts\activate

Install Dependenciespip install -r requirements.txt

Ensure Model is PresentMake sure the trained model file (HeartDiseaseClassification.pkl) is in the root directory.Run the Flask Serverpython app.py

The API should now be running on http://127.0.0.1:5000.Step 3: Frontend Setup (UI)The frontend serves the user interface.Install Dependenciesnpm install
# or
yarn install

Run the React Applicationnpm start
# or
yarn start

The frontend should open automatically in your browser (usually at http://localhost:3000).🚦 Running the ApplicationEnsure both the Flask Backend (Step 2.4) and the React Frontend (Step 3.2) are running simultaneously.Navigate to the frontend URL (http://localhost:3000).Enter the 13 required physiological values into the form.Click "Get Prediction" to send the data to the Flask API and see the result displayed instantly.
