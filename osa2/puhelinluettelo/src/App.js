import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Person from './components/Person'
import PersonForm from './components/PersonForm'
import axios from 'axios'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterValue, setFilterValue ] = useState('')
  const [ message, setMessage ] = useState(null)

  useEffect(() => {
    personService
  .getAll()
  .then(initialPersons => {
    setPersons(initialPersons)
  })
  }, [])

  const addName = (event) => {
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber
    }

    if (!persons.map(n => n.name).includes(newName)) {
      personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setMessage(
          `${newName} added `
        )
        setTimeout(() => {
          setMessage(null)
        }, 5000)
        setNewName('')
      })
    } 
    else {
      if (window.confirm(`${newName} exists, update number?`)) {

      const id = persons.map(n => n.name).indexOf(newName)+1
      console.log(id)
      
      personService
      .update(id, personObject)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
      })
      setMessage(
        `${persons[id-1].name} updated`
      )
      setTimeout(() => {
        setMessage(null)
      }, 5000)
      setNewName('')
      setNewNumber('')
    }
    }
  }

  const removePerson = id => {
    const url = `http://localhost:3001/persons/${id}`
    const person = persons.find(p => p.id === id)

    if (window.confirm(`Delete ${person.name}?`)) {
    personService
    .remove(id)
    .then(returnedPerson => {
      setPersons(persons.filter(n => n.id !== id))
    })
    setMessage(
      `${person.name} removed`
    )
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }
  }

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(`${filterValue}`))

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
      <Notification message={message} />
      <Filter filterValue={filterValue}
      handleFilterValue={handleFilterValue} />
      <div>
        <h2>Add new</h2>
      </div>
      <PersonForm addName={addName}
      newName={newName} handleNewName={handleNewName}
      newNumber={newNumber} handleNewNumber={handleNewNumber}/>
      <h2>Numbers</h2>
      <ul>
        {personsToShow.map((person, i) =>
        <Person key={i} person={person}
        removeName={() => removePerson(person.id)}/>
        )}
      </ul>
    </div>
  )

}

export default App