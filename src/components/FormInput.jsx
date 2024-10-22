const FormInput = ({
  id,
  name,
  type = "text", // Default to "text" if not provided
  label,
  value,
  onChange,
  placeholder,
  required = false,
  icon,
  pattern,
}) => {
  const validatePattern = (email, password) => {
    // const isNameValid = /^[0-9A-Za-z]{6,16}$/.test(name);
    const isEmailValid =
      /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);

    const isPasswordValid =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&^])[A-Za-z\d@.#$!%*?&]{8,15}$/.test(
        password
      );

    // if (!isNameValid) return "Usename is Not valid";
    if (!isEmailValid) return "Email is Not Vaild";
    if (!isPasswordValid) return "Password is Not Valid";

    return null;
  };
  return (
    <div className="mb-2 overflow-hidden relative outline-none">
      <label
        htmlFor={id}
        className="block text-lg mb-1 font-bold text-white outline-none"
      >
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
          className={`px-8 rounded-md bg-black w-full h-10 text-white border outline-none border-gray-300 pl-${
            icon ? "10" : "4"
          }`}
          required={required}
          pattern={validatePattern}
        />
      </div>
    </div>
  );
};

export default FormInput;
