import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '040-123-1244' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const addName = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    if (persons.map(n => n.name).includes(newName)) {
      alert(`${newName} on jo lisätty`)
      setNewName('')
      setNewNumber('')
    } 
    else {
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
    }
  }

  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
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
          name: <input
       value={newNumber} 
       onChange={handleNewNumber}
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
          {person.name} {person.number}
          </li>
        )}
      </ul>
    </div>
  )

}

export default App