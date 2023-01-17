const Input = ({ placeholder }) => {
  return (
    <div className="input-item">
      <input type="text" required />
      <span>{placeholder}</span>
    </div>
  );
};
export default Input;
