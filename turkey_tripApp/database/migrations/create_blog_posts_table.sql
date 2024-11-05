CREATE TABLE blog_posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  tags VARCHAR(255),
  location VARCHAR(255),
  date DATE,
  status ENUM('draft', 'published') NOT NULL DEFAULT 'draft'
);
