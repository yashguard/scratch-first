import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ScratchReveal = () => {
  const [revealed, setRevealed] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const totalPixels = useRef(0);

  const checkRevealPercentage = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let cleared = 0;
    for (let i = 3; i < imageData.data.length; i += 4) {
      if (imageData.data[i] === 0) cleared++;
    }
    const percent = cleared / totalPixels.current;
    if (percent > 0.55 && !revealed) {
      setRevealed(true);
      setShowConfetti(true);
    }
  }, [revealed]);

  const draw = useCallback((x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 30, 0, Math.PI * 2);
    ctx.fill();
  }, []);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current!;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    if ('touches' in e) {
      return {
        x: (e.touches[0].clientX - rect.left) * scaleX,
        y: (e.touches[0].clientY - rect.top) * scaleY,
      };
    }
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const handleStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    isDrawing.current = true;
    const pos = getPos(e);
    draw(pos.x, pos.y);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing.current) return;
    e.preventDefault();
    const pos = getPos(e);
    draw(pos.x, pos.y);
  };

  const handleEnd = () => {
    isDrawing.current = false;
    checkRevealPercentage();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    canvas.width = 500;
    canvas.height = 300;
    totalPixels.current = canvas.width * canvas.height;

    // Gold foil gradient
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, '#C9A84C');
    gradient.addColorStop(0.3, '#D4AF37');
    gradient.addColorStop(0.5, '#E8D48B');
    gradient.addColorStop(0.7, '#D4AF37');
    gradient.addColorStop(1, '#C9A84C');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Add noise texture
    for (let i = 0; i < 8000; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      ctx.fillStyle = `rgba(255,255,255,${Math.random() * 0.15})`;
      ctx.fillRect(x, y, 1, 1);
    }

    // Text on scratch layer
    ctx.fillStyle = 'rgba(139, 26, 43, 0.6)';
    ctx.font = '600 16px "Cormorant Garamond", serif';
    ctx.textAlign = 'center';
    ctx.fillText('✦ Scratch here to reveal the date ✦', canvas.width / 2, canvas.height / 2);
  }, []);

  const confettiParticles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.5,
    duration: 2 + Math.random() * 2,
    color: ['#C9A84C', '#D4AF37', '#8B1A2B', '#E8D48B', '#FDF6E3'][Math.floor(Math.random() * 5)],
    size: 4 + Math.random() * 8,
  }));

  return (
    <section className="relative w-full py-24 flex flex-col items-center justify-center bg-background px-4 overflow-hidden">
          {/* Decorative top */}
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="font-heading text-2xl md:text-3xl text-foreground mb-8 text-center px-4"
          >
            A Special Date Awaits
          </motion.p>

          {/* Scratch card container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-gold"
            style={{ width: 'min(500px, 90vw)', aspectRatio: '5/3' }}
          >
            {/* Content underneath */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-cream-dark p-6">
              <p className="font-body text-lg text-muted-foreground tracking-[0.2em] uppercase mb-2">Save the Date</p>
              <p className="font-heading text-3xl md:text-5xl text-foreground">15th December</p>
              <p className="font-heading text-2xl md:text-3xl text-primary">2026</p>
            </div>

            {/* Scratch canvas */}
            {!revealed && (
              <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full scratch-canvas cursor-pointer"
                onMouseDown={handleStart}
                onMouseMove={handleMove}
                onMouseUp={handleEnd}
                onMouseLeave={handleEnd}
                onTouchStart={handleStart}
                onTouchMove={handleMove}
                onTouchEnd={handleEnd}
              />
            )}
          </motion.div>

          {!revealed && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="font-body text-base text-muted-foreground mt-6 tracking-wider"
            >
              ✦ Scratch to reveal the date ✦
            </motion.p>
          )}

          {/* Revealed state */}
          {revealed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mt-8 text-center"
            >
              <p className="font-heading text-3xl md:text-5xl text-primary">
                We're Getting Married!
              </p>
            </motion.div>
          )}

          {/* Confetti */}
          {showConfetti && confettiParticles.map(p => (
            <motion.div
              key={p.id}
              initial={{ y: '50vh', x: `${p.x}vw`, opacity: 1, rotate: 0 }}
              animate={{
                y: '-20vh',
                opacity: 0,
                rotate: Math.random() * 720 - 360,
              }}
              transition={{ duration: p.duration, delay: p.delay, ease: 'easeOut' }}
              className="fixed pointer-events-none z-50"
              style={{
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                borderRadius: Math.random() > 0.5 ? '50%' : '2px',
                left: 0,
                top: 0,
              }}
            />
          ))}
    </section>
  );
};

export default ScratchReveal;
