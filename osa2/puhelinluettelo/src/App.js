import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterValue, setFilterValue ] = useState('')

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

  const personsToShow = persons.filter(p => p.name.toLowerCase().includes(`${filterValue}`))

  const handleNewName = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterValue = (event) => {
    console.log(event.target.value)
    setFilterValue(event.target.value)
  }

  

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        Filter shown with <input 
        value={filterValue}
        onChange={handleFilterValue}
        />
      </div>
      <div>
        <h2>Add new</h2>
      </div>
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
        {personsToShow.map(person =>
        <li key={person.name}>
          {person.name} {person.number}
          </li>
        )}
      </ul>
    </div>
  )

}

export default App