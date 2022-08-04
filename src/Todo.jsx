const Todo = ({ todo, handleComplete, handleRemove: remove }) => {
  //since button element is inside list element and both
  //have onClicks, stop propogation for button
  const handleRemove = (e) => {
    remove(e);
    //stop propogation
    if (!e) var e = window.event;
    e.cancelBubble = true;
    if (e.stopPropagation) e.stopPropagation();
  };

  return (
    <li
      className={"todo" + (todo.isCompleted ? " todo-completed" : "")}
      onClick={handleComplete}
    >
      {todo.text}
      <button onClick={handleRemove}>x</button>
    </li>
  );
};
export default Todo;
