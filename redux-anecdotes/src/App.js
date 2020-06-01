import React from 'react'
import Anecdote from './components/Anecdote'
import NewAnecdote from './components/NewAnecdote'

const App = () => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <Anecdote />
      <NewAnecdote />
    </div>
  )
}

export default App