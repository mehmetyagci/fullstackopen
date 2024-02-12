const Header = (props) => {
  console.log('Header');
  console.log(props);
  return (
    <h1>{props.course}</h1>
  )
}

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
  const course = 'Half Stack application development'
  const parts =  [ 
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name:  'Using props to pass data',
      exercises: 7
    },
    { 
      name: 'State of a component',
      exercises: 14
    }
  ];

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Footer parts={parts} />
    </div>
  )
}

export default App