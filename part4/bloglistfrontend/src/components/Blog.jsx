const Blog = ({ blog }) => {
    
    return (
      <li className='blog'>
        {blog.title} {blog.author} {blog.url} {blog.likes}
      </li>
    )
  }
  
  export default Blog