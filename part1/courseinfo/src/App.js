const Header = (props) => {
  return (
    <>
      <h1>{props.name}</h1>
    </>
  );
};

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  );
};

const Content = (props) => {
  return (
    <>
      {props.parts.map((part) => (
        <Part part={part} />
      ))}
    </>
  );
};

const Total = (props) => {
  const total = props.parts.reduce((sum, part) => sum + part.exercises, 0);
  return <p>Number of exercises {total}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  return (
    <div>
      <Header name={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;
