const Input = ({ placeholder, type }) => {
  return (
    <div className="input-item">
      <input type={type} required />
      <span>{placeholder}</span>
    </div>
  );
};
export default Input;
