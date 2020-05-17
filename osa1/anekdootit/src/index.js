import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <div>
  <button onClick={props.onClick}>
  {props.text}
  </button>
  </div>
)

let random = 0

const randomGen = () => {
  random = Math.floor(Math.random() * 6)
  return random
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(Array(6+1).join('0').split('').map(parseFloat))

  const handleNewAnecdote = () => {

    setSelected(selected - selected + randomGen())
  }

  const handleVote = () => {
    let copy = [...points]
    copy[selected] +=1
    setPoints(copy)
  }

  return (
    <div>
      {props.anecdotes[selected]}
      <div>
      has {points[selected]} upvotes
      </div>
      <Button onClick={handleNewAnecdote} text='new anecdote' />
      <Button onClick={handleVote} text='upvote' />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)