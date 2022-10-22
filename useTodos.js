import { useEffect, useReducer } from "react";
import { todoReducer } from "../08-useReducer/todoReducer";

const init = () => {
  return JSON.parse(localStorage.getItem("todos")) || [];
};

export const useTodos = () => {
  const [todos, dispatch] = useReducer(todoReducer, [], init);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleNewTodo = (todo) => {
    const action = {
      type: "[TODO] Add Todo",
      payload: todo,
    };

    dispatch(action);
  };

  const handleDeleteTodo = (id) => {
    dispatch({
      type: "[TODO] Remove Todo",
      payload: id,
    });
  };

  const handleToogleTodo = (id) => {
    dispatch({
      type: "[TODO] Toogle Todo",
      payload: id,
    });
  };

  return {
    todos,
    handleDeleteTodo,
    handleNewTodo,
    handleToogleTodo,
    todosCount: todos.length,
    pendingTodoCount: todos.filter((todo) => !todo.done).length,
  };
};
