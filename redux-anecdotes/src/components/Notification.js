import React from 'react'
import { connect } from 'react-redux'


const Notification = (props) => {
  const notification = props.notification
  
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

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  }
}

const connectedNotification = connect(mapStateToProps)(Notification)

export default connectedNotification