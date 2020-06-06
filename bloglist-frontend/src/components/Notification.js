import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state)
  if (notification === null) {
    return null
  }

  return (
    <div className="error">
      {notification}
    </div>
  )
}

export default Notification