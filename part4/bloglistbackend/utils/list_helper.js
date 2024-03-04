const dummy = (blogs) => {
  console.log('dummy', blogs)
  return 1
}

const totalLikes = (blogs) => {
  if(blogs.length === 0 || !blogs) {
    console.log('no blogs')
    return 0
  }
  const total = blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
  return total
}

const favoriteBlog = (blogs) => {
  const maxLikes = Math.max(...blogs.map(blog => blog.likes))
  const favoriteBlogs = blogs.filter(blog => blog.likes === maxLikes)

  if (favoriteBlogs.length === 0) {
    return null
  } else {
    const favoriteBlog = favoriteBlogs[0]
    return {
      title: favoriteBlog.title,
      author: favoriteBlog.author,
      likes: favoriteBlog.likes
    }
  }
}

module.exports = {
  dummy, totalLikes, favoriteBlog
}