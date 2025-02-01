import styles from "./Item.module.css";

const Item = ({ foodItems, bought, handleBuyButton }) => {
  // let { foodItems } = props;

  // const handleBuyButtonClicked = (foodItems) => {
  //   console.log(`${foodItems} being bought`);
  // };

  return (
    <li
      className={`${styles["my-item"]} list-group-item ${bought && "active"}`}
    >
      <span className={styles["my-span"]}>{foodItems}</span>
      <button
        className={`${styles.itemButton} btn btn-secondary`}
        // onClick={() => handleBuyButtonClicked(foodItems)}
        // onClick={(evnet) => handleBuyButtonClicked(evnet)}
        // onClick={handleBuyButtonClicked}

        // use onChange for controlled form input box (write data into input box by user then change value of input box)

        onClick={handleBuyButton}
      >
        buy
      </button>
    </li>
  );
};

export default Item;
