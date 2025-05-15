const Checkbox = ({ handleChange, isChecked }) => {
  return (
    <label className="custom-checkbox">
      <input type="checkbox" checked={isChecked} onChange={handleChange} />
      <span className="checkmark"></span>
    </label>
  );
};

export default Checkbox;
