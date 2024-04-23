import { useState, useEffect } from "react";

import Blog from "./components/Blog";
import BlogForm from "./components/BlogForm";
import Footer from './components/Footer'
import Notification from "./components/Notification";

import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  console.log("App");

  const [blogs, setBlogs] = useState([]);

  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [notification, setNotification] = useState({ message: "", type: "" });

  useEffect(() => {
    console.log("useEffect1 running");
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    console.log("useEffect2 running");
    if(user) {
      blogService.getAll().then((blogs) => {
        setBlogs(blogs);
      });
    }
  }, [user]);

  const handleTitleChange = (event) => {
    console.log(event.target.value);
    setNewTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    console.log(event.target.value);
    setNewAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    console.log(event.target.value);
    setNewUrl(event.target.value);
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      console.log("user", user);

      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      showNotification("wrong username or password", "error");
    }
  };

  const addBlog = (event) => {
    event.preventDefault();

    console.log("addBlog button clicked", event.target);

    const existingBlogTitle = blogs.some((blog) => blog.title === newTitle);
    console.log("existingBlogTitle", existingBlogTitle);
    if (existingBlogTitle) {
      showNotification(
        `${newTitle} title is already added to blog list`,
        "error"
      );
      return;
    }

    const existingBlogUrl = blogs.some((blog) => blog.url === newUrl);
    console.log("existingBlogUrl", existingBlogUrl);
    if (existingBlogUrl) {
      showNotification(`${newUrl} URL is already added to blog list`, "error");
      return;
    }

    console.log(`Adding ${newTitle} since it doesn't exist in the blog list.`);
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
      id: (blogs.length + 1).toString(),
    };
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
        setNewTitle("");
        setNewAuthor("");
        setNewUrl("");
        showNotification(
          `${newUrl} URL is successfullt added to blog list`,
          "success"
        );
      })
      .catch((error) => {
        console.error("Error adding blog:", error);
        showNotification(
          `Error adding ${newTitle} blog. Details:${error.response.data.error}`,
          "error"
        );
      });
  };

  const showNotification = (notificationMessage, notificationType) => {
    console.log("showNotification", notificationMessage, notificationType);
    setNotification({ message: notificationMessage, type: notificationType });
    setTimeout(() => {
      setNotification({ message: "", type: "" });
    }, 3000);
  };

  function handleLogout() {
    setUser(null);
    window.localStorage.removeItem("loggedNoteappUser");
  }

  const loginForm = () => (
    <div>
      <h2>Log in to application</h2>
      <Notification message={notification.message} type={notification.type} />
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
      <Footer />
    </div>
  );

  if (user === null) {
    return <div>{loginForm()}</div>;
  }

  return (
    <div>
      <Notification message={notification.message} type={notification.type} />
      <div>
        <h2>blogs</h2>
        <div>
          {user.name} logged in <button onClick={handleLogout}>logout</button>
        </div>
        <BlogForm
          addBlog={addBlog}
          newTitle={newTitle}
          handleTitleChange={handleTitleChange}
          newAuthor={newAuthor}
          handleAuthorChange={handleAuthorChange}
          newUrl={newUrl}
          handleUrlChange={handleUrlChange}
        />

        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default App;
