import anecdoteService from '../services/anecdotes'

const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_ANECDOTE':
        return [...state, action.data]
      case 'INIT_ANECDOTES':
        return action.data
    case 'VOTE':
      const id = action.data.id
      const anecdoteToUpvote = state.find(a => a.id === id)
      const upvotedAnecdote = {
        ...anecdoteToUpvote,
        votes: anecdoteToUpvote.votes + 1
      }
      return state
      .map(anecdote => anecdote.id !== id ? anecdote : upvotedAnecdote)
    default:
      return state
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
    type: 'INIT_ANECDOTES',
    data: anecdotes
  })
}
}

export const voteAnecdote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

export default anecdoteReducer