import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(setNotification(`added ${content}`, 5))
    }

    return (
        <>
        <h2>Create new</h2>
        <form onSubmit={addAnecdote}>
            <input name='anecdote' />
            <button type='submit'>add</button>
        </form>
        </>
    )
}

export default AnecdoteForm