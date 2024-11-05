jsx
import React from 'react';
import BlogPost from './components/BlogPost/BlogPost.js';
import EditPost from './components/EditPost/EditPost.js';
import CommentSection from './components/CommentSection/CommentSection.js';
import HomePage from './components/HomePage/HomePage.js';

const App = () => {
  return (
    <div className="App">
      <HomePage />
      <BlogPost />
      <EditPost />
      <CommentSection />
    </div>
  );
};

export default App;
