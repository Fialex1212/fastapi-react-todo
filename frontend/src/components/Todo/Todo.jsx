import { useState, useEffect } from "react";
import css from "./styles.module.css";
import Popup from "reactjs-popup";

const Todo = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [todoData, setTodoData] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //Function for load data from backend
  const loadTodos = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/todos/get_todos");
      const data = await response.json();
      setTodoData(data);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  //Function for add data to backend
  const addTodo = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/todos/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      console.log(JSON.stringify(formData));

      if (!response.ok) {
        throw new Error("Netwrok response wat not ok");
      }

      const data = await response.json();
      console.log(data);

      loadTodos();
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  //Function for delete data from backend
  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/todos/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Netwrok response wat not ok");
      }

      const data = await response.json();
      console.log(data);

      loadTodos();
    } catch (error) {
      console.error("Error: ", error);
    }
    const updateTodo = todoData.filter((todo) => todo.id !== id);
    setTodoData(updateTodo);
  };

  //Function for handle inputs change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  //Function for not reload site and clear input after submit
  const handleSubmit = (event) => {
    event.preventDefault();
    addTodo();

    setFormData({
      title: "",
      description: "",
    });
  };

  //Functions for manipulate modal window
  const openModal = (todo) => {
    setIsModalOpen(true);
    setSelectedTodo(todo);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTodo(null);
  };

  //ReactHook for load data after load page
  useEffect(() => {
    loadTodos();
  }, []);

  console.log(todoData);
  console.log(todoData.length);

  return (
    <section className={css.section}>
      <div className="container">
        <h1 className={css.title}>Todo app</h1>
        <form action="" className={css.form} onSubmit={handleSubmit}>
          <input
            className={css.form__input}
            type="text"
            placeholder="Enter a title of todo"
            value={formData.title}
            onChange={handleInputChange}
            name="title"
          />
          <input
            className={css.form__input}
            type="text"
            placeholder="Enter a description of todo"
            value={formData.description}
            onChange={handleInputChange}
            name="description"
          />
          <button className={css.form__button} type="submit">
            Sumbit
          </button>
        </form>
        <ul className={css.todo__list}>
          {todoData.map(({ id, title, description, isCompleted }) => (
            <li
              className={css.todo__item}
              key={id}
              onClick={() => openModal({ id, title, description })}
            >
              <input
                className={css.todo__checkbox}
                type="checkbox"
                checked={isCompleted}
              />
              <div className={css.todo__text}>
                <h2 className={css.todo__title}>{title}</h2>
                <p className={css.todo__description}>{description}</p>
              </div>
              <span className={css.todo__edit}></span>
              <span
                className={css.todo__trash}
                onClick={() => deleteTodo(id)}
              ></span>
            </li>
          ))}
        </ul>
      </div>
      {isModalOpen && selectedTodo && (
        <Popup
          open={isModalOpen}
          closeOnDocumentClick
          onClose={closeModal}
          modal
          nested
        >
          <div className={css.modalOverlay}>
            <div className="modal">
              <button className="close" onClick={closeModal}>
                &times;
              </button>
              <div className="header">{selectedTodo.title}</div>
              <div className="content">{selectedTodo.description}</div>
            </div>
          </div>
        </Popup>
      )}
    </section>
  );
};

export default Todo;
