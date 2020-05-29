import React, { useState, useImperativeHandle } from 'react'
import blogService from '../services/blogs'

const Blog = React.forwardRef(({ blog, addLike, deleteBlog }, ref) => {

  const [view, setView] = useState(false)
  const viewLabel = view ? 'view less' : 'view more'

  const toggleView = () => {
    setView(!view)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleView
    }
  })

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  
  if (view) {
  return (
  <div style={blogStyle}>
     title: {blog.title}
    <button onClick={toggleView}>{viewLabel}</button>
    <div>
      url: {blog.url} 
    </div>
    <div>
    likes: {blog.likes}
    <button onClick={addLike}>like</button>
    </div>
    <div>
      author: {blog.author} 
    </div>
    <div>
      <button onClick={deleteBlog}>remove</button>
    </div>
  </div>
  )
  } else {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={toggleView}>{viewLabel}</button>
      </div>
    )
  }
})

export default Blog
