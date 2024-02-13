const Footer = ({parts}) => {
    console.log('Footer');
    console.log(parts);

    const totalExercises = parts.reduce((sum, part) => { 
        console.log('what is happening', sum, part);
        return sum + part.exercises;
    }, 0);

    console.log('totalExercises', totalExercises);
    
    return (
        <p>
       <b>total of {totalExercises} exercises</b>
       </p>
    )
  }

export default Footer;
