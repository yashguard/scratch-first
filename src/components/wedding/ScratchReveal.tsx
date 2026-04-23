import { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── Types ───────────────────────────────────────────────────────────────────

interface ScratchCardProps {
  label: string;
  onRevealed: () => void;
  children: React.ReactNode;
}

// ─── ScratchCard sub-component ───────────────────────────────────────────────

const ScratchCard = ({ label, onRevealed, children }: ScratchCardProps) => {
  const [revealed, setRevealed] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDrawing = useRef(false);
  const totalPixels = useRef(0);
  const onRevealedRef = useRef(onRevealed);
  onRevealedRef.current = onRevealed;

  // Draw gold foil + mehndi dots onto the canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = 210;
    canvas.height = 210;
    totalPixels.current = canvas.width * canvas.height;

    // Clip to heart shape — scaled to canvas dimensions so it always fits
    const w = canvas.width, h = canvas.height;
    const heart = new Path2D(
      `M ${w * 0.5} ${h * 0.9} C ${w * 0.19} ${h * 0.69} ${w * 0.05} ${h * 0.5} ${w * 0.05} ${h * 0.34} ` +
      `C ${w * 0.05} ${h * 0.18} ${w * 0.19} ${h * 0.1} ${w * 0.33} ${h * 0.1} ` +
      `C ${w * 0.41} ${h * 0.1} ${w * 0.47} ${h * 0.13} ${w * 0.5} ${h * 0.18} ` +
      `C ${w * 0.53} ${h * 0.13} ${w * 0.59} ${h * 0.1} ${w * 0.67} ${h * 0.1} ` +
      `C ${w * 0.81} ${h * 0.1} ${w * 0.95} ${h * 0.18} ${w * 0.95} ${h * 0.34} ` +
      `C ${w * 0.95} ${h * 0.5} ${w * 0.81} ${h * 0.69} ${w * 0.5} ${h * 0.9} Z`
    );
    ctx.save();
    ctx.clip(heart);

    // Radial gradient: gold center → dark edge
    const grad = ctx.createRadialGradient(105, 105, 8, 105, 105, 110);
    grad.addColorStop(0, '#E8C84C');
    grad.addColorStop(0.55, '#D4AF37');
    grad.addColorStop(1, '#9A7420');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);



    // Subtle gold inner glow ring along heart outline
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 3;
    ctx.stroke(heart);

    // Label text — positioned within heart's widest visible zone
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Ornament top
    ctx.font = 'bold 22px "Cormorant Garamond", serif';
    ctx.fillStyle = 'rgba(74,15,15,0.88)';
    // ctx.fillText('✦', 105, 82);

    // Main label
    ctx.font = 'bold 34px "Cormorant Garamond", serif';
    ctx.fillStyle = 'rgba(74,15,15,0.92)';
    ctx.fillText(label, 105, 112);

    // Sub-hint
    ctx.font = '500 13px "Cormorant Garamond", serif';
    ctx.fillStyle = 'rgba(74,15,15,0.6)';
    // ctx.fillText('scratch to reveal', 105, 138);

    // Ornament bottom
    ctx.font = 'bold 22px "Cormorant Garamond", serif';
    ctx.fillStyle = 'rgba(74,15,15,0.88)';
    // ctx.fillText('✦', 105, 162);

    ctx.restore();
  }, [label]);

  // Check how much of the canvas has been scratched away
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
      onRevealedRef.current();
    }
  }, [revealed]);

  const scratchAt = useCallback((x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.globalCompositeOperation = 'destination-out';
    // Soft radial-gradient eraser: hard centre fading to transparent at edge
    const grd = ctx.createRadialGradient(x, y, 0, x, y, 62);
    grd.addColorStop(0, 'rgba(0,0,0,1)');
    grd.addColorStop(0.6, 'rgba(0,0,0,0.85)');
    grd.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(x, y, 62, 0, Math.PI * 2);
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
    scratchAt(pos.x, pos.y);
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing.current) return;
    e.preventDefault();
    const pos = getPos(e);
    scratchAt(pos.x, pos.y);
  };

  const handleEnd = () => {
    isDrawing.current = false;
    checkRevealPercentage();
  };

  return (
    <div
      style={{
        width: 'clamp(90px, 26vw, 175px)',
        aspectRatio: '1/1',
        position: 'relative',
        clipPath: 'url(#heart-clip)',
        overflow: 'hidden',
        background: '#F5E8D0',
        flexShrink: 0,
      }}
    >
      {/* Content revealed beneath */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#F5E8D0',
          padding: '16px',
        }}
      >
        {children}
      </div>

      {/* Gold foil scratch canvas */}
      <AnimatePresence>
        {!revealed && (
          <motion.canvas
            key="canvas"
            ref={canvasRef}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              cursor: 'pointer',
              touchAction: 'none',
            }}
            onMouseDown={handleStart}
            onMouseMove={handleMove}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={handleStart}
            onTouchMove={handleMove}
            onTouchEnd={handleEnd}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// ─── Confetti particles ──────────────────────────────────────────────────────

