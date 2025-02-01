import styles from "./App.module.css";
import ButtonsContainer from "./component/ButtonsContainer";
import Display from "./component/Display";

function App() {
  return (
    <div className={styles.calculator}>
      <Display></Display>
      <ButtonsContainer></ButtonsContainer>
    </div>
  );
}

export default App;
