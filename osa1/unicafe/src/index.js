import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const StatisticLine = (props) => (
<tr>
  <td>
  {props.text} {props.value}
  </td> 
</tr>
)

const Button = (props) => (
  <button onClick={props.onClick}>
  {props.text}
  </button>
)

const Statistics = ({good, neutral, bad, total, sum}) => {
  if (good === 0 && neutral === 0 && bad === 0 ){
    return (
      <div>
        No feedback given
      </div>
    )
  }
  return (
  <>
  <table>Statistics
      <StatisticLine text='good' value={good} />
      <StatisticLine text='neutral' value={neutral} />
      <StatisticLine text='bad' value={bad} />
      <StatisticLine text='total' value={total} />
      <StatisticLine text='average' value={sum/total} />
      <StatisticLine text='positive percent' value={(good/total)*100} />
      </table>
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