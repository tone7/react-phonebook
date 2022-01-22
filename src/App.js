import React, { useState, useEffect } from 'react'
import Filter from "./components/Filter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import personService from "./services/persons"
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('success')

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

      let existingPerson = {}

      if(persons.find(person => {
        if(person.name === personObject.name){
          existingPerson = person
          return true
        }
        
        return false
      })){
        if(existingPerson.number !== personObject.number){
          if(window.confirm(`${personObject.name} is already added to phonebook, replace the old number with a new one?`)){
            personService.update(existingPerson.id, personObject)
              .then(updatedPerson => {
                console.log(`Updated person with ID ${updatedPerson.id}: {${updatedPerson.name}, ${updatedPerson.number}}`);
                const newPersons = [...persons]
                for(let person of newPersons){
                  if(person.id === updatedPerson.id){
                    person.name = updatedPerson.name
                    person.number = updatedPerson.number
                  }
                }
                setPersons(newPersons)
                setMessage(`Updated person with ID ${updatedPerson.id}: {${updatedPerson.name}, ${updatedPerson.number}}`)
                setMessageType('success')
                setTimeout(() => setMessage(null), 5000)
                setNewName('')
                setNewNumber('')
              })
              .catch(error => {
                setMessage(`the person '${existingPerson.name}' was already deleted from server`)
                setMessageType('error')
                setTimeout(() => setMessage(null), 5000)
                setPersons(persons.filter(person => person.id !== existingPerson.id))    
              })
          }
        }
      } else {    
        personService.create(personObject)
          .then(returnedPerson => {
            console.log(`Created person with ID ${returnedPerson.id}: {${returnedPerson.name}, ${returnedPerson.number}}`);
            setPersons(persons.concat(returnedPerson))
            setMessage(`Created person with ID ${returnedPerson.id}: {${returnedPerson.name}, ${returnedPerson.number}}`)
            setMessageType('success')
            setTimeout(() => setMessage(null), 5000)
            setNewName('')
            setNewNumber('')
          })
          .catch(error => {
            setMessage(`the person '${existingPerson.name}' was already deleted from server`)
            setMessageType('error')
            setTimeout(() => setMessage(null), 5000)
            setPersons(persons.filter(person => person.id !== existingPerson.id))    
          })
        }
    }
  }

  const removePerson = (personObject) => {

    if(window.confirm(`Do you really want to delete ${personObject.name}?`)){
      personService.remove(personObject)
        .then(removedPerson => {
          const newPersons = persons.filter(person => person.id !== removedPerson.id)
          console.log(`Removed person with ID ${removedPerson.id}: {${removedPerson.name}, ${removedPerson.number}}`);
          setPersons(newPersons)
          setMessage(`Removed person with ID ${removedPerson.id}: {${removedPerson.name}, ${removedPerson.number}}`)
          setMessageType('success')
          setTimeout(() => setMessage(null), 5000)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setMessage(`the person '${personObject.name}' was already deleted from server`)
          setMessageType('error')
          setTimeout(() => setMessage(null), 5000)
          setPersons(persons.filter(person => person.id !== personObject.id))    
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType}/>
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
        removePerson={removePerson}
      />
    </div>
  )
}

export default App