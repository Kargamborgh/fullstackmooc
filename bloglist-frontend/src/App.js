import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogAppUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      console.log(user.token)
      
      setUser(user)
      setUsername('')
      setPassword('')

      setErrorMessage(`${user.username} logged in`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <div>
      Log in
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
    </div>      
  )

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const blogObject = await blogService.create({
        title: newTitle,
        author: newAuthor,
        url: newUrl
      })
      console.log(blogObject)

      setBlogs(blogs.concat(blogObject))

      setErrorMessage(`new blog ${blogObject.title} added successfully`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')

     } catch(exception) {
       setErrorMessage('blog add failed')
       setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
     }
  }

  const blogForm = () => (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
          type='text'
          value={newTitle}
          name='Title'
          onChange={({ target }) => setNewTitle(target.value)}
          />
        </div><div>
          author:
          <input
          type='text'
          value={newAuthor}
          name='Author'
          onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
          type='text'
          value={newUrl}
          name='Url'
          onChange={({ target }) => setNewUrl(target.value)}
          />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )


  return (
      <div>
        <h1>Blog App</h1>
        <Notification message={errorMessage} />
        {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in</p>
          <button onClick={() => window.localStorage.clear()}>logout</button>
          {blogForm()}
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
        }
      </div>
  )
}

export default App