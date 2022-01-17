import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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
        setPersons(persons.concat(personObject))
        setNewName('')
        setNewNumber('')
      }
    }
  }

  const regex = new RegExp(`^.*${filter.toLowerCase()}.*$`)
  const personsToShow = persons.filter(person => person.name.toLowerCase().match(regex))

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={filter} onChange={handleFilterChange}/>
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        {personsToShow.map(person => <div key={person.name}>{person.name} {person.number}</div>)}
    </div>
  )
}

export default App