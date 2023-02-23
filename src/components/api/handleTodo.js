import { useState, useEffect } from "react";
import Todo from "./Todo";
import InfoToast from "../todo/InfoToast";
import Counter from "../todo/Counter";

let cachedTodos = [];

function useHandleTodo() {
  const [todos, setTodos] = useState([]);
  const [isEditForm, setIsEditForm] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [toast, setToast] = useState([]);

  // useEffect hook is used to fetch the todo items from the server when the component is first rendered
  useEffect(() => {
    // console.log("use effect");
    fetchTodos();
  }, []);

  const createNewToast = (message, title) => {
    Counter.increment();
    return (
      <InfoToast key={Counter.getCount()} title={title}>
        {message}
      </InfoToast>
    );
  };

  const hasChanged = (newTodos) => {
    // Compare cached todos with new todos
    return JSON.stringify(cachedTodos) !== JSON.stringify(newTodos);
  };

  const setCachedTodos = (data) => {
    cachedTodos = data;
  };

  const showError = (error, type) => {
    const newToast = createNewToast(
      error.message,
      "Error " + (type ? type : "")
    );
    setToast((toast) => [...toast, newToast]);
  };

  const fetchTodos = async () => {
    try {
      const newTodos = await Todo.fetchTodos();
      if (newTodos) {
        if (hasChanged(newTodos)) {
          setTodos(newTodos);
          setCachedTodos(newTodos);
        } else setTodos(cachedTodos);
      }
    } catch (error) {
      showError(error, "Fetch");
    }
  };

  const handleAddTodo = async (todo) => {
    setTodos([...todos, { ...todo, _id: Date.now() }]);
    try {
      const newTodo = await Todo.addTodo(todo);
      if (!newTodo) throw new Error("No Todo created");
      fetchTodos();
    } catch (error) {
      setTodos(cachedTodos);
      showError(error, "Add");
    }
  };

  const handleUpdateTodo = async (todo) => {
    setIsEditForm(false);
    const index = todos.findIndex((item) =>
      item._id ? item._id === todo._id : item.id === todo.id
    );
    const newTodos = [
      ...todos.slice(0, index),
      todo,
      ...todos.slice(index + 1),
    ];
    setTodos((todos) => [
      ...todos.slice(0, index),
      todo,
      ...todos.slice(index + 1),
    ]);
    try {
      await Todo.updateTodo(todo);
      setCachedTodos(newTodos);
    } catch (error) {
      setTodos(cachedTodos);
      //   fetchTodos();
      showError(error, "Update");
    }
  };

  const handleDelete = async (id) => {
    const index = todos.findIndex((todo) =>
      todo._id ? todo._id === id : todo.id === id
    );
    const newTodos = [...todos.slice(0, index), ...todos.slice(index + 1)];
    setTodos((todos) => [...todos.slice(0, index), ...todos.slice(index + 1)]);
    try {
      await Todo.deleteTodo(id);
      setCachedTodos(newTodos);
    } catch (error) {
      setTodos(cachedTodos);
      //   fetchTodos();
      showError(error, "Delete");
    }
  };

  const handleSelect = (todo) => {
    const { isCompleted } = todo;
    if (!isCompleted) {
      setIsEditForm(true);
      setSelectedTodo(todo);
    }
  };

  const handleTodoChange = (e) => {
    setSelectedTodo({ ...selectedTodo, task: e.target.value });
  };

  const handleToggle = async (todo) => {
    const { isCompleted } = todo;
    const setTodo = { ...todo, isCompleted: !isCompleted };
    const index = todos.findIndex((item) =>
      item._id ? item._id === setTodo._id : item.id === setTodo.id
    );
    const newTodos = [
      ...todos.slice(0, index),
      setTodo,
      ...todos.slice(index + 1),
    ];
    setTodos((todos) => [
      ...todos.slice(0, index),
      setTodo,
      ...todos.slice(index + 1),
    ]);
    try {
      await Todo.updateTodo(setTodo);
      setCachedTodos(newTodos);
    } catch (error) {
      showError(error, "update");
    }
  };

  const handleCancelEdit = () => {
    console.log("canceled");
    setIsEditForm(false);
  };

  return {
    handleAddTodo,
    handleUpdateTodo,
    handleDelete,
    handleSelect,
    handleToggle,
    handleTodoChange,
    selectedTodo,
    todos,
    toast,
    isEditForm,
    setIsEditForm,
    fetchTodos,
    handleCancelEdit,
  };
}

export default useHandleTodo;
