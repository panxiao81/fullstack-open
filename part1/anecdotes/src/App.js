import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const getRandomInt = () => {
    return Math.floor(Math.random() * anecdotes.length);
  };
  const [selected, setSelected] = useState(getRandomInt());
  const handleClick = () => {
    let i = getRandomInt();
    while (i === selected) {
      i = getRandomInt();
    }
    setSelected(i);
  };
  const handleVote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };
  return (
    <>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} votes={votes[selected]} />
      <button onClick={handleVote}>vote</button>
      <button onClick={handleClick}>Next Anecdote</button>
      <h1>Anecdote with most votes</h1>
      <Anecdote
        anecdote={anecdotes[votes.indexOf(Math.max(...votes))]}
        votes={Math.max(...votes)}
      />
    </>
  );
};

function Anecdote(props) {
  return (
    <>
      <p>{props.anecdote}</p>
      <p>has {props.votes} votes</p>
    </>
  );
}

export default App;
