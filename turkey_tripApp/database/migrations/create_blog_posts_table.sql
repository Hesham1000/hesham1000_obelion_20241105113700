CREATE TABLE blog_posts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    imageUrl VARCHAR(255),
    videoUrl VARCHAR(255)
);

CREATE TABLE comments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    postId INT NOT NULL,
    FOREIGN KEY (postId) REFERENCES blog_posts(id)
);
