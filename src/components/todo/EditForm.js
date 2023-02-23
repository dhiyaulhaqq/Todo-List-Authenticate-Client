import { useState, useEffect } from "react";
import { Form, FormGroup, InputGroup, Button } from "reactstrap";

const EditForm = ({ todo, handleUpdateTodo, handleCancelEdit }) => {
  const [editTodo, setEditTodo] = useState({ task: "" });

  useEffect(() => {
    setEditTodo(todo);
  }, []);

  const handleInputChange = (event) => {
    setEditTodo((todo) => {
      return { ...todo, task: event.target.value };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (editTodo.task === todo.task) {
      handleCancelEdit();
      return;
    }
    if (editTodo.task) handleUpdateTodo(editTodo);
    else handleCancelEdit();
    return;
  };

  return (
    <Form className="my-3" onSubmit={handleSubmit}>
      <FormGroup>
        <InputGroup>
          <input
            type="text"
            value={editTodo.task}
            onChange={handleInputChange}
            placeholder="Edit your task"
            className="form-control"
          />
          <Button color="primary" type="submit">
            Update
          </Button>{" "}
          <Button color="secondary" onClick={handleCancelEdit}>
            Cancel
          </Button>
        </InputGroup>
      </FormGroup>
    </Form>
  );
};

export default EditForm;
