import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Auto-play attempt after user interaction
  useEffect(() => {
    const handleFirstInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        const audio = audioRef.current;
        if (audio) {
          audio.volume = 0.3;
          audio.play().then(() => setIsPlaying(true)).catch(() => {});
        }
      }
    };
    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });
    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [hasInteracted]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <>
      <audio ref={audioRef} loop preload="none">
        {/* Placeholder: replace with actual audio file */}
        <source src="https://framerusercontent.com/assets/7dqA8jlZHij9fuyhj602jarV4eg.mp3" type="audio/mpeg" />
      </audio>

      <motion.button
        onClick={toggle}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-primary/80 backdrop-blur-sm text-primary-foreground flex items-center justify-center shadow-lg border border-gold/30"
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
      >
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.svg key="pause" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <rect x="6" y="4" width="4" height="16" rx="1" />
              <rect x="14" y="4" width="4" height="16" rx="1" />
            </motion.svg>
          ) : (
            <motion.svg key="play" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </motion.svg>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
};

export default MusicPlayer;
