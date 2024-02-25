const express = require('express')
const app = express()
require('dotenv').config()

const Phonebook = require('./models/phonebook')

let phonebooks = []

app.use(express.static('dist'))
const morgan = require('morgan');

// Define a custom token for Morgan to log request data for POST requests
morgan.token('postData', (req,  res) => {
  if (req.method === 'POST') {
      console.log('req.body', req.body)
      const postData = JSON.stringify(req.body);
      console.log('postData', postData)
      return postData;
  }
  return '';
});

// Use the custom token in Morgan
const requestLogger = morgan(':method :url :status :res[content-length] - :response-time ms - :postData');

const cors = require('cors')
app.use(cors())

app.use(express.json())

app.use(requestLogger)

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.get('/', (request, response) => {
    console.log('index.js -> GET /')
    response.send('<h1>Hello World!</h1>')
})

app.get('/api/info', (request, response) => {
    console.log('index.js -> GET /api/info')
    const info = `Phonebook has info for ${phonebooks.length} people <br/> ${new Date()}`
    response.send(info)
})

app.get('/api/persons', (request, response) => {
  console.log('index.js -> GET /api/persons')
  Phonebook.find({}).then(phonebooks => {
    response.json(phonebooks)
  })
})

app.get('/api/persons/:id', (request, response) => {
  console.log('index.js -> GET /api/persons/:id')
  console.log('request.params.id', request.params.id)
    const id = Number(request.params.id)
    const phonebook = phonebooks.find(p => p.id === id)
    if (phonebook) {
      response.json(phonebooks)
    } else {
      console.log('x')
      response.status(404).end()
    }
  })

app.delete('/api/persons/:id', (request, response) => {
    console.log('index.js -> DELETE /api/persons/:id')
    console.log('request.params.id', request.params.id)
    const id = Number(request.params.id)
    persons = persons.filter(p => p.id !== id)
  
    response.status(204).end()
})

// const generateId = () => {
//     console.log('generateId')
//     const maxId = phonebooks.length > 0
//       ? Math.max(...phonebooks.map(p => p.id))
//       : 0
//     return maxId + 1
//   }
  
  app.post('/api/persons', (request, response) => {
    console.log('index.js -> POST /api/persons')
    //  console.log('request', request)
    //  console.log('request.body', request.body)
    const body = request.body
    //console.log('body', body)

    console.log('body.name', body.name)
    console.log('body.phone', body.phone)
    if (!body.name || !body.phone) {
      return response.status(400).json({ 
        error: 'name or number missing' 
      })
    }

    // const exists = phonebooks.find(p => p.name === body.name)  
    // console.log('exists', exists) 
    // if (exists) {
    //   return response.status(400).json({
    //     error: 'name must be unique. details: name already exists in the phonebook' 
    //   })
    // }

    const phonebook = new Phonebook({
      name: body.name,
      number: body.phone,
      //id: generateId(),
    })
  
    phonebook.save().then(savedPhonebook => {
      console.log('savedPhonebook', savedPhonebook)
      response.json(savedPhonebook)
    })
  })

app.use(unknownEndpoint)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})