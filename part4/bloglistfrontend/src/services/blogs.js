import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const get = (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}
const deleteBlog = (id) => {
  console.log('Deleting blog with ID:', id);
  return axios.delete(`${baseUrl}/${id}`)
    .then(response => {
      console.log('Response after deletion:', response.data);
      return response.data;
    })
    .catch(error => {
      console.error('Error deleting blog:', error);
      throw error;
    });
}


export default {
  getAll,
  get,
  create,
  update,
  deleteBlog
}
