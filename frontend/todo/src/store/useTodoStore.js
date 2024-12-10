import axios from "axios";
import { create } from "zustand";
import toast from "react-hot-toast";
import { PORT } from "../utils/constans";

const useTodoStore = create((set) => ({
  todoData: [],
  setTodoData: (todos) => set({ todoData: todos }),
  loadTodos: async () => {
    try {
      const response = await axios.get(`${PORT}/todo/list`);
      console.log(response.data);
      set({ todoData: response.data });
    } catch (error) {
      console.error("Error: ", error);
      toast.error("Something went wrong: ", error);
    }
  },
  addTodo: async (formData) => {
    try {
      const response = await axios.post(`${PORT}/todo/create`, formData);
      console.log(response.data);
      toast.success("Todos successfully added!!!");
    } catch (error) {
      console.error("Error: ", error);
      toast.error("Something went wrong: ", error);
    }
  },
  updateTodo: async (id, formData) => {
    try {
      await axios.put(`${PORT}/todo/update/${id}`, formData);
      set((state) => ({
        todoData: state.todoData.map((task) =>
          task.id === id ? { ...task, ...formData } : task
        ),
      }));
    } catch (error) {
      console.error("Error updating todo:", error);
      toast.error("Something went wrong while updating the todo");
    }
  },
}));

export default useTodoStore;
