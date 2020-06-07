import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import Blog from './components/Blog'
import blogService from './services/blogs'
import userService from './services/users'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import { renderNotification, hideNotification } from './reducers/notificationReducer'
import {
  Switch, Route, Link, useRouteMatch, useHistory
} from 'react-router-dom'
import { Table } from 'react-bootstrap'

const App = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState(null)
  const blogFormRef = React.createRef()

  const padding = {
    padding : 5
  }


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

  useEffect (() => {
    userService.getAll().then(users =>
      setUsers( users ))
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

      dispatch(renderNotification(`${user.username} logged in`))
      setTimeout(() => {
        dispatch(hideNotification(''))
      }, 5000)

    } catch (exception) {
      dispatch(renderNotification('wrong credentials'))
      setTimeout(() => {
        dispatch(hideNotification(''))
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
      const addedBlog = await blogService.create(blogObject)

      setBlogs(blogs.concat(addedBlog))

    } catch(exception) {
      dispatch(renderNotification('blog add failed'))
      setTimeout(() => {
        dispatch(hideNotification(''))
      }, 5000)
    }
  }

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  const addLike = async id => {
    const blog = blogs.find(b => b.id === id)
    const likedBlog = { ...blog, likes : blog.likes + 1, user: user.id }

    const updatedBlog = await blogService.update(id, likedBlog)
    console.log(updatedBlog)
    setBlogs(blogs.map(b => b.id !== id ? b : updatedBlog))

    dispatch(renderNotification(`liked ${updatedBlog.title}`))
    setTimeout(() => {
      dispatch(hideNotification(''))
    }, 5000)
  }

  const blogsSortedByLikes =
    blogs.sort((a, b) => (a.likes < b.likes) ? 1 : ((b.likes < a.likes) ? -1 : 0))

  const deleteBlog = async id => {
    const blogToDelete = blogs.find(b => b.id === id)

    if (window.confirm(`Remove blog ${blogToDelete.title}?`)) {

      try {
        blogFormRef.current.toggleVisibility()
        await blogService.remove(blogToDelete.id)

        history.push('/')

        setBlogs(blogs.filter(blog => blog.id !== blogToDelete.id))

        dispatch(renderNotification(`${blogToDelete.title} removed successfully`))
        setTimeout(() => {
          dispatch(hideNotification(''))
        }, 5000)

      } catch(exception) {

        dispatch(renderNotification('blog remove failed'))
        setTimeout(() => {
          dispatch(hideNotification(''))
        }, 5000)

      }
    }
  }

  const Users = ({ users }) => {
    if (!users) {
      return null
    }
    return (
      <div>
        <h3>Users</h3>
        <Table striped>
          <tbody>
            {users.map(user =>
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name} </Link>
                </td>
                <td>
                  {user.blogs.length} blogs created
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    )
  }

  const matchUser = useRouteMatch('/users/:id')
  const userToShow = matchUser
    ? users.find(user => user.id === matchUser.params.id)
    : null

  const matchBlog = useRouteMatch('/blogs/:id')
  const blogToShow = matchBlog
    ? blogs.find(blog => blog.id === matchBlog.params.id)
    : null

  const User = ({ user }) => {
    if (!user) {
      return null
    }

    return (
      <div>
        <h2>{user.name}</h2>
        <h3>added blogs:</h3>
        <ul>
          {user.blogs.map(blog =>
            <li key={blog.id}>
              {blog.title}
            </li>
          )}
        </ul>
      </div>
    )
  }

  const Blogs = ({ blogs }) => {
    if (!blogs) {
      return null
    }
    return (
      <div>
        <h2>blogs</h2>
        <Table striped>
          <tbody>
            {blogs.map((blog, i) =>
              <tr key={blog.id}>
                <td>
                  <Link key={blog.id} to={`/blogs/${blog.id}`}>
                    {blog.title}
                  </Link>
                </td>
                <td>
                  {blog.author}
                </td>
              </tr>
              /*<Blog key={i}
              blog={blog}
              toggleView={() => toggleViewOf(blog.id)}
              addLike={() => addLike(blog.id)}
              user={user}
              deleteBlog={() => deleteBlog(blog.id)}
              ref={blogRef}/>*/
            )}
          </tbody>
        </Table>
      </div>
    )
  }

  return (
    <div className="container">
      <h1>Blog App</h1>
      <Notification />
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in</p>
          <button onClick={() => window.localStorage.clear()}>logout</button>
          {blogForm()}
        </div>
      }
      <div>
        <Link style={padding} to='/users'>users</Link>
        <Link style={padding} to='/blogs'>blogs</Link>
        <Link style={padding} to='/'>home</Link>
      </div>

      <Switch>
        <Route path='/users/:id'>
          <User user={userToShow}/>
        </Route>
        <Route path='/users'>
          <Users users={users} />
        </Route>
        <Route path='/blogs/:id'>
          <Blog
            blog={blogToShow}
            addLike={() => addLike(blogToShow.id)}
            deleteBlog={() => deleteBlog(blogToShow.id)}/>
        </Route>
        <Route path='/blogs'>
          <Blogs blogs={blogsSortedByLikes}/>
        </Route>
        <Route path='/'>
        </Route>
      </Switch>
    </div>
  )
}

export default App