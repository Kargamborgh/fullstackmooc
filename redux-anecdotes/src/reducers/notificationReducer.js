const initialNotification = 'initial notification lololol'

const notificationReducer = (state = initialNotification, action) => {
    switch(action.type) {
        case 'NOTIFICATION':
            return action.notification
        default:
            return state
    }
}

export const renderNotification = notification => {
    return {
        type: 'NOTIFICATION',
        notification
    }
}

export default notificationReducer