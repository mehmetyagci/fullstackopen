import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const get = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

// const getAll = () => {
//   const request = axios.get(baseUrl)
//   const nonExisting = {
//     id: 10000,
//     content: 'This person is not saved to server',
//     important: true,
//   }
//   return request.then(response => response.data.concat(nonExisting))
// }

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

const deletePerson = (id) => {
    console.log('Deleting person with ID:', id); // Log the ID being deleted
    return axios.delete(`${baseUrl}/${id}`)
        .then(response => {
            console.log('Response after deletion:', response.data); // Log the response data from the server
            return response.data; // Return the data received from the server
        })
        .catch(error => {
            console.error('Error deleting person:', error); // Log any errors that occur during deletion
            throw error; // Throw the error to be handled by the caller
        });
}


export default { getAll, get, create, update, deletePerson }