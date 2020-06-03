const delay = ms => new Promise(res => setTimeout(res, ms))

const notificationReducer = (state = '', action) => {
    switch(action.type) {
        case 'RENDER':
            state = action.data.anecdote
            return state
        case 'HIDE':
            state = action.data.text
            return state
        default:
            return state
    }
}

export const renderNotification = anecdote => {
    return {
        type: 'RENDER',
        data: { anecdote }
    }
}

export const hideNotification = text => {
    return {
        type: 'HIDE',
        data: { text }
    }
}

export const setNotification = (anecdote, timer) => {
    const text = ''
    return async dispatch => {
        dispatch({
            type: 'RENDER',
            data: {anecdote}
        })
        await delay(timer * 1000)
            dispatch({
                type: 'HIDE',
                data:{text}
            })
    }
}

export default notificationReducer