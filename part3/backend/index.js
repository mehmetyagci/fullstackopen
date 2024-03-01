const express = require('express')
const app = express()
const morgan = require('morgan')
require('dotenv').config()

const Phonebook = require('./models/phonebook')

app.use(express.static('dist'))

// Define a custom token for Morgan to log request data for POST requests
morgan.token('postData', (req) => {
  if (req.method === 'POST') {
    console.log('req.body', req.body)
    const body = req.body ?? {}
    const postData = JSON.stringify(body)
    console.log('postData', postData)
    return postData
  }
  return ''
})

const requestLogger = morgan(':method :url :status :res[content-length] - :response-time ms - :postData') // Use the custom token in Morgan

const errorHandler = (error, _request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

const cors = require('cors')

app.use(cors())
app.use(express.json())
app.use(requestLogger)

const unknownEndpoint = (_request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/', (_request, response) => {
  console.log('index.js -> GET /')
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (_request, response) => {
  console.log('index.js -> GET /api/persons')
  Phonebook.find({}).then(phonebooks => {
    response.json(phonebooks)
  })
})

app.post('/api/persons', (request, response, next) => {
  console.log('part3->backend->index.js -> POST /api/persons')
  const body = request.body

  // console.log('body.name', body.name)
  // console.log('body.number', body.number)
  // if (!body.name || !body.number) {
  //   return response.status(400).json({ error: 'name or number missing' })
  // }

  // const exists = phonebooks.find(p => p.name === body.name)
  // console.log('exists', exists)
  // if (exists) {
  //   return response.status(400).json({
  //     error: 'name must be unique. details: name already exists in the phonebook'
  //   })
  // }

  const phonebook = new Phonebook({
    name: body.name,
    number: body.number,
  })

  phonebook.save()
    .then(savedPhonebook => {
      console.log('savedPhonebook', savedPhonebook)
      response.json(savedPhonebook)
    })
    .catch(error => {
      console.error('part3->backend->index.js, Error while saving phonebook:', error)
      next(error)
    })
})



app.get('/api/persons/:id', (request, response, next) => {
  console.log('index.js -> GET /api/persons/:id')
  console.log('request.params.id', request.params.id)
  Phonebook.findById(request.params.id)
    .then(phonebook => {
      if (phonebook) {
        response.json(phonebook)
      } else {
        console.log('Person not found')
        response.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
      next(error)
    })
})

app.delete('/api/persons/:id', (request, response, next) => {
  console.log('index.js -> DELETE /api/persons/:id')
  console.log('request.params.id', request.params.id)
  Phonebook.findByIdAndDelete(request.params.id)
    .then(() => {
      response.status(204).end()
    })
    .catch(error => next(error))
})


app.put('/api/persons/:id', (request, response, next) => {
  console.log('index.js -> PUT /api/persons/:id')
  console.log('request.params.id', request.params.id)
  const { name, number } = request.body

  Phonebook.findByIdAndUpdate(
    request.params.id,
    { name, number },
    { new: true, runValidators: true, context: 'query' }
  )
    .then(updatedPhonebook => {
      response.json(updatedPhonebook)
    })
    .catch(error => next(error))
})

app.use(unknownEndpoint)
// this has to be the last loaded middleware, also all the routes should be registered before this!
// handler of requests with result to errors
app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})