import AppName from "./components/AppName";
import AddToDo from "./components/AddToDo";

import "./App.css";
import ToDoItems from "./components/ToDoItems";

function App() {
  const todoItems = [
    {
      name: "buy milk",
      dueDate: "4/2/2025",
    },

    {
      name: "Go to Company",
      dueDate: "4/2/2025",
    },

    {
      name: "Complete the Project",
      dueDate: "4/2/2025",
    },
  ];

  return (
    <center className="todo-container">
      <AppName />
      <AddToDo />

      <ToDoItems todoItems={todoItems}></ToDoItems>
    </center>
  );
}

export default App;
