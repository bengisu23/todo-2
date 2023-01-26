import React, { useState } from "react";

import axios from "axios";
import ErrorModal from "./ErrorModal";

const SingleTodo = ({ todo, didUpdate, setDidUpdate }) => {
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [newTodoText, setNewTodoText] = useState(todo.text);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleDelete = () => {
    axios
      .delete(`http://localhost:3004/todos/${todo.id}`)
      .then((res) => {
        setDidUpdate(!didUpdate);
      })
      .catch((err) => {
        setHasError(true);
        setErrorMessage("There was an error while deleting todo");
      });
  };

  const handleChangeDone = () => {
    const changedDone = {
      ...todo,
      isDone: !todo.isDone,
    };
    axios
      .put(`http://localhost:3004/todos/${todo.id}`, changedDone)
      .then((res) => {
        setDidUpdate(!didUpdate);
      })
      .catch((err) => {
        setHasError(true);
        setErrorMessage("There was an error while changing todo's done status");
      });
  };

  const handleEdit = (event) => {
    event.preventDefault();
    /* validation */
    if (newTodoText === "") {
      alert("Todo text can't be empty");
      return;
    }
    if (newTodoText.length < 3) {
      alert("Todo text must be at least 3 characters");
      return;
    }
    const updatedTodo = {
      ...todo,
      text: newTodoText,
    };
    axios
      .put(`http://localhost:3004/todos/${todo.id}`, updatedTodo)
      .then((res) => {
        setDidUpdate(!didUpdate);
        setIsEditClicked(false);
      })
      .catch((err) => {
        setHasError(true);
        setErrorMessage("There was an error while editing todo");
      });
  };

  return (
    <>
      <div
        className={
          todo.isDone === false
            ? "alert alert-secondary d-flex justify-content-between align-items-center"
            : "alert alert-success d-flex justify-content-between align-items-center"
        }>
        <div>
          {isEditClicked === true ? (
            <form onSubmit={handleEdit}>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type your todo"
                  value={newTodoText}
                  onChange={(event) => setNewTodoText(event.target.value)}
                />
                <button
                  onClick={() => {
                    setIsEditClicked(false);
                    setNewTodoText(todo.text);
                  }}
                  className="btn btn-danger">
                  Cancel
                </button>
                <button className="btn btn-primary" type="submit">
                  Save
                </button>
              </div>
            </form>
          ) : (
            <h1>{todo.text}</h1>
          )}

          <small>
            {new Date(todo.date).toLocaleString().replaceAll("/", ".")}
          </small>
        </div>
        {isEditClicked === false && (
          <div className="btn-group" role="group" aria-label="Basic example">
            <button onClick={handleDelete} className="btn btn-danger">
              Delete
            </button>
            <button
              onClick={() => setIsEditClicked(true)}
              className="btn btn-secondary">
              Edit
            </button>
            <button onClick={handleChangeDone} className="btn btn-primary">
              {todo.isDone === false ? "Done" : "Undone"}
            </button>
          </div>
        )}
      </div>
      {hasError === true && (
        <ErrorModal
          errorMessage={errorMessage}
          closeModal={() => setHasError(false)}
        />
      )}
    </>
  );
};

export default SingleTodo;