import React from "react";

function TodoList({ todos, handleDelete, handleSelect, handleToggle }) {
  return (
    <ul className="list-group">
      {todos
        ? todos.map((todo) => (
            <li
              className={`list-group-item d-flex ${
                todo.isCompleted ? "completed" : ""
              }`}
              key={todo._id ? todo._id : todo.id}
            >
              <input
                className="p-2"
                type="checkbox"
                checked={todo.isCompleted}
                onChange={() => handleToggle(todo)}
              />
              <span className="p-2" onClick={() => handleSelect(todo)}>
                {todo.task}
              </span>
              <button
                className="btn btn-danger btn-sm ms-auto p-2"
                onClick={() => handleDelete(todo._id ? todo._id : todo.id)}
              >
                Delete
              </button>
            </li>
          ))
        : null}
    </ul>
  );
}

export default TodoList;
