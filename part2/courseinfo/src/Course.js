const Header = ({ course }) => <h2>{course}</h2>;

const Total = ({ sum }) => <h3>Total of {sum} exercises</h3>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map((part) => (
      <Part key={part.id} part={part} />
    ))}
  </>
);

const Course = ({ course }) => {
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total
        sum={course.parts.reduce((s, p) => {
          return s + p.exercises;
        }, 0)}
      />
    </div>
  );
};

export default Course;
