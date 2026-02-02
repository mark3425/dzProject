import React from 'react';
import Video from "./assets/video.mp4"
const VideoBackground = ({ children }) => {
  return (
    <div style={styles.container}>
      <video
        autoPlay
        muted
        loop
        playsInline
        style={styles.video}
      >
        <source src={Video} type="video/mp4" />
        Ваш браузер не поддерживает видео.
      </video>
      <div style={styles.overlay}></div>
      <div style={styles.content}>
        {children}
      </div>
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    width: '100%',
    minHeight: '100vh',
    overflow: 'hidden',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: -2,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Полупрозрачный оверлей
    zIndex: -1,
  },
  content: {
    position: 'relative',
    zIndex: 1,
  }
};

export default VideoBackground;