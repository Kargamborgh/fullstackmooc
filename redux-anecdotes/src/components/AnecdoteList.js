import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({ anecdote, voteOnClick }) => {
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

const Anecdotes = (props) => {

    const sortedAnecdotes = 
    props.anecdotes
    .sort((a,b) => 
        (a.votes < b.votes) ? 1 : ((b.votes < a.votes) ? -1 : 0))


    return (
        <div>
            {sortedAnecdotes.map(anecdote =>
                <AnecdoteList
                key={anecdote.id}
                anecdote={anecdote}
                voteOnClick={() =>
                props.voteAnecdote(
                    anecdote.id,
                    {...anecdote, votes: anecdote.votes+1}) &&
                props.setNotification(`upvoted ${anecdote.content}`, 5)}
                />
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    if (state.filter === '') {
        return {
            anecdotes: state.anecdotes
        }
    }
    return {
        anecdotes: state.anecdotes
        .filter(anecdote => 
            anecdote.content.toLowerCase().includes(state.filter))
    } 
}

const mapDispatchToProps = {
    voteAnecdote,
    setNotification
}

const connectedAnecdotes = connect(
    mapStateToProps,
    mapDispatchToProps
)(Anecdotes)

export default connectedAnecdotes