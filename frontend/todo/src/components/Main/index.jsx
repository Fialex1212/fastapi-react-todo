import { useEffect } from "react";
import css from "./styles.module.css";
import TodoList from "@components/TodoList";
import { Toaster } from "react-hot-toast";
import TodoForm from "@components/TodoForm";
import useTodoStore from "@store/useTodoStore";

const Main = () => {
  const { loadTodos } = useTodoStore();

  useEffect(() => {
    loadTodos();
  }, []);

  return (
    <section>
      <div className={css.title__block}>
        <img src="logo.svg" alt="" />
        <TodoForm />
      </div>
      <div className="container">
        <Toaster />
        <TodoList />
      </div>
    </section>
  );
};

export default Main;
