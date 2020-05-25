/* eslint-disable linebreak-style */
const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  if (blogs.length > 0) {
    const likesArray = blogs.map(blogs => blogs.likes)
    const reducer = (sum, current) => sum + current
    return (likesArray.reduce(reducer))
  } else {
    return 0
  }
}

const favoriteBlog = (blogs) => {
  const likesArray = blogs.map(blogs => blogs.likes)
  const indexOfMostLikes =
    likesArray
      .reduce((bestSoFar, currentV, currentI, arr) => currentV > arr[bestSoFar] ? currentI : bestSoFar, 0)

  return (
    {
      'title': blogs[indexOfMostLikes].title,
      'author': blogs[indexOfMostLikes].author,
      'likes': blogs[indexOfMostLikes].likes
    }
  )
}

const mostBlogs = (blogs) => {
  // map to format of author:blogs

  const blogsPerAuthor =
  blogs
    .reduce((acc, obj) => (acc[obj.author] = (acc[obj.author] || 0)+1, acc), {})

  // return author with most blogs

  const maxBlogsAuthor = _.maxBy(_.keys(blogsPerAuthor), function(o) {
    return blogsPerAuthor[o]
  })

  return (
    {
      author: maxBlogsAuthor,
      blogs: blogsPerAuthor[`${maxBlogsAuthor}`]
    }
  )
}

const mostLikes = (blogs) => {

  const likesPerAuthor =
  blogs.
    reduce((acc, obj) => (acc[obj.author] = (acc[obj.author] || 0)+obj.likes, acc), {})

  const maxLikesAuthor = _.maxBy(_.keys(likesPerAuthor), function(o) {
    return likesPerAuthor[o]
  })

  return (
    {
      author: maxLikesAuthor,
      likes: likesPerAuthor[`${maxLikesAuthor}`]
    }
  )

}
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}