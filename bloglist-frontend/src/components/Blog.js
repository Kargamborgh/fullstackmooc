import React, { useState, useImperativeHandle } from 'react'

const Blog = React.forwardRef(({ blog, addLike, deleteBlog, user }, ref) => {

  const [view, setView] = useState(false)
  // const viewLabel = view ? 'view less' : 'view more'

  const toggleView = () => {
    setView(!view)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleView
    }
  })

  return (
    <>
      <h2>{blog.title} {blog.author}</h2>
      <div>
      url: {blog.url}
      </div>
      <div data-testid='likes'>
    likes: {blog.likes}
        <button onClick={addLike} className='likeButton'>like</button>
      </div>
      <div>
      added by: {blog.user.name}
      </div>
      <div>
        comments:
        <ul>
          {blog.comments.map((comment, i) =>
            <li key={i}>
              {comment}
            </li>
          )}
        </ul>
      </div>
    </>
  )

})

Blog.displayName = 'Blog'

export default Blog
