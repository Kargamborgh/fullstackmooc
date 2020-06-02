import React from 'react'
import { useSelector } from 'react-redux'


const Notification = () => {
  const notification = useSelector(state => state.notification)

  
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const style2 = {
    padding: 10
  }
  
  return (
    <div style={notification !== '' ? style : style2}>
      {notification}
    </div>
  )
}

export default Notification