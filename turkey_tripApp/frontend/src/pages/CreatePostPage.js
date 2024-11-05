import React, { useState } from 'react';
import axios from 'axios';
import './CreatePostPage.css';

function CreatePostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');

  const handleSaveDraft = async () => {
    try {
      const response = await axios.post('https://turkey_tripApp-backend.cloud-stacks.com/api/drafts', {
        title,
        content,
        tags,
        location,
        date
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 201) {
        alert('Draft saved successfully!');
      }
    } catch (error) {
      alert('Failed to save draft');
    }
  };

  const handlePublish = async () => {
    try {
      const response = await axios.post('https://turkey_tripApp-backend.cloud-stacks.com/api/posts', {
        title,
        content,
        tags,
        location,
        date
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.status === 201) {
        alert('Post published successfully!');
      }
    } catch (error) {
      alert('Failed to publish post');
    }
  };

  return (
    <div className="create-post-page">
      <header className="header">
        <div className="logo">Company Logo</div>
        <nav className="navigation">
          <a href="/view-posts">View Posts</a>
          <a href="/drafts">Drafts</a>
          <a href="/settings">Settings</a>
        </nav>
      </header>
      <main className="main-content">
        <h1>Create new blog post</h1>
        <form className="post-form">
          <div className="form-group">
            <label htmlFor="title">Blog Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Blog Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="tags">Tags</label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
          <div className="additional-links">
            <button type="button" onClick={() => setLocation('')}>
              Add Location
            </button>
            <button type="button" onClick={() => setDate('')}>
              Add Date
            </button>
          </div>
          <div className="action-buttons">
            <button type="button" onClick={handleSaveDraft}>
              Save as Draft
            </button>
            <button type="button" onClick={handlePublish}>
              Publish
            </button>
          </div>
        </form>
      </main>
      <footer className="footer">
        <p>© 2023 Company Name. All rights reserved.</p>
        <a href="/terms">Terms and Conditions</a>
        <a href="/privacy">Privacy Policy</a>
      </footer>
    </div>
  );
}

export default CreatePostPage;
