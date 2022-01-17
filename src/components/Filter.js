import React from "react"

const Filter = ({ filter, onchange }) => {
    return (
        <div>
            filter shown with <input value={filter} onChange={onchange}/>
        </div>
    )
}

export default Filter