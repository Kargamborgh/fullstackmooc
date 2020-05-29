import React, { useState, useImperativeHandle } from 'react'

const Blog = React.forwardRef(({ blog, addLike, deleteBlog, user }, ref) => {

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

  return (
    <>
      {!view &&
      <div style={blogStyle} className='defaultBlogView'>
        {blog.title} {blog.author}
        <button onClick={toggleView} className='viewMore'>{viewLabel}</button>
      </div>
      }
      {view &&
      <div style={blogStyle} className='expandedBlogView'>
     title: {blog.title}
        <button onClick={toggleView} className='viewLess'>{viewLabel}</button>
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
          <button onClick={() => console.log(user.username)}>show user id</button>
          <button onClick={() => console.log(blog.user.username)}>show blog</button>
          {blog.user.username === user.username &&
      <button onClick={deleteBlog}>remove</button>
          }
        </div>
      </div>
      }
    </>
  )

})

Blog.displayName = 'Blog'

export default Blog
