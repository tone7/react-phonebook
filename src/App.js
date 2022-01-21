import React, { useState, useEffect } from 'react'
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import personService from "./services/persons"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {    
    console.log("effect")
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
    })
  }, [])

  console.log('render', persons.length, 'persons')

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    if(newName !== "" && newNumber !== ""){
      const personObject = {
        name: newName,
        number: newNumber,
      }

      if(persons.find(person => {
        if(person.name === personObject.name) return true
        
        return false
      })){
        alert(`${personObject.name} is already added to phonebook`)
        setNewName('')
      } else if(persons.find(person => {
        if(person.number === personObject.number) return true

        return false
      })){
        alert(`${personObject.number} is already asigned to someone else`)
        setNewNumber('')
      } else {    
        personService.create(personObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
          })
        }
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter 
        filter={filter} 
        onchange={handleFilterChange}
      />
      <h3>add a new</h3>
      <PersonForm 
        addperson={addPerson} 
        newname={newName} 
        newnumber={newNumber} 
        onnamechange={handleNameChange} 
        onnumberchange={handleNumberChange}
      />
      <h3>Numbers</h3>
      <Persons 
        filter={filter} 
        persons={persons}
      />
    </div>
  )
}

export default App