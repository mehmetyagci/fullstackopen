import Content from './Content';
import Header from './Header';
import Footer from './Footer';

const Course = ({course}) => {
    console.log('Course');
    console.log(course);
    return (
      <div>
            <Header  name={course.name}  />
            <Content parts={course.parts}/>
            <Footer parts={course.parts} />
      </div>
    )
  }

export default Course;