const CONFETTI_COLORS = ['#FF8C00', '#D4AF37', '#B8860B', '#8B1A2B'];

const confettiParticles = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  delay: Math.random() * 0.8,
  duration: 2.2 + Math.random() * 1.8,
  color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
  size: 5 + Math.random() * 7,
  isCircle: Math.random() > 0.5,
  rotate: Math.random() * 720 - 360,
}));

// ─── Main ScratchReveal section ───────────────────────────────────────────────

const ScratchReveal = () => {
  // Track how many cards have been revealed
  const [revealedCount, setRevealedCount] = useState(0);
  const allRevealed = revealedCount >= 3;

  const handleCardRevealed = useCallback(() => {
    setRevealedCount(prev => prev + 1);
  }, []);

  return (
    <>
      {/* Responsive heart clip-path definition — scales to any element size */}
      <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
        <defs>
          <clipPath id="heart-clip" clipPathUnits="objectBoundingBox">
            <path d="M 0.5 0.9 C 0.19 0.69 0.05 0.5 0.05 0.34 C 0.05 0.18 0.19 0.1 0.33 0.1 C 0.41 0.1 0.47 0.13 0.5 0.18 C 0.53 0.13 0.59 0.1 0.67 0.1 C 0.81 0.1 0.95 0.18 0.95 0.34 C 0.95 0.5 0.81 0.69 0.5 0.9 Z" />
          </clipPath>
        </defs>
      </svg>

      <section
        className="relative w-full py-24 flex flex-col items-center justify-center bg-background px-4"
      >
        {/* OM symbol */}
        <motion.p
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: '2rem',
            color: '#B8860B',
            marginBottom: '0.5rem',
            lineHeight: 1,
          }}
        >
          ॐ
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="font-heading text-3xl md:text-4xl text-center"
          style={{ color: '#4A0F0F', marginBottom: '0.75rem' }}
        >
          Uncover Our Sacred Moments
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="font-body tracking-wider text-center"
          style={{ color: '#7A1F1F', marginBottom: '2.5rem', fontSize: 'clamp(0.85rem, 1.4vw, 1.1rem)' }}
        >
          Scratch each seal to reveal the date of our union
        </motion.p>

        {/* Three scratch cards */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(0.75rem, 3vw, 2rem)',
            width: '100%',
            flexWrap: 'nowrap',
          }}
        >
          {/* Card 1 — Day */}
          <ScratchCard label="Day" onRevealed={handleCardRevealed}>
            <p
              className="font-heading absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ fontSize: 'clamp(1.2rem, 4vw, 2rem)', color: '#3D1010', lineHeight: 1 }}
            >
              15
            </p>
          </ScratchCard>

          {/* Card 2 — Month */}
          <ScratchCard label="Month" onRevealed={handleCardRevealed}>
            <p
              className="font-heading absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ fontSize: 'clamp(1.2rem, 4vw, 2rem)', color: '#3D1010', lineHeight: 1.1 }}
            >
              Dec
            </p>
          </ScratchCard>

          {/* Card 3 — Year */}
          <ScratchCard label="Year" onRevealed={handleCardRevealed}>
            <p
              className="font-heading absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{ fontSize: 'clamp(1.2rem, 4vw, 2rem)', color: '#3D1010', lineHeight: 1 }}
            >
              2026
            </p>
          </ScratchCard>
        </motion.div>

        {/* All-revealed blessing */}
        <AnimatePresence>
          {allRevealed && (
            <motion.div
              key="blessing"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              style={{ marginTop: '1.75rem', textAlign: 'center' }}
            >
              <p className="font-heading text-xl md:text-4xl" style={{ color: '#4A0F0F', fontStyle: 'italic' }}>
                We're getting married!
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Marigold-petal confetti burst */}
        <AnimatePresence>
          {allRevealed && confettiParticles.map(p => (
            <motion.div
              key={p.id}
              initial={{ y: '-5vh', x: `${p.x}vw`, opacity: 1, rotate: 0 }}
              animate={{
                y: '110vh',
                opacity: 0,
                rotate: p.rotate,
              }}
              transition={{ duration: p.duration, delay: p.delay, ease: 'easeIn' }}
              style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                borderRadius: p.isCircle ? '50%' : '2px',
                pointerEvents: 'none',
                zIndex: 50,
              }}
            />
          ))}
        </AnimatePresence>
      </section>
    </>
  );
};

export default ScratchReveal;
