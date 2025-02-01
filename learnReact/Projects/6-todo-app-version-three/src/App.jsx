import AppName from "./components/AppName";
import AddToDo from "./components/AddToDo";

import "./App.css";
import ToDoItems from "./components/ToDoItems";
import { useState } from "react";
import WelcomeMessage from "./components/WelcomeMessage";

function App() {
  const initialTodoItems = [
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

  const [todoItems, setTodoItems] = useState(initialTodoItems);

  const handleNewItem = (itemName, itemDueDate) => {
    console.log(`New Item added: ${itemName} Date: ${itemDueDate}`);
    const newTodoItems = [
      ...todoItems,
      { name: itemName, dueDate: itemDueDate },
    ];

    setTodoItems(newTodoItems);
  };

  const handleDeleteItems = (todoItemName) => {
    console.log(`Item deleted: ${todoItemName}`);
    const newToDoItems = todoItems.filter((item) => item.name !== todoItemName);
    setTodoItems(newToDoItems);
  };

  return (
    <center className="todo-container">
      <AppName />
      <AddToDo onNewItem={handleNewItem} />

      {todoItems.length === 0 && <WelcomeMessage></WelcomeMessage>}

      <ToDoItems
        todoItems={todoItems}
        onDeleteClick={handleDeleteItems}
      ></ToDoItems>
    </center>
  );
}

export default App;
