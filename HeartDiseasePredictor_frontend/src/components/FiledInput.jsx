
const FieldInput = ({ field, value, onChange }) => (
    <div className="flex flex-col space-y-1">
      <label htmlFor={field.name} className="text-sm font-medium text-gray-700">
        {field.label}
      </label>
      <input
        type={field.type}
        id={field.name}
        name={field.name}
        value={value}
        onChange={onChange}
        min={field.min}
        max={field.max}
        step={field.step || '1'}
        placeholder={field.placeholder}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-red-500 focus:border-red-500 transition duration-150 ease-in-out"
        required
      />
    </div>
  );

  export default FieldInput;