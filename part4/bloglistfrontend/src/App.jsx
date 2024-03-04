import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Footer from './components/Footer'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  return (
    <div>
      <h1>Blogs</h1>
      <ul>
        {blogs.map(blog => 
          <Blog
            key={blog.id}
            blog={blog}
          />
        )}
      </ul>
      <Footer />
    </div>
  )
}

export default App