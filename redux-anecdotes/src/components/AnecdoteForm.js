import React from 'react'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    console.log(props)

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.createAnecdote(content)
        props.setNotification(`added ${content}`, 5)
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

const mapDispatchToProps = {
    createAnecdote,
    setNotification
}

const connectedAnecdoteForm = connect(
    null,
    mapDispatchToProps,
)(AnecdoteForm)

export default connectedAnecdoteForm