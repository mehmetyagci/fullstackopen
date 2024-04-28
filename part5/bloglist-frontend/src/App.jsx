import { useState, useEffect, useRef } from "react";

import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Footer from "./components/Footer";

import blogService from "./services/blogs";
import loginService from "./services/login";

import LoginForm from "./components/LoginForm";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";

const App = () => {
  console.log("App");

  const [blogs, setBlogs] = useState([]);

  const [notification, setNotification] = useState({ message: "", type: "" });

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [user, setUser] = useState(null);

  const [loginVisible, setLoginVisible] = useState(false);

  const blogFormRef = useRef();

  useEffect(() => {
    console.log("useEffect1 running");
    const loggedUserJSON = window.localStorage.getItem("loggedBlogAppUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    console.log("useEffect2 running");
    if (user) {
      blogService.getAll().then((blogs) => {
        blogs.sort((a, b) => b.likes - a.likes);
        setBlogs(blogs);
      });
    }
  }, [user]);

  const handleLikeOf = (id) => {
    console.log("handleLikeOf", id);
    const blog = blogs.find((b) => b.id === id);
    //console.log("blog", blog);
    const changedBlog = {
      ...blog,
      likes: blog.likes + 1,
      //user: { ...blog.user },
    };
    console.log("handleLikeOf->changedBlog", changedBlog);

    blogService
      .update(id, changedBlog)
      .then((returnedBlog) => {
        console.log("returnedBlog:", returnedBlog);
        setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)));

        showNotification(
          `${blog.title} ${blog.url} blog is successfully updated`,
          "success"
        );
      })
      .catch((error) => {
        showNotification(
          `Error updating ${blog.title} blog. Details:${error}`,
          "error"
        );
      });
  };

  const handleDeleteOf = (id) => {
    console.log("handleDeleteOf", id);
    const blog = blogs.find((b) => b.id === id);
    if (!blog) {
      showNotification(`Blog with id ${id} not found`, "error");
      return;
    }

    blogService
      .remove(id)
      .then(() => {
        setBlogs(blogs.filter((blog) => blog.id !== id));

        showNotification(
          `${blog.title} ${blog.url} blog is successfully removed`,
          "success"
        );
      })
      .catch((error) => {
        showNotification(
          `Error removing ${blog.title} blog. Details:${error}`,
          "error"
        );
      });
  };

  const addBlog = (blogObject) => {
    console.log("app->addBlog run", blogObject);
    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        console.log('returnedBlog:', returnedBlog);
        blogFormRef.current.toggleVisibility();
        setBlogs(blogs.concat(returnedBlog));
        showNotification(
          `${blogObject.url} URL is successfully added to blog list`,
          "success"
        );
      })
      .catch((error) => {
        console.error("Error adding blog:", error);
        showNotification(
          `Error adding ${blogObject.url} blog. Details:${error}`,
          "error"
        );
      });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      console.log("user", user);
      window.localStorage.setItem("loggedBlogAppUser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      showNotification("wrong username or password", "error");
    }
  };

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? "none" : "" };
    const showWhenVisible = { display: loginVisible ? "" : "none" };

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>log in</button>
        </div>
        <div style={showWhenVisible}>
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleSubmit={handleLogin}
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    );
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
    window.localStorage.removeItem("loggedBlogAppUser");
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Notification message={notification.message} type={notification.type} />
      {!user && loginForm()}
      {user && (
        <div>
          <div>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </div>
          <Togglable buttonLabel="create new blog" ref={blogFormRef}>
            <BlogForm createBlog={addBlog} blogs={blogs} />
          </Togglable>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              handleLike={() => handleLikeOf(blog.id)}
              handleDelete={() => handleDeleteOf(blog.id)}
            />
          ))}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default App;
