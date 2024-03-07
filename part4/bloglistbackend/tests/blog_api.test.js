const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const helper = require('./test_helper')

const User = require('../models/user')
const Blog = require('../models/blog')

describe('when there is initially some blogs saved', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('blog posts have id property instead of _id', async () => {
    const response = await api.get('/api/blogs')

    assert.strictEqual(response.body.length, helper.initialBlogs.length)

    response.body.forEach((blog) => {
      assert.notStrictEqual(blog.id, undefined)
      assert.strictEqual(blog._id, undefined)
    })
  })

  describe('addition of a new blog', () => {
    test.only('a valid blog can be added with a valid token', async () => {
      const newBlog = {
        title: 'title5',
        author: 'author5',
        url: 'url5',
        likes: 5
      }

      const user = await User.findOne({}) // Assuming there's at least one user in the database
      console.log('user', user)
      const token = jwt.sign({ id: user._id }, process.env.SECRET)
      console.log('token', token)

      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const response = await api.get('/api/blogs')
      const titles = response.body.map(blog => blog.title)
      console.log('titles', titles)

      assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)
      console.log('response.body', response.body)
      console.log('response.body.length', response.body.length)
      console.log('helper.initialBlogs.length', helper.initialBlogs.length)

      assert(titles.includes('title5'))
    })

    test('adding a blog fails with status code 401 if token is not provided', async () => {
      const newBlog = {
        title: 'Test Blog',
        author: 'Test Author',
        url: 'http://test.com',
        likes: 10,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)
    })

    test('if the likes property is missing from the request, it will default to the value 0.', async () => {
      const newBlog = {
        title: 'title33',
        author: 'author33',
        url: 'url33',
      }

      const postBlog = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      console.log('postBlog.body', postBlog.body)
      assert.strictEqual(postBlog.body.likes, 0)

      const resultBlog = await api
        .get(`/api/blogs/${postBlog.body.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      console.log('resultBlog.body', resultBlog.body)
      assert.strictEqual(resultBlog.body.likes, 0)
    })

    test('blog without title is not added', async () => {
      const newBlog = {
        author: 'author6',
        url: 'url6',
        likes: 6
      }

      const postResult = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)
      console.log('postResult.body', postResult.body)

      const response = await api.get('/api/blogs')
      console.log('response.body', response.body)

      console.log('response.body.length', response.body.length)
      console.log('helper.initialBlogs.length', helper.initialBlogs.length)

      assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('blog without url is not added', async () => {
      const newBlog = {
        title: 'title7',
        author: 'author7',
        likes: 7
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const response = await api.get('/api/blogs')

      assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })
  })

  describe('updating of a blog', () => {
    test('succeeds with changed likes if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      let blogToUpdate = blogsAtStart[0]
      const initialLikes = blogToUpdate.likes
      blogToUpdate.likes = blogToUpdate.likes + 1

      // Send a PUT request to update the blog
      const updatedBlogResponse = await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(blogToUpdate)

      // Assert that the response status code is 200
      assert.strictEqual(updatedBlogResponse.status, 200)

      // Get the updated blog from the database
      const updatedBlogRequest = await api
        .get(`/api/blogs/${blogToUpdate.id}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      // Extract the body from the response
      const updatedBlog = updatedBlogRequest.body

      // Assert that the updated blog's likes property is incremented by 1
      assert.strictEqual(updatedBlog.likes, initialLikes + 1)

      // Assert that the updated blog's likes property matches the updated value
      assert.strictEqual(updatedBlog.likes, blogToUpdate.likes)
    })
  })

  describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

      const titles = blogsAtEnd.map(r => r.title)
      assert(!titles.includes(blogToDelete.title))
    })
  })


  describe('when there is initially one user at db', () => {
    beforeEach(async () => {
      await User.deleteMany({})

      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })

      await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

      const usernames = usersAtEnd.map(u => u.username)
      assert(usernames.includes(newUser.username))
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
      const usersAtStart = await helper.usersInDb()

      const newUser = {
        username: 'root',
        name: 'Superuser',
        password: 'salainen',
      }

      const result = await api
        .post('/api/users')
        .send(newUser)
        .expect(400)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()

      assert(result.body.error.includes('expected `username` to be unique'))

      assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
  })

})

after(async () => {
  await mongoose.connection.close()
})