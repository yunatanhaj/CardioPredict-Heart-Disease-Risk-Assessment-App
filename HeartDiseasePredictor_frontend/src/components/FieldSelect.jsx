
const FieldSelect = ({ field, value, onChange }) => {
    const Icon = field.icon;
    return (
      <div className="flex flex-col space-y-1">
        <label htmlFor={field.name} className="text-sm font-medium text-gray-700 flex items-center">
          <Icon className="w-4 h-4 mr-2 text-red-500" />
          {field.label}
        </label>
        <select
          id={field.name}
          name={field.name}
          value={value}
          onChange={onChange}
          className="w-full px-3 py-2 border border-gray-300 bg-white rounded-lg shadow-sm appearance-none focus:ring-red-500 focus:border-red-500 transition duration-150 ease-in-out"
          required
        >
          {field.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  };
  
  export default FieldSelect; 

  