import React, { useState } from 'react';
import './PostList.css';

const PostList = () => {
  // Fake post data
  const posts = [
    {
      id: 1,
      title: 'Lorem Ipsum',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      images: [
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
      ],
      videos: [
        'https://www.w3schools.com/html/mov_bbb.mp4',
        'https://www.w3schools.com/html/mov_bbb.mp4',
      ],
    },
    {
      id: 2,
      title: 'Lorem Ipsum',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit...',
      images: [
        'https://via.placeholder.com/150',
        'https://via.placeholder.com/150',
      ],
      videos: [
        'https://www.w3schools.com/html/mov_bbb.mp4',
      ],
    },
    // Add more fake posts as needed
  ];

  const [selectedPost, setSelectedPost] = useState(null);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);

  const openModal = (post, index) => {
    setSelectedPost(post);
    setSelectedMediaIndex(index);
  };

  const closeModal = () => {
    setSelectedPost(null);
  };

  const nextMedia = () => {
    const totalMedia = selectedPost.images.length + selectedPost.videos.length;
    setSelectedMediaIndex((prevIndex) => (prevIndex + 1) % totalMedia);
  };

  const prevMedia = () => {
    const totalMedia = selectedPost.images.length + selectedPost.videos.length;
    setSelectedMediaIndex((prevIndex) => (prevIndex - 1 + totalMedia) % totalMedia);
  };

  return (
    <div className="post-list">
      {posts.map((post) => (
        <div key={post.id} className="post-preview">
          <h3>{post.title}</h3>
          {post.images.slice(0, 4).map((image, index) => (
            <img key={index} src={image} alt={`Post ${index}`} onClick={() => openModal(post, index)} />
          ))}
          {post.images.length > 4 && (
            <div className="image-overlay" onClick={() => openModal(post, 0)}>
              <p>+{post.images.length - 4}</p>
            </div>
          )}
          <p>{post.content}</p>
        </div>
      ))}
      {selectedPost && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <span className="close" onClick={closeModal}>&times;</span>
            {selectedPost.images.length > 0 && (
              <img
                src={selectedPost.images[selectedMediaIndex]}
                alt={`Post ${selectedMediaIndex}`}
                className="modal-media"
              />
            )}
            {selectedPost.videos.length > 0 && (
              <video
                src={selectedPost.videos[selectedMediaIndex]}
                controls
                className="modal-media"
              ></video>
            )}
            <p>{selectedPost.content}</p>
            <div className="media-controls">
              <button onClick={prevMedia}>&lt;</button>
              <button onClick={nextMedia}>&gt;</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostList;
