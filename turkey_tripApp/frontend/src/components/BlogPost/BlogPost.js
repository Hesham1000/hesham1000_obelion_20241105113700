import React, { useState, useEffect } from 'react';
import './BlogPost.css';
import axios from 'axios';

function BlogPost() {
  const [comments, setComments] = useState([]);
  const [commentInput, setCommentInput] = useState('');
  const postId = 1; // Assuming the post ID is 1 for this example

  useEffect(() => {
    axios.get(`https://turkey_tripApp-backend.cloud-stacks.com/api/blog-posts/${postId}/comments`)
      .then(response => {
        setComments(response.data);
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  }, [postId]);

  const handleCommentChange = (e) => {
    setCommentInput(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (commentInput.trim()) {
      try {
        const response = await axios.post(
          `https://turkey_tripApp-backend.cloud-stacks.com/api/blog-posts/${postId}/comments`,
          {
            content: commentInput.trim(),
            author: 'Anonymous' // Assuming a default author name as 'Anonymous'
          },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        setComments([...comments, response.data]);
        setCommentInput('');
      } catch (error) {
        console.error('Error posting comment:', error);
      }
    }
  };

  return (
    <div className="blog-post">
      <header className="blog-header">
        <h1>Blog Name</h1>
        <nav className="blog-nav">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/contact">Contact</a>
        </nav>
      </header>

      <main className="blog-content">
        <article className="post">
          <h2>Trip to Turkey</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae vestibulum vestibulum.</p>
          <img src="trip-image.jpg" alt="Trip" />
          <video controls>
            <source src="trip-video.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </article>

        <section className="comments-section">
          <h3>Comments</h3>
          <form onSubmit={handleCommentSubmit}>
            <textarea
              value={commentInput}
              onChange={handleCommentChange}
              placeholder="Leave a comment..."
            />
            <button type="submit">Post Comment</button>
          </form>
          <ul>
            {comments.map((comment, index) => (
              <li key={index}>{comment.content}</li>
            ))}
          </ul>
        </section>

        <aside className="related-posts">
          <h3>Related Posts</h3>
          <ul>
            <li><a href="/related-post-1">Related Post 1</a></li>
            <li><a href="/related-post-2">Related Post 2</a></li>
          </ul>
        </aside>
      </main>

      <footer className="blog-footer">
        <p>Contact Information</p>
        <a href="/privacy">Privacy Policy</a>
        <a href="/terms">Terms of Service</a>
      </footer>
    </div>
  );
}

export default BlogPost;
