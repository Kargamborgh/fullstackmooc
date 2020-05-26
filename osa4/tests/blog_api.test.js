/* eslint-disable linebreak-style */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

describe('when initial blogs are saved', () => {
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

  test('there are two blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(2)
  })

  test('blogs must have field id, not _id', async () => {
    const response = await api.get('/api/blogs')

    const ids = response.body.map(r => r.id)

    expect(ids).toBeDefined()
  })

  describe('test adding of blogs', () => {
    test('a valid blog can be added ', async () => {
      const newBlog = {
        title: 'Mikin Testiblogi',
        author: 'Mikki Hiiri',
        url: 'someUrl.com',
        likes: 222
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

      const contents = blogsAtEnd.map(b => b.title)
      expect(contents).toContain(
        'Mikin Testiblogi'
      )
    })

    test('if blog is created without likes, set likes to zero', async () => {
      const newBlog = {
        title: 'Milla Magian Testiblogi',
        author: 'Milla Magia',
        url: 'millantaikakauppa.com'
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd[blogsAtEnd.length-1].likes).toEqual(0)
    })

    test('a blog without title is not added', async () => {
      const newBlog = {
        author: 'Milla Magia',
        url: 'millantaikakauppa.com',
        likes: 666
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()

      expect (blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })

    test('a blog without url is not added', async () => {
      const newBlog = {
        title: 'Millan Testiblogi',
        author: 'Milla Magia',
        likes: 666
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()

      expect (blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
  })

  describe('deletion of a blog', () => {

    test('succeeds with 200 if id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      expect(blogsAtEnd).toHaveLength(
        helper.initialBlogs.length - 1
      )

      const titles = blogsAtEnd.map(b => b.title)

      expect(titles).not.toContain(blogToDelete.title)
    })
  })
})

afterAll(() => {
  mongoose.connection.close()
})