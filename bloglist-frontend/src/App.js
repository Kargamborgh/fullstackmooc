import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = React.createRef()
  const blogRef = React.createRef()

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
    <Togglable buttonLabel='login'>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
    )

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      await blogService.create(blogObject)

      setBlogs(blogs.concat(blogObject))

      setErrorMessage(`new blog ${blogObject.title} added successfully`)
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)

     } catch(exception) {
       setErrorMessage('blog add failed')
       setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
     }
  }

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const toggleViewOf = id => {
    blogRef.current.toggleView()
  }

  const addLike = async id => {
    const blog = blogs.find(b => b.id === id)
    const likedBlog = { ...blog, likes : blog.likes + 1, user: user.id}

    const updatedBlog = await blogService.update(id, likedBlog)
    console.log(updatedBlog)
    setBlogs(blogs.map(b => b.id !== id ? b : updatedBlog))
  }


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
        {blogs.map((blog, i) =>
          <Blog key={i}
          blog={blog} 
          toggleView={() => toggleViewOf(blog.id)}
          addLike={() => addLike(blog.id)} 
          ref={blogRef}/>
        )}
      </div>
        }
      </div>
  )
}

export default App