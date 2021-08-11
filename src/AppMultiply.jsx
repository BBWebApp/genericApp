import { useState } from "react";
import "./App.css";
import { withRouter } from "react-router-dom";

// buttons that add/subtracts a number
function App(props) {
  console.log(props);

  const [count, setCount] = useState(0);

  const handleBtn = (event) => {
    setCount(count * count);
  };

  return (
    <div className="App">
      <p>Count is: {count}</p>
      <button id="square" onClick={handleBtn}>
        square
      </button>
    </div>
  );
}

export default withRouter(App);
