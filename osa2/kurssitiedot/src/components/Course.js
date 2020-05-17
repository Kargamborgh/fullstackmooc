import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }

const Total = ({ course }) => {
   
    const sum = course.parts.reduce((a,b) => a + b.exercises,0)
    console.log(sum)
    return(
      <p>Number of exercises {sum}</p>
    ) 
}

const Part = (props) => {
    //console.log('part')
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>    
  )
}

const Content = ({ course }) => {
    //console.log('tuleeks kontent')
  return (
    <div>
      <Part part={course.parts[0]} />
      <Part part={course.parts[1]} />
      <Part part={course.parts[2]} />
      <Part part={course.parts[3]} />
    </div>
  )
}

const Course = ({ course }) => {
    return (
        <div>
        <Header course={course} />
        <Content course={course} />
        <Total course={course} />
        </div>
    )
}

export default Course;