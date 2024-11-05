import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CommentSection.css';

const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`https://turkey_tripApp-backend.cloud-stacks.com/api/blog-posts/${postId}/comments`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };
    fetchComments();
  }, [postId]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleAuthorChange = (e) => {
    setAuthor(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (comment.trim() && author.trim()) {
      try {
        const response = await axios.post(`https://turkey_tripApp-backend.cloud-stacks.com/api/blog-posts/${postId}/comments`, {
          content: comment,
          author
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
        setComments([...comments, response.data]);
        setComment('');
        setAuthor('');
      } catch (error) {
        console.error('Error posting comment:', error);
      }
    }
  };

  return (
    <div className="comment-section">
      <header className="blog-header">
        <h1>Blog Logo</h1>
        <nav>
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </nav>
      </header>
      <main className="blog-content">
        <article>
          <h2>Trip to Turkey</h2>
          <p>Content about the trip...</p>
          <img src="image_url" alt="Trip" />
          <video controls>
            <source src="video_url" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </article>
        <section className="comments">
          <h3>Comments</h3>
          <form onSubmit={handleCommentSubmit}>
            <input
              type="text"
              value={author}
              onChange={handleAuthorChange}
              placeholder="Your Name"
            />
            <textarea
              value={comment}
              onChange={handleCommentChange}
              placeholder="Leave a comment"
            />
            <button type="submit">Post Comment</button>
          </form>
          <ul>
            {comments.map((cmt, index) => (
              <li key={index}>{cmt.author}: {cmt.content}</li>
            ))}
          </ul>
        </section>
      </main>
      <aside className="related-links">
        <h3>Related Articles</h3>
        <ul>
          <li>Related Article 1</li>
          <li>Related Article 2</li>
        </ul>
      </aside>
      <footer className="blog-footer">
        <nav>
          <ul>
            <li>Privacy Policy</li>
            <li>Terms of Service</li>
          </ul>
        </nav>
        <p>Contact us at: contact@blog.com</p>
      </footer>
    </div>
  );
};

export default CommentSection;
