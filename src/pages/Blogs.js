import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';
import BlogCard from '../components/BlogCard.jsx';

function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const fetchBlogs = async () => {
    try {
      const res = await API.get('/blogs');
      setBlogs(res.data);
    } catch (err) {
      alert('Failed to load blogs');
    }
  };
  // Fetch blogs when the component mounts
  useEffect(() => {
    fetchBlogs();
  }, []);

  // Create a new blog post
  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/blogs/create', { title, content });
      setBlogs([res.data, ...blogs]); // Add new blog to the list
      setTitle('');
      setContent('');
    } catch (err) {
      alert('Failed to create blog');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Admin Dashboard</h2>

      <h3>Create New Blog</h3>
      <form onSubmit={handleCreate}>
        <input 
          type="text" 
          placeholder="Blog Title" 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required 
        />
        <br /><br />
        <textarea 
          placeholder="Blog Content" 
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required 
        />
        <br /><br />
        <button type="submit">Create Blog</button>
      </form>

      <h3>All Blog Posts</h3>
        <div>
        {blogs.map((blog) => (
            <BlogCard key = {blog._id} blog={blog} fetchBlogs={fetchBlogs}/>
        ))}
        </div>
    </div>
  );
}

export default Blogs;
