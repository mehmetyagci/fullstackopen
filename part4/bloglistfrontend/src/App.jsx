import { useState, useEffect } from 'react'

import blogService from './services/blogs'

import BlogForm from './components/BlogForm';
import Blog from './components/Blog'

import Filter from './components/Filter'
import Footer from './components/Footer'

import Notification from './components/Notification'

const App = () => {
  console.log('App');
  const [blogs, setBlogs] = useState([])

  const [filter, setFilter] = useState('')

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [newLikes, setNewLikes] = useState(0)
  
  const [notification, setNotification] = useState({ message: '', type: '' })

  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  const handleTitleChange = (event) => {
    console.log(event.target.value)
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    console.log(event.target.value)
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    console.log(event.target.value)
    setNewUrl(event.target.value)
  }

  const handleLikesChange = (event) => {
    console.log(event.target.value)
    const likes = parseInt(event.target.value, 10); 
    setNewLikes(likes)
  }

  const addBlog = (event) => {
    event.preventDefault()

    console.log('addBlog button clicked', event.target)

    const existingBlogTitle = blogs.some(blog => blog.title === newTitle);
    console.log('existingBlogTitle', existingBlogTitle)
    if (existingBlogTitle) {
      showNotification(`${newTitle} title is already added to blog list`, 'error');
      return;
    }

    const existingBlogUrl = blogs.some(blog => blog.url === newUrl);
    console.log('existingBlogUrl', existingBlogUrl)
    if (existingBlogUrl) {
      showNotification(`${newUrl} URL is already added to blog list`, 'error');
      return;
    }

    console.log(`Adding ${newTitle} since it doesn't exist in the blog list.`);
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      likes: newLikes,
      id: (blogs.length + 1).toString(),
    }
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
        setNewLikes(0)
        showNotification(`${newUrl} URL is successfullt added to blog list`, 'success');
      }).catch(error => {
        console.error('Error adding blog:', error);
        showNotification(`Error adding ${newTitle} blog. Details:${error.response.data.error}`, 'error');
      });
  }

  const deleteBlog = id => {
    console.log('deleteBlog', id)

    // Find the blog by id
    const blogIndex = blogs.findIndex(blog => blog.id === id);

    // If the blog doesn't exist, exit the function
    if (blogIndex === -1) {
      console.log(`Blog with ID ${id} not found in the list`);
      showNotification(`Blog with ID ${id} not found in the list`, 'error');
      return;
    }
  
    const blogToDelete = blogs[blogIndex];
    // Delete the blog from the server
    blogService
        .deleteBlog(id)
        .then(() => {
          console.log(`Successfully deleted blog with ID ${id} from the server`);
          showNotification(`Successfully deleted blog with ID ${id} from the server`, 'success');
          // Update the state to remove the deleted blog
          setBlogs(prevBlogs => {
            const updatedBlogs = [...prevBlogs];
            updatedBlogs.splice(blogIndex, 1);
            return updatedBlogs;
          });
      })
      .catch(error => {
        console.error('Error deleting blog:', error);
        showNotification(`Information of ${blogToDelete.name} has already been removed from server`, 'error');
        setBlogs(blogs.filter(p => p.id !== id))
      });
  }

  const getBlog = id => {
    console.log('getBlog', id)
    const blog = blogs.find(n => n.id === id)
    console.log('blog', blog)
  
    blogService
        .get(id)
        .then(returnedBlog => {
          console.log('returnedBlog', returnedBlog)
      })
      .catch(error => {
        showNotification(`the blog '${blog.title}' was not exist in server. error details: ${error}`, 'error');
      })
  }

  const showNotification = (notificationMessage, notificationType) => {
    console.log('showNotification', notificationMessage, notificationType)
    setNotification({ message: notificationMessage, type: notificationType });
    setTimeout(() => {
      setNotification({ message: '', type: '' });
    }, 3000);
  };

  const blogsFiltered = filter === ''
  ? blogs
  : blogs.filter(blog => blog.title.toLowerCase().includes(filter.toLowerCase()))

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={notification.message} type={notification.type} />
      <Filter filter={filter} setFilter={setFilter} />
      <h3>add a new</h3>
      <BlogForm 
      addBlog={addBlog} 

      newTitle={newTitle} 
      handleTitleChange={handleTitleChange} 

      newAuthor={newAuthor} 
      handleAuthorChange={handleAuthorChange} 

      newUrl={newUrl} 
      handleUrlChange={handleUrlChange} 

      newLikes = {newLikes} 
      handleLikesChange={handleLikesChange} />

      <h3>Blog List</h3>
      <ul>
        {blogsFiltered.map(blog => 
          <Blog
            key={blog.id}
            blog={blog}
            deleteBlog = {() => deleteBlog(blog.id)}
            getBlog = {() => getBlog(blog.id)}
          />
        )}
      </ul>
      <Footer />
    </div>
  )
}

export default App