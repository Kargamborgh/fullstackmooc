import React from 'react'
import ReactDOM from 'react-dom'

const Header = ({ courses }) => {
    return (
      <h1>{courses.name}</h1>
    )
  }

const Total = ({ courses }) => {
   
    const sum = courses.parts.reduce((a,b) => a + b.exercises,0)
    return(
      <p>Number of exercises {sum}</p>
    ) 
}

const Part = (part) => {
    console.log(part)
  return (
    <p>
      {part.part.name} {part.part.exercises}
    </p>    
  )
}

const Content = ({ courses }) => {
    //console.log('tuleeks kontent')
  return (
    <div>
        {courses.parts.map((part, i) => console.log('asd',part,i) ||
        <Part key={part.id} part={part} />
        )}
    </div>
  )
}

const Course = ({ courses }) => {
    return (
        <div>
        <Header courses={courses} />
        <Content courses={courses} />
        <Total courses={courses} />
        </div>
    )
}

export default Course;