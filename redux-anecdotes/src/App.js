import React from 'react'
import Anecdote from './components/Anecdote'

const App = () => {

  return (
    <div>
      <h2>Anecdotes</h2>
      <Anecdote />
      <h2>create new</h2>
      <form>
        <div><input /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App