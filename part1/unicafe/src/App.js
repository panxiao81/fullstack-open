import React, { useState } from "react";

function App() {
  const [stat, setStat] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });
  const handleClickGood = () => {
    setStat({
      ...stat,
      good: stat.good + 1,
    });
  };
  const handleClickNeutral = () => {
    setStat({
      ...stat,
      neutral: stat.neutral + 1,
    });
  };
  const handleClickBad = () => {
    setStat({
      ...stat,
      bad: stat.bad + 1,
    });
  };
  return (
    <>
      <h1>Give Feedback</h1>
      <Button handleClick={handleClickGood} text="Good" />
      <Button handleClick={handleClickNeutral} text="Neutral" />
      <Button handleClick={handleClickBad} text="Bad" />
      <Statistics stat={stat} />
    </>
  );
}

function Button(props) {
  return <button onClick={props.handleClick}>{props.text}</button>;
}

function Statistics(props) {
  const { good, neutral, bad } = props.stat;
  if (good === 0 && neutral === 0 && bad === 0) {
    return <p>No feedback given</p>;
  }
  return (
    <>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticsLine text="Good" value={good} />
          <StatisticsLine text="Neutral" value={neutral} />
          <StatisticsLine text="Bad" value={bad} />
          <StatisticsLine text="All" value={good + neutral + bad} />
          <StatisticsLine
            text="Average"
            value={(good - bad) / (good + neutral + bad)}
          />
          <StatisticsLine
            text="Positive"
            value={(good / (good + neutral + bad)) * 100 + "%"}
          />
        </tbody>
      </table>
    </>
  );
}

function StatisticsLine(props) {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
}

export default App;
