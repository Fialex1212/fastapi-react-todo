import css from "./styles.module.css";

const Input = ({formData, handleInputChange}) => {
  return (
    <div>
      <input
        className={css.input}
        type="text"
        placeholder="Enter a title of todo"
        value={formData.title}
        onChange={handleInputChange}
        name="title"
      />
    </div>
  );
};

export default Input;
