import PropTypes from 'prop-types';

const Blog = ({ blog, deleteBlog, getBlog }) => {
  return (
    <li className='blog'>
      <h3>{blog.title}</h3>
      <p>Author: {blog.author}</p>
      <p>URL: {blog.url}</p>
      <p>Likes: {blog.likes}</p>
      <button onClick={deleteBlog}>delete</button>
      <button onClick={getBlog}>get</button>
    </li>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    likes: PropTypes.number,
  }).isRequired,
  deleteBlog: PropTypes.func.isRequired, 
  getBlog: PropTypes.func.isRequired,
};

export default Blog