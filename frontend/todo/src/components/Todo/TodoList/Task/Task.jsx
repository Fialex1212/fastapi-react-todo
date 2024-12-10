import { useState } from "react";
import useTodoStore from "../../../../store/useTodoStore";
import CheckBox from "./Checkbox/Checkbox";
import DeleteButton from "./DeleteButton/DeleteButton";
import css from "./styles.module.css";
import cn from "classnames";

const Task = ({ id, title, isCompleted }) => {
  const { updateTodo, loadTodos } = useTodoStore();
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleTitleClick = () => {
    setIsEditing(true);
  };

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleTitleBlur = () => {
    setIsEditing(false);
    updateTodo(id, { title: newTitle, is_completed: isCompleted });
    loadTodos();
  };

  const handleTitleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleTitleBlur();
    }
  };

  const handleCompleted = () => {
    updateTodo(id, { title: newTitle, is_completed: !isCompleted });
    console.log(isCompleted);
    loadTodos();
  };

  return (
    <div className={css.task}>
      <CheckBox handleChange={handleCompleted} isChecked={isCompleted} />
      {isEditing ? (
        <input
          type="text"
          value={newTitle}
          onChange={handleTitleChange}
          onBlur={handleTitleBlur}
          onKeyDown={handleTitleKeyDown}
          autoFocus
          className={css.task__input}
        />
      ) : (
        <p
          className={cn(css.task__title, {
            [css.task__cross]: isCompleted,
          })}
          onClick={handleTitleClick}
        >
          {title}
        </p>
      )}
      <DeleteButton id={id} />
    </div>
  );
};

export default Task;
