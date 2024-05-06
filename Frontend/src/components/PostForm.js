import React, { useState } from 'react';
import { MdCameraAlt, MdVideocam, MdClose, MdFavorite, MdFavoriteBorder, MdComment, MdEdit } from 'react-icons/md';
import './PostForm.css';

const PostForm = () => {
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [postPreview, setPostPreview] = useState(null);
  const [message, setMessage] = useState('');
  const [liked, setLiked] = useState(false);
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [comments, setComments] = useState([]);
  const [anonymousUser] = useState({ name: 'Anonymous', profilePic: 'https://i.pravatar.cc/150?img=1' });

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const imageFiles = files.filter((file) => file.type.startsWith('image'));
    const videoFiles = files.filter((file) => file.type.startsWith('video'));
    setImages([...images, ...imageFiles]);
    setVideos([...videos, ...videoFiles]);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
  };

  const handleRemoveVideo = (index) => {
    const updatedVideos = [...videos];
    updatedVideos.splice(index, 1);
    setVideos(updatedVideos);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleComment = () => {
    // Logic for handling comments
  };

  const handleRemoveComment = (index) => {
    const updatedComments = [...comments];
    updatedComments.splice(index, 1);
    setComments(updatedComments);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
    
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const preview = (
        <div className="post-preview">
          <h3>Post Preview</h3>
          <p>{text}</p>
          {images.map((image, index) => (
            <div key={index}>
              <img src={URL.createObjectURL(image)} alt={`Image ${index + 1}`} />
              <button className="remove-file-btn" onClick={() => handleRemoveImage(index)}>
                <MdClose />
              </button>
            </div>
          ))}
          {videos.map((video, index) => (
            <div key={index}>
              <video src={URL.createObjectURL(video)} controls />
              <button className="remove-file-btn" onClick={() => handleRemoveVideo(index)}>
                <MdClose />
              </button>
            </div>
          ))}
          <div className="likes-comments">
            <button className="like-btn" onClick={handleLike}>
              {liked ? <MdFavorite style={{ color: 'tomato' }} /> : <MdFavoriteBorder />}
            </button>
            <button className="comment-btn" onClick={handleComment}>
              <MdComment />
            </button>
          </div>
          <div className="previewcomments">
            {comments.map((comment, index) => (
              <div key={index} className="comment">
                <p>{comment}</p>
                <button className="remove-comment-btn" onClick={() => handleRemoveComment(index)}>
                  <MdClose />
                </button>
              </div>
            ))}
          </div>
        </div>
      );
      setPostPreview(preview);

      // Simulating post creation success
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setImages([]);
      setVideos([]);
      setText('');
      setLoading(false);
      setLiked(false);
    } catch (error) {
      console.error('Error creating post:', error);
      setLoading(false);
    }
  };
  return (
    <div className="post-form">
      <h2 className="post-form__title">Create Post</h2>
      <form className="post-form__form" onSubmit={handleSubmit}>
        <div className="post-form__field">
          <label htmlFor="description-input">Description:</label>
          <textarea id="description-input" value={text} onChange={handleTextChange} />
        </div>
        <div className="post-form__option">
          <label htmlFor="post-option">Post type:</label>
          <div className="post-type-icons">
            <label htmlFor="camera-icon" className="icon-label">
              <MdCameraAlt />
              <input id="camera-icon" type="file" accept="image/*" onChange={handleFileChange} multiple />
            </label>
            <label htmlFor="video-icon" className="icon-label">
              <MdVideocam />
              <input id="video-icon" type="file" accept="video/*" onChange={handleFileChange} multiple />
            </label>
          </div>
        </div>
        <button type="submit" className="post-form__button" disabled={loading}>
          Create post
        </button>
        {loading && <p>Creating post...</p>}
        {postPreview && !loading && <>{postPreview}</>}
        {message && <p className="post-form__message">{message}</p>}
      </form>
      {showCommentModal && (
        <div className="comment-modal">
          <textarea className="comment-input" />
          <button className="add-comment-btn">Add Comment</button>
          <button className="close-modal-btn" onClick={() => setShowCommentModal(false)}>
            <MdClose />
          </button>
        </div>
      )}
    </div>
  );
};

export default PostForm;
