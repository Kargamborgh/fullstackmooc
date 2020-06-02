import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { renderNotification, hideNotification } from '../reducers/notificationReducer'


const AnecdoteForm = (props) => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(renderNotification(`added ${content}`))
        setTimeout(() => {
            dispatch(hideNotification(''))
        }, 5000)
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