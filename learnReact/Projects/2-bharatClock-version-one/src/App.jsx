import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ClockHeading from "./components/ClockHeading";
import ClockSlogen from "./components/ClockSlogen";
import CurrentTime from "./components/CurrentTime";

function App() {
  return (
    <center>
      <ClockHeading></ClockHeading>
      <ClockSlogen></ClockSlogen>
      <CurrentTime></CurrentTime>
    </center>
  );
}

export default App;
