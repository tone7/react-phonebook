import React from "react";

const Persons = ({ filter, persons, removePerson }) => {
    const regex = new RegExp(`^.*${filter.toLowerCase()}.*$`)
    const personsToShow = persons.filter(person => person.name.toLowerCase().match(regex))

    return (
        <div>
            {personsToShow.map(person => 
                <div key={person.name}>
                    {person.name} {person.number} <button onClick={() => removePerson(person)}>delete</button>
                </div>)}
        </div>
    )
}

export default Persons