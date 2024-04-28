import { useState } from 'react'

const Blog = ({ blog, user, handleLike, handleDelete }) => {
  // console.log('blog:blog', blog)
  // console.log('blog:user', user)

  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle}>
      <h3>{blog.title}</h3>
      <p> Author : {blog.author}</p>
      <button onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'hide' : 'view'}
      </button>
      {showDetails && (
        <div>
          <p> URL : {blog.url}</p>
          <p>
            Likes : {blog.likes} <button onClick={handleLike}>like</button>
          </p>
          <p>{blog.user && blog.user.name}</p>
          <p>
            {blog.user && blog.user.name === user.name && (
              <button
                onClick={() => {
                  if (
                    window.confirm('Are you sure you want to remove this blog?')
                  ) {
                    handleDelete()
                  }
                }}
                style={{ backgroundColor: 'blue' }}
              >
                remove
              </button>
            )}
          </p>
        </div>
      )}
    </div>
  )
}

export default Blog
