import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { renderNotification, hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({ anecdote, voteOnClick, notificationOnClick }) => {
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

    const anecdotes = useSelector(state => {
        if (state.filter === '') {
            return state.anecdotes
        }
        return state.anecdotes
        .filter(anecdote => 
            anecdote.content.toLowerCase().includes(state.filter))
    })

    const sortedAnecdotes = 
    anecdotes
    .sort((a,b) => 
        (a.votes < b.votes) ? 1 : ((b.votes < a.votes) ? -1 : 0))


    return (
        <div>
            {sortedAnecdotes.map(anecdote =>
                <AnecdoteList
                key={anecdote.id}
                anecdote={anecdote}
                voteOnClick={() =>
                dispatch(voteAnecdote(anecdote.id, {...anecdote, votes: anecdote.votes+1})) &&
                dispatch(renderNotification(`upvoted ${anecdote.content}`)) &&
                setTimeout(() => {
                    dispatch(hideNotification(''))}, 5000)}
                />
            )}
        </div>
    )
}

export default Anecdotes