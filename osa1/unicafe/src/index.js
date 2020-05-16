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

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [sum, setSum] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
    setTotal(total + 1)
    setSum(sum + 1)
  }
  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
    setTotal(total + 1)
  } 
  const handleBadClick = () => {
    setBad(bad + 1)
    setTotal(total + 1)
    setSum(sum - 1)
  }

  const countAverage = (props) => {
    return (
      sum / total
    )
  }

  const countPositivePercentage = (props) => {
    return (
      (good / total)*100
    )
  }


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
      <Display value={total} text='total' />
      <Display value={countAverage()} text='average' />
      <Display value={countPositivePercentage()} text='positive percentage'/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)