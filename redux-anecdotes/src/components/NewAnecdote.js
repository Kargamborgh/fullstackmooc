import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const NewAnecdote = (props) => {
    const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
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

export default NewAnecdote