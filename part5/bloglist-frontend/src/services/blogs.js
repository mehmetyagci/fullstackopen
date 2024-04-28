import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id, updateObject) => {
  const config = {
    headers: { Authorization: token },
  }

  console.log('blogservice->update->updateObject',updateObject)
  const response = await axios.put(`${baseUrl}/${id}`, updateObject, config)
  console.log('blogservice->update->response', response)
  console.log('blogservice->update->response.data', response.data)
  return response.data
}

const remove = async (id) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, create, update, remove, setToken }