import React from 'react'

const Error = ({ error }) => {
    if (error === null) {
      return null
    }
  
    return (
      <div className="err">
        {error}
      </div>
    )
  }

  export default Notification