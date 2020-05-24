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

module.exports = {
  dummy,
  totalLikes
}