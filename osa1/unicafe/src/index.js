import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Display = props => 
<div>
  {props.text} {props.value}
</div>

const Button = (props) => (
  <button onClick={props.onClick}>
  {props.text}
  </button>
)

const App = () => {

  const handleGoodClick = () => setGood(good + 1)
  const handleNeutralClick = () => setNeutral(neutral + 1)
  const handleBadClick = () => setBad(bad+1)

  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Give feedback!</h1>
      <Button onClick={handleGoodClick} text={"good"}/>
      <Button onClick={handleNeutralClick} text={"neutral"}/>
      <Button onClick={handleBadClick} text={"bad"}/>
      <p>Statistics</p>
      <Display value={good} text='good' />
      <Display value={neutral} text='neutral' />
      <Display value={bad} text='bad' />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)