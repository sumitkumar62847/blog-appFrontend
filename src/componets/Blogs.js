import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";


const Blogs = () => {
  const [blogs, setBlogs] = useState();
  const sendRequest = async () => {
    const res = await axios
      .get(`${process.env.REACT_APP_API_URL}/api/blogs`)
      .catch((err) => console.log(err));
    const data = await res?.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setBlogs(data?.blogs));
  }, []);
  return (
    <div>
      {blogs &&
        blogs.map((blog, index) => (
          <Blog
            key={index}
            id={blog._id}
            isUser={localStorage.getItem("userId") === blog.user._id}
            title={blog.title}
            desc={blog.desc}
            img={blog.img}
            user={blog.user.name}
            date={new Date(blog.date).toLocaleDateString()}
          />
        ))}
    </div>
  );
};

export default Blogs;
