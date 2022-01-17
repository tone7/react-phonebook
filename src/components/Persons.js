import React from "react";

const Persons = ({ filter, persons }) => {
    const regex = new RegExp(`^.*${filter.toLowerCase()}.*$`)
    const personsToShow = persons.filter(person => person.name.toLowerCase().match(regex))

    return (
        <div>
            {personsToShow.map(person => <div key={person.name}>{person.name} {person.number}</div>)}
        </div>
    )
}

export default Persons