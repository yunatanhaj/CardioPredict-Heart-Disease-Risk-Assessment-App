import { useState, useMemo } from 'react';
import FieldSelect from './components/FieldSelect'
import FieldInput from './components/FiledInput';
import PredictionResult from './components/PredictResult';
import {formFields, selectFields,allFields} from './config/config';
import { HeartPulse, AlertTriangle } from 'lucide-react';
import {predictionApi} from './api/api'
const App = () => {
  // Initialize state for all fields using the configuration data
  const initialFormState = useMemo(() => {
    return allFields.reduce((acc, field) => {
      // Default to 0 or 1 for selects, and empty string for number inputs
      acc[field.name] = field.type === 'number' ? '' : field.options?.[0]?.value || '0'; 
      return acc;
    }, {});
  }, []);

  const [formData, setFormData] = useState(initialFormState);
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    setIsLoading(true);

    // Basic form validation: Check if all number fields are filled
    const requiredFields = formFields.filter(f => f.type === 'number');
    const isFormValid = requiredFields.every(field => formData[field.name] !== '');

    if (!isFormValid) {
        setError("Please fill out all required numeric fields.");
        setIsLoading(false);
        return;
    }

    // Convert data types before sending to match backend expectation
    const payload = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [key, parseFloat(value)])
    );

    try {
      // Call the service/API function
      const data = await predictionApi(payload); 
      setResult(data);
    } catch (err) {
      console.error("Prediction failed:", err);
      setError("An error occurred while fetching the prediction. Please check the console for details.");
    } finally {
      setIsLoading(false);
    }
  };


  // --- Render ---

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 font-sans antialiased">
      <div className="max-w-4xl mx-auto">
        <header className="text-center py-6">
          <h1 className="text-4xl font-extrabold text-red-600 tracking-tight flex justify-center items-center">
            <HeartPulse className="w-8 h-8 mr-3 fill-red-600" />
            CardioPredict
          </h1>
          <p className="mt-2 text-xl text-gray-500">Heart Disease Risk Estimation Tool</p>
        </header>

        <main className="bg-white p-6 sm:p-10 rounded-2xl shadow-2xl">
          <p className="text-gray-600 mb-6 border-b pb-4">
            Enter the patient's data below based on the established clinical feature set to receive a risk prediction.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Numeric Inputs handled by the FieldInput component */}
              {formFields.map(field => (
                <FieldInput
                  key={field.name}
                  field={field}
                  value={formData[field.name]}
                  onChange={handleChange}
                />
              ))}
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-4 border-t border-gray-200">
              {/* Select Inputs handled by the FieldSelect component */}
              {selectFields.map(field => (
                <FieldSelect
                  key={field.name}
                  field={field}
                  value={formData[field.name]}
                  onChange={handleChange}
                />
              ))}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 mt-8 text-white font-semibold rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-[1.01] flex items-center justify-center 
                ${isLoading ? 'bg-red-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 active:bg-red-800'}`}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Calculating Risk...
                </>
              ) : (
                'Get Prediction'
              )}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-4 text-red-700 bg-red-50 border border-red-300 rounded-lg flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2" />
                {error}
            </div>
          )}
          
          {/* Prediction Result Display */}
          <PredictionResult result={result} />
          
        </main>
      </div>
    </div>
  );
};

export default App;