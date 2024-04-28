import { useState } from "react";

const BlogForm = ({ createBlog, blogs }) => {
  console.log("BlogForm");

  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();

    console.log("addBlog button clicked", event.target);

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      id: (blogs.length + 1).toString(),
    };

    createBlog(blogObject);

    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
  };

  return (
    <div>
      <h2>create a new blog</h2>

      <form onSubmit={addBlog}>
        <div>
          title:{" "}
          <input
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
          />
        </div>
        <div>
          author:{" "}
          <input
            value={newAuthor}
            onChange={(event) => setNewAuthor(event.target.value)}
          />
        </div>
        <div>
          URL:{" "}
          <input
            value={newUrl}
            onChange={(event) => setNewUrl(event.target.value)}
          />
        </div>
        <div>
          <button type="submit">create</button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
