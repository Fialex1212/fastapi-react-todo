import { useState } from "react";
import useTodoStore from "@store/useTodoStore";
import CheckBox from "./Checkbox";
import DeleteButton from "./DeleteButton";
import css from "./styles.module.css";
import cn from "classnames";

const TodoItem = ({ id, title, isCompleted }) => {
  const { updateTodo, loadTodos } = useTodoStore();
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleSave = () => {
    if (newTitle.trim() === title) return setIsEditing(false);
    updateTodo(id, { title: newTitle.trim(), is_completed: isCompleted });
    loadTodos();
    setIsEditing(false);
  };

  const handleCompletedToggle = () => {
    updateTodo(id, { title: newTitle, is_completed: !isCompleted });
    loadTodos();
  };

  return (
    <div className={css.task}>
      <CheckBox handleChange={handleCompletedToggle} isChecked={isCompleted} />

      {isEditing ? (
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          autoFocus
          className={css.task__input}
        />
      ) : (
        <p
          className={cn(css.task__title, {
            [css.task__cross]: isCompleted,
          })}
          onClick={() => setIsEditing(true)}
        >
          {title}
        </p>
      )}

      <DeleteButton id={id} />
    </div>
  );
};

export default TodoItem;
