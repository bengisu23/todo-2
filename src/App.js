import React, { useEffect, useState } from "react";

import axios from "axios";

import AddTodoForm from "./components/AddTodoForm";
import SingleTodo from "./components/SingleTodo";

/* 
  Bir Component'ın Yaşam Döngüsü

  1. Constructor çalışır
  2. Render Çalışır
  3. ComponentDidMount çalışır (eğer bu anda bir state değişirse)
    a. tekrar constructor ve render çalışır
*/

function App() {
  const [todos, setTodos] = useState([]);
  const [didUpdate, setDidUpdate] = useState(false);
  useEffect(() => {
    axios
      .get("http://localhost:3004/todos")
      .then((res) => {
        console.log(res.data);
        setTodos(res.data);
      })
      .catch((error) => {
        alert("Veriler çekilirken bir hata oluştu.");
      });
  }, [didUpdate]);
  return (
    <div className="container p-5">
      <AddTodoForm didUpdate={didUpdate} setDidUpdate={setDidUpdate} />
      {todos.map((todo) => (
        <SingleTodo
          key={todo.id}
          todo={todo}
          didUpdate={didUpdate}
          setDidUpdate={setDidUpdate}
        />
      ))}
    </div>
  );
}

export default App;