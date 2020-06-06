const notificationReducer = ( state = '', action ) => {
  switch(action.type) {
  case 'RENDER':
    return action.notification
  case 'HIDE':
    state = action.data.text
    return state
  default:
    return state
  }
}

export const renderNotification = notification => {
  return {
    type: 'RENDER',
    notification
  }
}

export const hideNotification = text => {
  return {
    type: 'HIDE',
    data: { text }
  }
}

export default notificationReducer