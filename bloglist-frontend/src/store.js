import { createStore } from 'redux'
import notificationReducer from './reducers/notificationReducer'
import { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore(
  notificationReducer,
  composeWithDevTools()
)

export default store