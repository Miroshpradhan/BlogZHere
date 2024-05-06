import React, { useState } from 'react';

const PostPreview = ({ post }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);

  const handleMediaClick = (media) => {
    setSelectedMedia(media);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMedia(null);
  };

  return (
    <div className="post-preview">
      <h3>{post.title}</h3>
      {post.media.map((media, index) => (
        <div key={index} className="media-container">
          {media.type === 'image' ? (
            <img
              src={media.url}
              alt={`Image ${index}`}
              className="media"
              onClick={() => handleMediaClick(media)}
            />
          ) : (
            <video
              src={media.url}
              controls
              className="media"
              onClick={() => handleMediaClick(media)}
            />
          )}
        </div>
      ))}
      {showModal && (
        <div className="modal">
          {selectedMedia.type === 'image' ? (
            <img src={selectedMedia.url} alt="Selected Image" className="modal-media" />
          ) : (
            <video src={selectedMedia.url} controls className="modal-media" />
          )}
          <button onClick={handleCloseModal} className="modal-close-button">
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default PostPreview;
