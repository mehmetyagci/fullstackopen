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

const mostBlogs = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return null
  }
  const blogCounts = {}
  blogs.forEach((blog) => {
    blogCounts[blog.author] = (blogCounts[blog.author] || 0) + 1
  })
  let maxBlogs = 0
  let topAuthor = ''
  for (const author in blogCounts) {
    if (blogCounts[author] > maxBlogs) {
      maxBlogs = blogCounts[author]
      topAuthor = author
    }
  }
  return {
    author: topAuthor,
    blogs: maxBlogs,
  }
}

const mostLikes = (blogs) => {
  if (!blogs || blogs.length === 0) {
    return null
  }
  const likesCount = {}
  blogs.forEach((blog) => {
    likesCount[blog.author] = (likesCount[blog.author] || 0) + blog.likes
  })
  let maxLikes = 0
  let topAuthor = ''
  for (const author in likesCount) {
    if (likesCount[author] > maxLikes) {
      maxLikes = likesCount[author]
      topAuthor = author
    }
  }
  return {
    author: topAuthor,
    likes: maxLikes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}