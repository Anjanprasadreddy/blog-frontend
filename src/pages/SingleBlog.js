import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import API from '../api/api';

function SingleBlog() {
  const { id } = useParams(); // Get blog ID from URL
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await API.get(`/blogs/${id}`);
        setBlog(res.data);
      } catch (err) {
        alert('Failed to load the blog');
      }
    };

    fetchBlog();
  }, [id]);

  return (
    <div style={{ padding: '20px' }}>
      {blog ? (
        <>
          <h2>{blog.title}</h2>
          <p><strong>Author:</strong> {blog.author.name}</p>
          <p>{blog.content}</p>
        </>
      ) : (
        <p>Loading blog...</p>
      )}
    </div>
  );
}

export default SingleBlog;
