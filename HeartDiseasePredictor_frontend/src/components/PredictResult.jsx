import { CheckCircle, AlertTriangle } from 'lucide-react';
const PredictionResult = ({ result }) => {
    if (!result) return null;

    const hasDisease = result.prediction === 1;
    const probability = (result.probability * 100).toFixed(1);
    const colorClass = hasDisease ? 'bg-red-100 text-red-800 border-red-400' : 'bg-green-100 text-green-800 border-green-400';
    const Icon = hasDisease ? AlertTriangle : CheckCircle;

    return (
      <div className={`mt-8 p-6 rounded-xl border-2 shadow-xl transition-all duration-300 ${colorClass}`}>
        <h2 className="text-2xl font-bold mb-3 flex items-center">
          <Icon className="w-6 h-6 mr-3" />
          Prediction Result
        </h2>
        {hasDisease ? (
          <p className="text-lg">
            Based on the inputs, the model predicts a <span className="font-extrabold">{probability}% likelihood of Heart Disease.</span>
            <br />
            <span className="text-sm font-medium mt-1 block">Please consult a medical professional for a diagnosis. This is an algorithmic estimation only.</span>
          </p>
        ) : (
          <p className="text-lg">
            The model suggests a low risk, with a <span className="font-extrabold">{probability}% likelihood of Heart Disease.</span>
            <br />
            <span className="text-sm font-medium mt-1 block">This is an algorithmic estimation and is not a substitute for professional medical advice.</span>
          </p>
        )}
      </div>
    );
  };

  export default PredictionResult;