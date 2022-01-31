import { useState, useEffect } from "react";
import "./styles.css";

const App = () => {
  const [activity, setActivity] = useState("");
  const [showDice, setShowDice] = useState(false);
  const [message, setMessage] = useState("");
  const [rollAction, setRollAction] = useState("Roll Dice");
  const [showButton, setShowButton] = useState(true);
  let timer = {};
  const styles = {
    dice: {
      display: showDice ? "inline-block" : "none"
    }
  };

  const getData = async () => {
    try {
      const response = await fetch("https://www.boredapi.com/api/activity");
      const data = await response.json();
      setTimeout(() => {
        setActivity(data.activity);
        clearTimeout(timer);
      }, 2000);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (activity) {
      setShowDice(false);
      setShowButton(true);
      setMessage("");
    }
  }, [activity]);

  const rollDice = () => {
    setActivity("");
    setRollAction("Roll Again");
    setShowButton(false);
    setShowDice(true);

    getData();
    setMessage("Thinking..");

    timer = setTimeout(() => setMessage("Still thinking.."), 1000);
  };

  return (
    <div className="App">
      <h1>What should I do today?</h1>
      {showButton && <button onClick={rollDice}>{rollAction}</button>}
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
