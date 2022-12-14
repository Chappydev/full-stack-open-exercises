import Header from "./Header";
import Content from "./Content";
import Total from "./Total";

const Course = ({ course }) => {
  return (
    <div>
      <Header text={course.name} />
      <Content parts={course.parts} />
      <Total sum={course.parts.reduce((prev, cur) => { return prev + cur.exercises }, 0)} />
    </div>
  )
}

export default Course;