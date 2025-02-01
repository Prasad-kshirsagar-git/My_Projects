// import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import FoodItems from "./components/FoodItems";
import ErrorMessage from "./components/ErrorMessage";
import Container from "./components/Container";
import FoodInput from "./components/FoodInput";
import { useState } from "react";

function App() {
  // let foodItems = [];
  // let foodItems = ["Dal", "Green vegetables", "Roti", "Salad"];

  // let [foodItems, setFoodItems] = useState(["Dal", "Green vegetables", "Roti"]);

  let [foodItems, setFoodItems] = useState([]);

  // if (foodItems.length === 0) {
  //   return <h3>I am still hungry...!</h3>;
  // }

  // let emptyMessage =
  // foodItems.length === 0 ? <h3>I am still hungry...!</h3> : null;

  // for save data
  // let textStateArr = useState();
  // let textStateVal = textStateArr[0];   // current value
  // let textStateMethod = textStateArr[1];    // value editing method

  let textStateArr = useState();
  let textToShow = textStateArr[0];
  let setTextState = textStateArr[1];

  // let [textToShow, setTextState] = userState("Food Item Entered by user")

  console.log(`current value of textState: ${textToShow}`);

  const handleOnChange = (event) => {
    console.log(event.target.value);
    // textToShow = event.target.value;
    setTextState(event.target.value);
  };

  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      let newFoodItem = event.target.value; // user Enter food Item name
      event.target.value = "";
      let newItems = [...foodItems, newFoodItem]; // add food item into main list of food items     == (...) means spread operator
      setFoodItems(newItems); // set the food item list
      console.log("Food value enter is :" + newFoodItem);
    }
  };

  return (
    //<React.Fragment>

    <>
      <Container asdf="asdasdf">
        <h1 className="food-heading">Healthy Food</h1>

        {/* using if else condition  */}
        {/* {foodItems.length === 0 ? <h3>I am still hungry...!</h3> : null} */}

        {/* using ternary operators */}
        {/* {emptyMessage} */}

        {/* using logical operators */}
        {/* <ErrorMessage items={foodItems}></ErrorMessage> */}

        <FoodInput
          handleOnChange={handleOnChange}
          handlleKeyDown={onKeyDown}
        ></FoodInput>
        <ErrorMessage items={foodItems}></ErrorMessage>

        <p>{textToShow}</p>

        <FoodItems items={foodItems}></FoodItems>
      </Container>

      <Container>
        <p>Above Food Items is good for health and well being...!</p>
      </Container>
    </>
    //</React.Fragment>
  );
}

export default App;
