import { useState } from "react";

const TodoForm = ({ handleSubmit }) => {
  const [todo, setTodo] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (!todo) return;
    handleSubmit(todo);
    setTodo("");
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        className="input"
        type="text"
        placeholder="add Todo ..."
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
    </form>
  );
};

export default TodoForm;
