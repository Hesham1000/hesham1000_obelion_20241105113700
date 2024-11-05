import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './HomePage.css';

const HomePage = () => {
  const [blogPost, setBlogPost] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    fetchBlogPost();
    fetchComments();
  }, []);

  const fetchBlogPost = async () => {
    try {
      const response = await axios.get('https://turkey_tripApp-backend.cloud-stacks.com/api/blog-posts/1');
      setBlogPost(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`https://turkey_tripApp-backend.cloud-stacks.com/api/blog-posts/1/comments`);
      setComments(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const postComment = async () => {
    try {
      const response = await axios.post('https://turkey_tripApp-backend.cloud-stacks.com/api/blog-posts/1/comments', {
        content: newComment,
        author: 'Anonymous',
      }, {
        headers: {
          'Content-Type': 'application/json',
        }
      });
      setComments([...comments, response.data]);
      setNewComment('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="homepage">
      <header className="header">
        <div className="logo">Blog Name</div>
        <nav className="navbar">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
        </nav>
      </header>

      <main className="content">
        <article className="blog-post">
          <h1>{blogPost.title}</h1>
          <p>{blogPost.content}</p>
          <img src={blogPost.imageUrl} alt="Trip related" />
          {blogPost.videoUrl && (
            <video controls>
              <source src={blogPost.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </article>

        <section className="comments-section">
          <h2>Comments</h2>
          {comments.map((comment) => (
            <div key={comment.id} className="comment">
              <p>{comment.content}</p>
              <small>By {comment.author}</small>
            </div>
          ))}
          <div className="comment-form">
            <textarea
              placeholder="Leave a comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <button type="button" onClick={postComment}>Post Comment</button>
          </div>
        </section>

        <aside className="related-articles">
          <h3>Related Articles</h3>
          <ul>
            <li><a href="#">Related Article 1</a></li>
            <li><a href="#">Related Article 2</a></li>
          </ul>
        </aside>
      </main>

      <footer className="footer">
        <div className="footer-nav">
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
        </div>
        <div className="social-media">
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
