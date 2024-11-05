import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditPostPage.css';

const EditPostPage = ({ match, history }) => {
  const [activeTab, setActiveTab] = useState('edit');
  const [postContent, setPostContent] = useState({
    text: '',
    images: [],
    videos: [],
  });
  const [previewContent, setPreviewContent] = useState(postContent);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(
          `https://turkey_tripApp-backend.cloud-stacks.com/api/blogPosts/${match.params.id}`
        );
        setPostContent(response.data);
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };
    if (match.params.id) {
      fetchPost();
    }
  }, [match.params.id]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === 'preview') {
      setPreviewContent(postContent);
    }
  };

  const handleContentChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setPostContent({ ...postContent, [name]: Array.from(files) });
    } else {
      setPostContent({ ...postContent, [name]: value });
    }
  };

  const handleSaveChanges = async () => {
    try {
      if (match.params.id) {
        await axios.put(
          `https://turkey_tripApp-backend.cloud-stacks.com/api/blogPosts/${match.params.id}`,
          postContent,
          { headers: { 'Content-Type': 'application/json' } }
        );
      } else {
        await axios.post(
          'https://turkey_tripApp-backend.cloud-stacks.com/api/blogPosts',
          postContent,
          { headers: { 'Content-Type': 'application/json' } }
        );
      }
      history.push('/dashboard');
    } catch (error) {
      console.error('Error saving changes:', error);
    }
  };

  return (
    <div className="edit-post-page">
      <header>
        <div className="logo">Blog Logo</div>
        <nav>
          <a href="/profile">Profile</a>
          <a href="/settings">Settings</a>
        </nav>
      </header>
      <div className="main-body">
        <div className="tabs">
          <button onClick={() => handleTabChange('edit')}>Edit</button>
          <button onClick={() => handleTabChange('preview')}>Preview</button>
          <button onClick={() => handleTabChange('publish')}>Publish</button>
        </div>
        {activeTab === 'edit' && (
          <div className="edit-form">
            <label>
              Text:
              <textarea
                name="text"
                value={postContent.text}
                onChange={handleContentChange}
              />
            </label>
            <label>
              Images:
              <input type="file" name="images" multiple onChange={handleContentChange} />
            </label>
            <label>
              Videos:
              <input type="file" name="videos" multiple onChange={handleContentChange} />
            </label>
            <button className="save-button" onClick={handleSaveChanges}>
              Save Changes
            </button>
          </div>
        )}
        {activeTab === 'preview' && (
          <div className="preview-pane">
            <h3>Preview</h3>
            <p>{previewContent.text}</p>
            <div className="media-preview">
              {previewContent.images.map((img, index) => (
                <img key={index} src={URL.createObjectURL(img)} alt="Preview" />
              ))}
              {previewContent.videos.map((video, index) => (
                <video key={index} controls>
                  <source src={URL.createObjectURL(video)} type="video/mp4" />
                </video>
              ))}
            </div>
          </div>
        )}
        {activeTab === 'publish' && (
          <div className="publish-pane">
            <h3>Ready to Publish</h3>
            <button className="save-button" onClick={handleSaveChanges}>
              Save and Publish
            </button>
          </div>
        )}
      </div>
      <footer>
        <a href="/terms">Terms of Service</a>
        <a href="/privacy">Privacy Policy</a>
        <div className="social-media">
          <a href="/facebook">Facebook</a>
          <a href="/twitter">Twitter</a>
        </div>
      </footer>
    </div>
  );
};

export default EditPostPage;
