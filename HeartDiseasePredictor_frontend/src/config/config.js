import { HeartPulse, User, Gauge, Droplet, Activity, Frown} from 'lucide-react';

export const formFields = [
  { name: 'age', label: 'Age (years)', type: 'number', min: 18, max: 120, placeholder: 'e.g., 52' },
  { name: 'trestbps', label: 'Resting Blood Pressure (mm Hg)', type: 'number', min: 80, max: 200, placeholder: 'e.g., 120' },
  { name: 'chol', label: 'Serum Cholesterol (mg/dl)', type: 'number', min: 100, max: 600, placeholder: 'e.g., 230' },
  { name: 'thalach', label: 'Max Heart Rate Achieved', type: 'number', min: 60, max: 220, placeholder: 'e.g., 150' },
  { name: 'oldpeak', label: 'ST Depression (relative to rest)', type: 'number', step: '0.1', min: 0.0, max: 6.2, placeholder: 'e.g., 1.5' },
];

export const selectFields = [
  { 
    name: 'sex', 
    label: 'Sex', 
    icon: User,
    options: [
      { value: '1', label: 'Male' },
      { value: '0', label: 'Female' },
    ],
  },
  { 
    name: 'cp', 
    label: 'Chest Pain Type', 
    icon: HeartPulse,
    options: [
      { value: '0', label: 'Typical Angina' },
      { value: '1', label: 'Atypical Angina' },
      { value: '2', label: 'Non-Anginal Pain' },
      { value: '3', label: 'Asymptomatic' },
    ],
  },
  { 
    name: 'fbs', 
    label: 'Fasting Blood Sugar > 120 mg/dl', 
    icon: Droplet,
    options: [
      { value: '1', label: 'True (High)' },
      { value: '0', label: 'False (Normal)' },
    ],
  },
  { 
    name: 'restecg', 
    label: 'Resting ECG Results', 
    icon: Activity,
    options: [
      { value: '0', label: 'Normal' },
      { value: '1', label: 'ST-T Wave Abnormality' },
      { value: '2', label: 'Left Ventricular Hypertrophy' },
    ],
  },
  { 
    name: 'exang', 
    label: 'Exercise Induced Angina', 
    icon: Frown,
    options: [
      { value: '1', label: 'Yes' },
      { value: '0', label: 'No' },
    ],
  },
  { 
    name: 'slope', 
    label: 'Peak Exercise ST Segment Slope', 
    icon: Gauge,
    options: [
      { value: '0', label: 'Upsloping' },
      { value: '1', label: 'Flatsloping' },
      { value: '2', label: 'Downsloping' },
    ],
  },
  { 
    name: 'ca', 
    label: 'Number of Major Vessels (0-3)', 
    icon: HeartPulse,
    options: [
      { value: '0', label: '0 Vessels' },
      { value: '1', label: '1 Vessel' },
      { value: '2', label: '2 Vessels' },
      { value: '3', label: '3 Vessels' },
    ],
  },
  { 
    name: 'thal', 
    label: 'Thallium Stress Result', 
    icon: HeartPulse,
    options: [
      { value: '1', label: 'Normal' },
      { value: '6', label: 'Fixed Defect' },
      { value: '7', label: 'Reversible Defect' },
    ],
  },
];

// Combine all fields for initial state generation
export const allFields = [...formFields, ...selectFields];