import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Display = (props) => (
<div>
  {props.text} {props.value} 
</div>
)

const Button = (props) => (
  <button onClick={props.onClick}>
  {props.text}
  </button>
)

const Statistics = ({good, neutral, bad, total, sum}) => {
  return (
  <>
  <p>Statistics</p>
      <Display text='good' value={good} />
      <Display text='neutral' value={neutral} />
      <Display text='bad' value={bad} />
      <Display text='total' value={total} />
      <Display text='average' value={sum/total} />
      <Display text='positive percent' value={(good/total)*100} />
      </>
)
}

const App = (props) => {

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
      <Statistics good={good} neutral={neutral} bad={bad} total={total} sum={sum}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)