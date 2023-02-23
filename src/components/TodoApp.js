import "./TodoApp.css";
import TodoList from "./todo/TodoList";
import AddForm from "./todo/AddForm";
import EditForm from "./todo/EditForm";
import useHandleTodo from "./api/handleTodo";

function TodoApp() {
  const {
    handleAddTodo,
    handleUpdateTodo,
    handleDelete,
    handleSelect,
    handleToggle,
    selectedTodo,
    todos,
    toast,
    isEditForm,
    handleCancelEdit,
  } = useHandleTodo();

  return (
    <div className="container">
      <h1 className="text-center my-5">Todo List</h1>
      {isEditForm ? (
        <EditForm
          todo={selectedTodo}
          handleUpdateTodo={handleUpdateTodo}
          handleCancelEdit={handleCancelEdit}
        />
      ) : (
        <AddForm handleAddTodo={handleAddTodo} />
      )}
      {toast}
      <TodoList
        todos={todos}
        handleDelete={handleDelete}
        handleSelect={handleSelect}
        handleToggle={handleToggle}
      />
    </div>
  );
}

export default TodoApp;
