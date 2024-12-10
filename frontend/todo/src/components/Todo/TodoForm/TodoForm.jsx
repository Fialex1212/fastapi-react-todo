import { useState } from "react";
import css from "./styles.module.css";
import CreateButton from "./CreateButton/CreateButton";
import Input from "./Input/Input";
import useTodoStore from "../../../store/useTodoStore";

const TodoForm = () => {
  const { addTodo, loadTodos } = useTodoStore();

  const [formData, setFormData] = useState({
    title: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const newTitle = formData.title.trim() === "" ? "Title" : formData.title;

    const newFormData = {
      ...formData,
      title: newTitle,
    };
    addTodo(newFormData).then(() => loadTodos());

    setFormData({
      title: "",
    });
  };

  return (
    <div className={css.block__form}>
      <form className={css.form} onSubmit={handleSubmit}>
        <Input formData={formData} handleInputChange={handleInputChange} />
        <CreateButton />
      </form>
    </div>
  );
};

export default TodoForm;
