import React, { useState } from "react";
import { Form, FormGroup, Button, InputGroup } from "reactstrap";

const AddForm = ({ handleAddTodo }) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (inputValue) handleAddTodo({ task: inputValue, isCompleted: false });
    setInputValue("");
  };

  return (
    <Form className="my-3" onSubmit={handleSubmit}>
      <FormGroup>
        <InputGroup>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Add a new task"
            className="form-control"
          />
          <Button color="primary" type="submit">
            Add Todo
          </Button>
        </InputGroup>
      </FormGroup>
    </Form>
  );
};

export default AddForm;
