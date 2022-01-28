import { useState } from "react";
import "./styles.css";

const App = () => {
  const [activity, setActivity] = useState();
  const [showDice, setShowDice] = useState(false);
  const [message, setMessage] = useState("");
  const [firstRoll, setFirstRoll] = useState(true);

  const styles = {
    dice: {
      display: showDice ? "inline-block" : "none"
    }
  };

  const getData = async () => {
    try {
      const response = await fetch("https://www.boredapi.com/api/activity");
      const data = await response.json();
      setActivity(data.activity);
    } catch (e) {
      console.log(e);
    }
  };

  const rollDice = () => {
    setShowDice(true);
    if (firstRoll) {
      setFirstRoll(false);
    }
    getData();
    setMessage("Thinking..");
    // setTimeout(() => setMessage("Still thinking.."), 1000);
    setMessage("");
    setShowDice(false);
  };

  return (
    <div className="App">
      <h1>What should I do today?</h1>
      <button onClick={rollDice}>
        {firstRoll ? "Roll Dice" : "Roll Again"}
      </button>
      <img
        style={styles.dice}
        width="100"
        alt="dice"
        src="https://i0.wp.com/www.richardhughesjones.com/wp-content/uploads/2019/01/dice-gif.gif"
      />
      {message}
      <h2>{activity}</h2>
    </div>
  );
};

export default App;
