import ToDoItem from "./ToDoItem";
import styles from "./ToDoItems.module.css";

const ToDoItems = ({ todoItems }) => {
  return (
    <div className={styles.itemsContainer}>
      {todoItems.map((item) => (
        <ToDoItem todoName={item.name} todoDate={item.dueDate}></ToDoItem>
      ))}
    </div>
  );
};

export default ToDoItems;
