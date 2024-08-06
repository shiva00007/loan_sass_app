const FormInput = ({
  id,
  name,
  type = "text", // Default to "text" if not provided
  label,
  value,
  onChange,
  placeholder,
  required = false,
  icon, // New prop for the icon
}) => {
  return (
    <div className="mb-2 overflow-hidden relative">
      <label htmlFor={id} className="block text-lg mb-1 font-bold text-white">
        {label}
      </label>
      <div className="flex items-center">
        {icon && <span className="absolute left-3 text-white">{icon}</span>}
        <input
          type={type}
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`px-8 rounded-md bg-black w-full h-10 text-white border border-gray-300 pl-${
            icon ? "10" : "4"
          }`}
          required={required}
        />
      </div>
    </div>
  );
};

export default FormInput;
