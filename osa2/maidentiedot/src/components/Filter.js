import React from 'react'

const Filter = ({ filterValue, handleFilterValue }) => {
    return (
        <div>
            Filter countries by:
            <input
            value={filterValue}
            onChange={handleFilterValue}
            />
        </div>
    )
}

export default Filter