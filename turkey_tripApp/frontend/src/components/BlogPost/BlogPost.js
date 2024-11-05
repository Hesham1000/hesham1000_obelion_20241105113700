import React, { useState } from 'react';
import './BlogPost.css';
import axios from 'axios';

function BlogPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  const handleSaveDraft = async () => {
    try {
      const response = await axios.put('https://turkey_tripApp-backend.cloud-stacks.com/api/drafts', {
        title,
        content,
        tags,
        location,
        date,
      });
      if (response.status === 200) {
        alert('Draft saved successfully');
      }
    } catch (error) {
      alert('Failed to save draft');
    }
  };

  const handlePublish = async () => {
    try {
      const response = await axios.put('https://turkey_tripApp-backend.cloud-stacks.com/api/publish', {
        title,
        content,
        tags,
        location,
        date,
      });
      if (response.status === 200) {
        alert('Post published successfully');
      }
    } catch (error) {
      alert('Failed to publish post');
    }
  };

  return (
    <div className="blog-post">
      <header className="header">
        <div className="logo">CompanyLogo</div>
        <nav className="navigation-tabs">
          <a href="/posts">View Posts</a>
          <a href="/drafts">Drafts</a>
          <a href="/settings">Settings</a>
        </nav>
      </header>

      <main className="main-content">
        <h1>Create new blog post</h1>
        <form>
          <div className="form-field">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-field">
            <label>Content</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <div className="form-field">
            <label>Tags</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
          <div className="additional-links">
            <button type="button" onClick={() => setLocation(prompt('Enter location'))}>Add Location</button>
            <button type="button" onClick={() => setDate(prompt('Enter date'))}>Add Date</button>
          </div>
          <div className="action-buttons">
            <button type="button" onClick={handleSaveDraft}>Save as Draft</button>
            <button type="button" onClick={handlePublish}>Publish</button>
          </div>
        </form>
      </main>

      <footer className="footer">
        <p>&copy; 2023 Company Name. All rights reserved.</p>
        <a href="/terms">Terms and Conditions</a>
        <a href="/privacy">Privacy Policy</a>
      </footer>
    </div>
  );
}

export default BlogPost;
