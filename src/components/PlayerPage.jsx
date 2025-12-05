import React, { useState, useEffect, useRef } from 'react';
import { AiOutlinePlayCircle, AiOutlinePauseCircle } from 'react-icons/ai';
import { BiSkipNext, BiSkipPrevious } from 'react-icons/bi';
import { BsVolumeUp, BsVolumeMute } from 'react-icons/bs';
import Skeleton from './Skeleton';
import './PlayerPage.css';

function PlayerPage({ bookId }) {
  const [loading, setLoading] = useState(true);
  const [book, setBook] = useState(null);
  const [error, setError] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    const fetchBook = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`https://us-central1-summaristt.cloudfunctions.net/getBook?id=${bookId}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch book');
        }

        const data = await response.json();
        setBook(data);
      } catch (err) {
        console.error('Error fetching book:', err);
        setError('Failed to load book. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    if (bookId) {
      fetchBook();
    }
  }, [bookId]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [book]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio) return;

    const seekTime = (e.target.value / 100) * duration;
    audio.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const handleVolumeChange = (e) => {
    const audio = audioRef.current;
    const newVolume = e.target.value / 100;
    
    if (audio) {
      audio.volume = newVolume;
    }
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isMuted) {
      audio.volume = volume || 0.5;
      setIsMuted(false);
    } else {
      audio.volume = 0;
      setIsMuted(true);
    }
  };

  const skipForward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.min(audio.currentTime + 10, duration);
  };

  const skipBackward = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = Math.max(audio.currentTime - 10, 0);
  };

  const formatTime = (time) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return (
      <div className="player-page">
        <div className="player-page__container">
          <Skeleton width="60%" height="40px" className="skeleton--text" />
          <Skeleton width="40%" height="20px" className="skeleton--text" />
          
          <div className="player-summary" style={{ marginTop: '32px' }}>
            <Skeleton width="100%" height="16px" className="skeleton--text" />
            <Skeleton width="100%" height="16px" className="skeleton--text" />
            <Skeleton width="100%" height="16px" className="skeleton--text" />
            <Skeleton width="95%" height="16px" className="skeleton--text" />
            <Skeleton width="100%" height="16px" className="skeleton--text" />
          </div>

          <div className="audio-player" style={{ marginTop: '48px' }}>
            <Skeleton width="100%" height="8px" borderRadius="4px" />
            <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '24px' }}>
              <Skeleton width="50px" height="50px" borderRadius="50%" />
              <Skeleton width="60px" height="60px" borderRadius="50%" />
              <Skeleton width="50px" height="50px" borderRadius="50%" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="player-page">
        <div className="player-page__container">
          <div className="error-message">{error}</div>
        </div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="player-page">
        <div className="player-page__container">
          <div className="error-message">Book not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="player-page">
      <div className="player-page__container">
        <h1 className="player-page__title">{book.title}</h1>
        <p className="player-page__author">By {book.author}</p>

        <div className="player-summary">
          <h2 className="player-summary__title">Summary</h2>
          <div className="player-summary__text">
            {book.summary ? (
              book.summary.split('\n\n').map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))
            ) : (
              <p>{book.subTitle || 'No summary available for this book.'}</p>
            )}
          </div>
        </div>

        <div className="audio-player">
          <audio
            ref={audioRef}
            src={book.audioLink}
            preload="metadata"
          />

          <div className="audio-player__progress">
            <span className="audio-player__time">{formatTime(currentTime)}</span>
            <input
              type="range"
              min="0"
              max="100"
              value={(currentTime / duration) * 100 || 0}
              onChange={handleSeek}
              className="audio-player__seek"
            />
            <span className="audio-player__time">{formatTime(duration)}</span>
          </div>

          <div className="audio-player__controls">
            <button 
              className="audio-player__btn audio-player__btn--skip"
              onClick={skipBackward}
              title="Skip backward 10s"
            >
              <BiSkipPrevious />
            </button>

            <button 
              className="audio-player__btn audio-player__btn--play"
              onClick={togglePlayPause}
            >
              {isPlaying ? <AiOutlinePauseCircle /> : <AiOutlinePlayCircle />}
            </button>

            <button 
              className="audio-player__btn audio-player__btn--skip"
              onClick={skipForward}
              title="Skip forward 10s"
            >
              <BiSkipNext />
            </button>
          </div>

          <div className="audio-player__volume">
            <button 
              className="audio-player__volume-btn"
              onClick={toggleMute}
            >
              {isMuted ? <BsVolumeMute /> : <BsVolumeUp />}
            </button>
            <input
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume * 100}
              onChange={handleVolumeChange}
              className="audio-player__volume-slider"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerPage;
