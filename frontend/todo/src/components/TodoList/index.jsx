import useTodoStore from "@store/useTodoStore";
import css from "./styles.module.css";
import TodoItem from "@components/TodoItem";

const TodoList = () => {
  const { todoData } = useTodoStore();

  const completedCount = todoData.filter((task) => task.is_completed).length;

  if (!Array.isArray(todoData)) {
    return (
      <>
        <p>{"You don't have any registered tasks yet"}</p>
        <p>Create tasks and organize your affairs</p>
      </>
    );
  }

  return (
    <div className={css.todo__list__container}>
      <div className={css.todo__list__info}>
        <div className={css.info__item}>
          <p className={css.tasks__created}>All Tasks</p>
          <p className={css.info__numbers}>{todoData.length}</p>
        </div>
        <div className={css.info__item}>
          <p className={css.completed__text}>Completed</p>
          <p className={css.info__numbers}>
            {completedCount} of {todoData.length}
          </p>
        </div>
      </div>
      <ul className={css.todo__list}>
        {todoData.map(({ title, is_completed, id }) => {
          return (
            <li className={css.todo__item} key={id}>
              <TodoItem id={id} title={title} isCompleted={is_completed} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoList;
