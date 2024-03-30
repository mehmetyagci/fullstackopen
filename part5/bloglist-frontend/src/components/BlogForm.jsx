import PropTypes from "prop-types";

const BlogForm = ({
  addBlog,
  newTitle,
  handleTitleChange,
  newAuthor,
  handleAuthorChange,
  newUrl,
  handleUrlChange,
}) => {
  console.log("BlogForm");

  return (
    <div>
      <h2>create new</h2>
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
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  );
};

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired,
  newTitle: PropTypes.string.isRequired,
  handleTitleChange: PropTypes.func.isRequired,
  newAuthor: PropTypes.string,
  handleAuthorChange: PropTypes.func.isRequired,
  newUrl: PropTypes.string.isRequired,
  handleUrlChange: PropTypes.func.isRequired,
};

export default BlogForm;
