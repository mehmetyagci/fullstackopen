const { test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')

const Blog = require('../models/blog')

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

test('there are six blogs', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, 6)
})

test('blog posts have id property instead of _id', async () => {
  const response = await api.get('/api/blogs')

  assert.strictEqual(response.body.length, helper.initialBlogs.length)

  response.body.forEach((blog) => {
    assert.notStrictEqual(blog.id, undefined)
    assert.strictEqual(blog._id, undefined)
  })
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: 'title1',
    author: 'author1',
    url: 'url1',
    likes: 1
  }

  await api
    .post('/api/blogs')
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

  assert(titles.includes('title1'))
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

after(async () => {
  await mongoose.connection.close()
})