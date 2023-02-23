/*-----------------------------------------------------------------------------------------------
 * Todo object defines the CRUD operations for the todos
 *
 * The fetchTodos function fetches the todo items from the server and updates the todos state
 * The addTodo function sends a POST request to the server to add a new todo item
 * The updateTodo function sends a PUT request to the server to update an existing todo item
 * The delete function sends a DELETE request to the server to delete a todo item
 *-------------------------------------------------------------------------------------------------
 */

// const host = "https://localhost:3300";
// const host = "https://op2mpm-3300.preview.csb.app";
// const host = "https://6djrde-3300.preview.csb.app";
// const host = "https://8lmpsy-3300.preview.csb.app";
// const host = "https://qfxpvp-3300.csb.app";
// const host = "https://pj0mwt-3300.csb.app";
// const host = "https://rz0suw-3300.csb.app";
const host = "https://w27gz2-3300.csb.app";

// Fetch todos from the server
const fetchTodos = async () => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${host}/todos`, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const data = await response.json();
  if (data.status === "error") throw new Error(data.message);
  else return data;
};

// Add a new todo
const addTodo = async (todo) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${host}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(todo),
  });
  const data = await response.json();
  console.log(data);
  if (data.status === "error") throw new Error(data.message);
  else return data;
};

// Update an existing todo
const updateTodo = async (todo) => {
  const token = localStorage.getItem("token");
  const id = todo._id ? todo._id : todo.id;
  const response = await fetch(`${host}/todos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(todo),
  });
  const data = await response.json();
  console.log(data);
  if (data.status === "error") throw new Error(data.message);
  else return data;
};

// Delete a todo
const deleteTodo = async (id) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${host}/todos/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  const data = await response.json();
  console.log(data);
  if (data.status === "error") throw new Error(data.message);
  else return data;
};

const Todo = {
  fetchTodos,
  addTodo,
  updateTodo,
  deleteTodo,
};

export default Todo;
