import React, { useState, useEffect } from 'react';
import API from '../api/api';
import { Link } from 'react-router-dom';

function Home() {
  const [blogs, setBlogs] = useState([]);

  // Fetch blogs when the component mounts
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await API.get('/blogs');
        setBlogs(res.data);
      } catch (err) {
        alert('Failed to load blogs');
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>All Blog Posts</h2>
      {blogs.length === 0 ? (
        <p>No blog posts available.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
        {blogs.map(blog => (
            <li key={blog._id} className="blog-card">
            <h3>{blog.title}</h3>
            <p>{blog.content.slice(0, 100)}...</p>
            <Link to={`/blog/${blog._id}`}>Read more</Link>
            </li>
        ))}
        </ul>)}
    </div>
  );
}

export default Home;
