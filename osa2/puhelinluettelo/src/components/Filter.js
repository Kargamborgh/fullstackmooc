import React from 'react'

const Filter = ({ filterValue, handleFilterValue }) => {
    return (
        <div>
        Filter shown with <input 
        value={filterValue}
        onChange={handleFilterValue}
        />
      </div>
    )
}

export default Filter