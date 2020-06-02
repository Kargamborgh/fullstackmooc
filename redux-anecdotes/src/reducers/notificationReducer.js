const initialNotification = 'initial notification lololol'

const notificationReducer = (state = initialNotification, action) => {
    switch(action.type) {
        case 'RENDER':
            state = action.data.anecdote
            return state
        case 'HIDE':
            return action.notification
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

export const hideNotification = notification => {
    return null
}

export default notificationReducer