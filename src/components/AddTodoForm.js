import React, { useState } from "react";

import axios from "axios";
import ErrorModal from "./ErrorModal";

const AddTodoForm = ({ didUpdate, setDidUpdate }) => {
  const [todoText, setTodoText] = useState("");
  const [hasError, setHasError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    /* validation */
    if (todoText === "") {
      alert("Todo text can't be empty");
      return;
    }
    if (todoText.length < 3) {
      alert("Todo text must be at least 3 characters");
      return;
    }
    const newTodo = {
      id: String(new Date().getTime()),
      text: todoText,
      date: new Date(),
      isDone: false,
    };
    axios
      .post("http://localhost:3004/todos", newTodo)
      .then((res) => {
        setDidUpdate(!didUpdate);
        setTodoText("");
      })
      .catch((error) => {
        setHasError(true)
      });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Type your todo"
            value={todoText}
            onChange={(event) => setTodoText(event.target.value)}
          />
          <button className="btn btn-primary" type="submit">
            Add
          </button>
        </div>
      </form>
      {hasError === true && <ErrorModal closeModal={()=>setHasError(false)} />}
    </>
  );
};
export default AddTodoForm;