import React, { useState } from 'react';
import API from '../api/api';

function BlogCard({ blog, fetchBlogs }) {
  const [showModal, setShowModal] = useState(false);
  const [editTitle, setEditTitle] = useState(blog.title);
  const [editContent, setEditContent] = useState(blog.content);


  const hadleDelete = async()=>{
    try{
        await API.delete(`/blogs/${blog._id}`);
        alert('Blog deleted successfully!');
        fetchBlogs();
    }catch(error){
        console.error('Failed to delete blog',error);
        alert('Deletion failed.');
    }
  }

  const handleUpdate = async () => {
    try {
      await API.put(`/blogs/${blog._id}`, {
        title: editTitle,
        content: editContent
      });
      alert('Blog updated successfully!');
      setShowModal(false);
      fetchBlogs();
    } catch (error) {
      console.error('Failed to update blog', error);
      alert('Update failed.');
    }
  };

  return (
    <div className="blog-card" style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
      <h3>{blog.title}</h3>
      <p>{blog.content}</p>
      <button onClick={() => setShowModal(true)} style={{ marginTop: '10px' }}>Edit</button>
      <button onClick={hadleDelete} style={{ marginTop: '10px' }}>Delete</button>

      {/* Modal */}
      {showModal && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h2>Edit Blog</h2>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              placeholder="Edit Title"
              style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
            />
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              placeholder="Edit Content"
              rows="6"
              style={{ width: '100%', marginBottom: '10px', padding: '8px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={handleUpdate} style={buttonStyle}>Save</button>
              <button onClick={() => setShowModal(false)} style={{ ...buttonStyle, backgroundColor: '#f44336' }}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Simple Modal styles
const modalOverlayStyle = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000
};

const modalContentStyle = {
  backgroundColor: 'white',
  padding: '30px',
  borderRadius: '8px',
  width: '400px',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.3)'
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#4CAF50',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer'
};

export default BlogCard;
