import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MusicPlayerProps {
  canPlay: boolean;
}

const MusicPlayer = ({ canPlay }: MusicPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const startedRef = useRef(false);

  // Auto-start music as soon as canPlay becomes true (after hero completes)
  useEffect(() => {
    if (!canPlay || startedRef.current) return;
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.3;
    audio.play()
      .then(() => {
        setIsPlaying(true);
        startedRef.current = true;
      })
      .catch(() => {
        // Browser blocked auto-play — wait for any user interaction
        const resume = () => {
          audio.play()
            .then(() => {
              setIsPlaying(true);
              startedRef.current = true;
            })
            .catch(() => {});
          window.removeEventListener('click', resume);
          window.removeEventListener('touchstart', resume);
        };
        window.addEventListener('click', resume, { once: true });
        window.addEventListener('touchstart', resume, { once: true });
      });
  }, [canPlay]);

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
      <audio ref={audioRef} loop preload="auto">
        <source src="https://framerusercontent.com/assets/7dqA8jlZHij9fuyhj602jarV4eg.mp3" type="audio/mpeg" />
      </audio>

      <motion.button
        onClick={toggle}
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: canPlay ? 1 : 0, scale: canPlay ? 1 : 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-primary/80 backdrop-blur-sm text-primary-foreground flex items-center justify-center shadow-lg border border-gold/30"
        aria-label={isPlaying ? 'Pause music' : 'Play music'}
        style={{ pointerEvents: canPlay ? 'auto' : 'none' }}
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
