import React, { useState, useImperativeHandle } from 'react'
import blogService from '../services/blogs'

const Blog = React.forwardRef(({ blog }, ref) => {

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

  const addLike = async () => {
    const likedBlog = {...blog, likes: blog.likes+1}

    const updatedBlog = await blogService.update(blog.id, likedBlog)
    console.log(updatedBlog)
  }

  //<button onClick={() => console.log(blog.id)}>like</button>

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
