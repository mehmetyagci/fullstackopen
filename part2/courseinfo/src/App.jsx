import Course from './components/Course'

const Part = (props) => {
  console.log('Part');
  console.log(props);
  const parts = props.parts;
  console.log(parts);
  const result = parts.map(part => <p key={part.name}>{part.name} {part.exercises}</p>);
  console.log(result)
  return (
    <div>
      {result}
    </div>
  )
}


const Content = (props) => {
  console.log('Content');
  console.log(props);
  return (
    <Part parts={props.parts} />
  )
}

const Footer = (props) => {
  console.log('Footer');
  console.log(props);
  const totalExercises = props.parts.reduce((sum, part) => sum + part.exercises, 0);
  console.log(totalExercises);
  return (
    <p>Number of exercises {totalExercises} </p> 
  )
}


const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return <Course course={course} />
}

export default App