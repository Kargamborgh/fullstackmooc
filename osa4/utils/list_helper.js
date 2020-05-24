/* eslint-disable linebreak-style */
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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}