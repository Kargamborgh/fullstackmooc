/* eslint-disable linebreak-style */
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'Blogi 1',
    author: 'Hessu Hopo',
    url: 'hessunkotisivut.com',
    likes: 100
  },
  {
    title: 'Blogi 2',
    author: 'Roope Ankka',
    url: 'roopenkotisivut.com',
    likes: 420
  }
]

const nonExistingId = async () => {
  const blog = new Blog({
    title: 'Blog soon to be removed',
    author: 'Heluna Lehmä',
    url: 'heluna.com',
    likes: 666 })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb, usersInDb
}