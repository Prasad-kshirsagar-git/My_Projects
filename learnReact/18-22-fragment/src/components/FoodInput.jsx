import styles from "./FoodInput.module.css";

const FoodInput = ({ handleOnChange, handlleKeyDown }) => {
  // const handleOnChange = (event) => {
  //   console.log(event.target.value);
  // };

  // return (
  //   <input
  //     type="text"
  //     placeholder="Enter food items here"
  //     className={styles.foodInput}
  //     onChange={handleOnChange}
  //   />
  // );

  return (
    <input
      type="text"
      placeholder="Enter food items here"
      className={styles.foodInput}
      onKeyDown={handlleKeyDown}
    />
  );
};

export default FoodInput;
