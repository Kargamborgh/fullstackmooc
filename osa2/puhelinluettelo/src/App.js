import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addName = (event) => {
    event.preventDefault()

    const nameObject = {
      name: newName,
    }

    if (persons.map(n => n.name).includes(newName)) {
      alert(`${newName} on jo lisätty`)
      setNewName('')
    } 
    else {
    setPersons(persons.concat(nameObject))
    setNewName('')
    }
  }

  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input
       value={newName} 
       onChange={handleNewName}
       />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
        <li key={person.name}>
          {person.name}
          </li>
        )}
      </ul>
    </div>
  )

}

export default App