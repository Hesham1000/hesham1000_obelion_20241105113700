import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditPost.css';

function EditPost({ postId }) {
  const [activeTab, setActiveTab] = useState('edit');
  const [postContent, setPostContent] = useState({
    text: '',
    images: [],
    videos: []
  });

  useEffect(() => {
    if (postId) {
      axios.get(`https://turkey_tripApp-backend.cloud-stacks.com/api/blogPosts/${postId}`)
        .then(response => {
          setPostContent(response.data);
        })
        .catch(error => {
          console.error('Error fetching post:', error);
        });
    }
  }, [postId]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleContentChange = (field, value) => {
    setPostContent({
      ...postContent,
      [field]: value
    });
  };

  const saveChanges = () => {
    const url = postId ? `https://turkey_tripApp-backend.cloud-stacks.com/api/blogPosts/${postId}` : 'https://turkey_tripApp-backend.cloud-stacks.com/api/blogPosts';
    const method = postId ? 'put' : 'post';

    axios({
      method: method,
      url: url,
      headers: {
        'Content-Type': 'application/json'
      },
      data: postContent
    })
      .then(response => {
        // Handle success
      })
      .catch(error => {
        console.error('Error saving changes:', error);
      });
  };

  return (
    <div className="edit-post">
      <header className="edit-post-header">
        <div className="logo">Blog Logo</div>
        <nav className="profile-settings">
          <a href="/profile">Profile</a>
          <a href="/settings">Settings</a>
        </nav>
      </header>
      <div className="edit-post-body">
        <nav className="edit-post-tabs">
          <button onClick={() => handleTabChange('edit')}>Edit</button>
          <button onClick={() => handleTabChange('preview')}>Preview</button>
          <button onClick={() => handleTabChange('publish')}>Publish</button>
        </nav>
        {activeTab === 'edit' && (
          <div className="edit-post-form">
            <label>
              Text:
              <textarea
                value={postContent.text}
                onChange={(e) => handleContentChange('text', e.target.value)}
              />
            </label>
            <label>
              Images:
              <input
                type="file"
                multiple
                onChange={(e) =>
                  handleContentChange('images', Array.from(e.target.files))
                }
              />
            </label>
            <label>
              Videos:
              <input
                type="file"
                multiple
                onChange={(e) =>
                  handleContentChange('videos', Array.from(e.target.files))
                }
              />
            </label>
            <button className="save-changes" onClick={saveChanges}>
              Save Changes
            </button>
          </div>
        )}
        {activeTab === 'preview' && (
          <div className="post-preview">
            <h2>Preview</h2>
            <p>{postContent.text}</p>
            {postContent.images.map((img, index) => (
              <img key={index} src={URL.createObjectURL(img)} alt="Preview" />
            ))}
            {postContent.videos.map((video, index) => (
              <video key={index} controls>
                <source src={URL.createObjectURL(video)} type="video/mp4" />
              </video>
            ))}
          </div>
        )}
      </div>
      <aside className="edit-post-sidebar">
        <a href="/related-posts">Related Posts</a>
        <a href="/blog-management">Blog Management</a>
      </aside>
      <footer className="edit-post-footer">
        <a href="/terms">Terms of Service</a>
        <a href="/privacy">Privacy Policy</a>
        <div className="social-media">
          <a href="/facebook">Facebook</a>
          <a href="/twitter">Twitter</a>
        </div>
      </footer>
    </div>
  );
}

export default EditPost;
