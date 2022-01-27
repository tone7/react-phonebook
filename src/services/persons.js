import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    newObject.id = id
    return request.then(response => newObject)
}

const remove = removeObject => {
    const request = axios.delete(`${baseUrl}/${removeObject.id}`)
    return request.then(response => removeObject)
}

export default { getAll, create, update, remove }