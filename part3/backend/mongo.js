const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
console.log('password', password)
const name = process.argv[3]
console.log('name', name)
const number = process.argv[4]
console.log('number', number)

const url =
  `mongodb+srv://mehmetyagci53:${password}@mycluster.nqz1ts5.mongodb.net/phonebookApp?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)

mongoose.connect(url)

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Phonebook = mongoose.model('Phonebook', phonebookSchema)

// const phonebook = new Phonebook({
//   name: 'Arto Hellas',
//   number: '040-123456'
// })

// phonebook.save().then(result => {
//   console.log('phonebook saved!')
//   mongoose.connection.close()
// })

if(name && number) {
    console.log('save phonebook entry')
//   phonebook.save().then(result => {
//     console.log(`added ${name} number ${number} to phonebook`)
//     mongoose.connection.close()
//   })

  Phonebook.create({
  name: name,
  number: number
}).then(result => {
  console.log(`added ${result.name} number ${result.number} to phonebook`)
  mongoose.connection.close()
})

} else {
    console.log('return phonebook list')
    
    Phonebook.find({}).then(result => {
    result.forEach(phone => {
      console.log(phone)
    })
    mongoose.connection.close()
  })
}

// Phonebook.create({
//   id: 2,
//   name: 'Ada Lovelace',
//   number: '39-44-5323523'
// }).then(result => {
//   console.log(`added ${result.name} number ${result.number} to phonebook`)
//   mongoose.connection.close()
// })