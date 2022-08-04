import "./App.css";
import { useState } from "react";
import TodoForm from "./TodoForm";
import Todo from "./Todo";

function App() {
  const [todos, setTodos] = useState([]);

  //makes a shallow copy of todos, and adds todo into that copy
  //just before any todos marked complete and returns the new array
  const placeBeforeCompleted = (todo, todos) => {
    let index = todos.findIndex((todo) => todo.isCompleted);
    //if there's no completed todos, add to end of array
    index = index === -1 ? todos.length : index;
    let newTodos = [...todos];
    newTodos.splice(index, 0, { text: todo, isCompleted: false });
    return newTodos;
  };

  const remove = (index) => {
    setTodos((todos) => {
      let newTodos = [...todos];
      newTodos.splice(index, 1);
      return newTodos;
    });
  };

  const complete = (index) => {
    setTodos((todos) => {
      //instead of "editing" the array which requires a deep copy
      //and editing that, just make a shallow copy, remove the item,
      //then add back an edited version of it that was just  constructed
      let newTodos = [...todos];
      newTodos.splice(index, 1);

      //to make for user friendly display:
      //if it's turning complete, send it to bottom of list
      //if it's turning back to incomplete, send it above completed items
      if (todos[index].isCompleted) {
        newTodos = placeBeforeCompleted(todos[index].text, newTodos);
      } else {
        const todo = { text: todos[index].text, isCompleted: true };
        newTodos = [...newTodos, todo];
      }

      return newTodos;
    });
  };

  const handleSubmit = (todo) => {
    setTodos((todos) => {
      return placeBeforeCompleted(todo, todos);
    });
  };

  const renderTodos = () => {
    return (
      <ul className="todo-list">
        {todos.map((todo, i) => (
          <Todo
            key={i}
            todo={todo}
            handleRemove={() => remove(i)}
            handleComplete={() => complete(i)}
          />
        ))}
      </ul>
    );
  };

  return (
    <div className="app">
      <h1>What you need to do:</h1>

      <TodoForm handleSubmit={handleSubmit} />

      {renderTodos()}
    </div>
  );
}

export default App;
