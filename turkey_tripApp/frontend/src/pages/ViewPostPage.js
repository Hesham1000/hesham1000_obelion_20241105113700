import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ViewPostPage.css';

function ViewPostPage() {
  const [blogPost, setBlogPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const postId = 1; // You can set this dynamically

  useEffect(() => {
    async function fetchBlogPost() {
      try {
        const response = await axios.get(`https://turkey_tripApp-backend.cloud-stacks.com/api/blog-posts/${postId}`);
        setBlogPost(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    async function fetchComments() {
      try {
        const response = await axios.get(`https://turkey_tripApp-backend.cloud-stacks.com/api/blog-posts/${postId}/comments`);
        setComments(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchBlogPost();
    fetchComments();
  }, [postId]);

  const handleCommentSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`https://turkey_tripApp-backend.cloud-stacks.com/api/blog-posts/${postId}/comments`, {
        content: newComment,
        author: "Anonymous"
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setComments([...comments, response.data]);
      setNewComment("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="view-post-page">
      <header className="header">
        <div className="logo">Blog Name</div>
        <nav className="navigation">
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
      </header>
      
      <main className="content">
        <article className="blog-post">
          {blogPost ? (
            <>
              <h1>{blogPost.title}</h1>
              <p>{blogPost.content}</p>
              {blogPost.imageUrl && <img src={blogPost.imageUrl} alt="Description" />}
              {blogPost.videoUrl && (
                <video controls>
                  <source src={blogPost.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </>
          ) : (
            <p>Loading...</p>
          )}
        </article>

        <section className="comments">
          <h2>Leave a Comment</h2>
          <form onSubmit={handleCommentSubmit}>
            <textarea 
              placeholder="Write your comment here..." 
              value={newComment} 
              onChange={(e) => setNewComment(e.target.value)} 
            />
            <button type="submit">Post Comment</button>
          </form>
          <ul>
            {comments.map(comment => (
              <li key={comment.id}>{comment.content} - {comment.author}</li>
            ))}
          </ul>
        </section>

        <aside className="related-posts">
          <h2>Related Posts</h2>
          <ul>
            <li><a href="/related-post-1">Related Post 1</a></li>
            <li><a href="/related-post-2">Related Post 2</a></li>
          </ul>
        </aside>
      </main>

      <footer className="footer">
        <nav>
          <ul>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/terms">Terms of Service</a></li>
          </ul>
        </nav>
        <div className="social-media">
          <a href="social-link">Social Media</a>
        </div>
      </footer>
    </div>
  );
}

export default ViewPostPage;
