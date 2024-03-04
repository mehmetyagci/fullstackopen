import PropTypes from 'prop-types';

const BlogForm = ({
    addBlog , 
    newTitle , handleTitleChange , 
    newAuthor , handleAuthorChange , 
    newUrl , handleUrlChange ,
    newLikes , handleLikesChange}) => {
    console.log('BlogForm');

return (
    <form onSubmit={addBlog}>
        <div>
            title: <input value={newTitle} onChange={handleTitleChange} />
        </div> 
        <div>
            author: <input value={newAuthor} onChange={handleAuthorChange} />
        </div> 
        <div>
            URL: <input value={newUrl} onChange={handleUrlChange} />
        </div> 
        <div>
            likes: <input value={newLikes} onChange={handleLikesChange} />
        </div> 
        <div>
            <button type="submit">add</button>
        </div>
      </form> 
      )
}

BlogForm.propTypes = {
    addBlog: PropTypes.func.isRequired,
    newTitle: PropTypes.string.isRequired,
    handleTitleChange: PropTypes.func.isRequired,
    newAuthor: PropTypes.string,
    handleAuthorChange: PropTypes.func.isRequired,
    newUrl: PropTypes.string.isRequired,
    handleUrlChange: PropTypes.func.isRequired,
    newLikes: PropTypes.number,
    handleLikesChange: PropTypes.func.isRequired
};

export default BlogForm;