/* eslint-disable linebreak-style */
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')

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

  describe('updating a blog', () => {

    test('succeeds with 204 if id is valid', async () => {

      const newBlog = {
        title: 'Hannun Testiblogi',
        author: 'Hannu Hanhi',
        url: 'hannulandia.com',
        likes: 666
      }

      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(newBlog)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()

      const titles = blogsAtEnd.map(b => b.title)

      expect(titles).toContain(newBlog.title)
    })
  })
})

describe('one initial user in database', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 9)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('user creation successful with new unique username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'aankka',
      name: 'Aku Ankka',
      password: 'salapassu',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('user creation fails w/ 400 & message if username already taken ', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salapassu',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('user creation fails w/ 400 & message if username too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'ab',
      name: 'Albert Bergman',
      password: 'salapassu',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('minimum allowed length (3)')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })

  test('user creation fails w/ 400 & message if password too short or empty', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'abergman',
      name: 'Albert Bergman',
      password: 'sa',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('password too short or undefined')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})