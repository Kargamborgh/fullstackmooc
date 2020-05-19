import React from 'react'

const Person = ({ person, removeName }) => {
    const label = 'remove'
    return (
        <li>
        {person.name} {person.number}
        <button onClick={removeName}>{label}</button>
        </li>
    )
}

export default Person