import React from "react";

const PersonForm = ({ addperson, newname, newnumber, onnamechange, onnumberchange }) => {
    return (
        <form onSubmit={addperson}>
            <div>
                name: <input value={newname} onChange={onnamechange}/>
            </div>
            <div>
                number: <input value={newnumber} onChange={onnumberchange}/>
            </div>
            <div>
                <button type="submit">add</button>
            </div>
        </form>
    )
}

export default PersonForm