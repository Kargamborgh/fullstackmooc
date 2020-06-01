import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const Anecdote = ({ anecdote, voteOnClick }) => {
    return (
    <div>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={voteOnClick}>vote</button>
          </div>
        </div>
    </div>
    )
}

const Anecdotes = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state)

    return (
        <div>
            {anecdotes.map(anecdote =>
                <Anecdote
                key={anecdote.id}
                anecdote={anecdote}
                voteOnClick={() =>
                dispatch(voteAnecdote(anecdote.id))}
                />
            )}
        </div>
    )
}

export default Anecdotes