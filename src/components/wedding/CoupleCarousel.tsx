import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SectionTitle from './SectionTitle';

// ── Constants ────────────────────────────────────────────────────────────────
const CARD_COUNT = 8;
const CARD_WIDTH = 210;   // px
const CARD_HEIGHT = 320;   // px
const CARD_GAP = 48;    // px
const SPEED_DESKTOP = 0.6;   // px per frame at ~60fps
const SPEED_MOBILE = 1.1;   // px per frame at ~60fps
const MOBILE_BREAKPOINT = 768; // px

const GALLERY_PHOTOS = [
  {
    src: '/gallery/pexels-photo-19733687.webp',
    alt: 'Indian wedding couple portrait, Surat',
  },
  {
    src: '/gallery/pexels-photo-36836726.webp',
    alt: 'Indian wedding couple under mandap',
  },
  {
    src: '/gallery/pexels-photo-36098383.webp',
    alt: 'Vibrant Indian wedding couple in traditional attire',
  },
  {
    src: '/gallery/pexels-photo-30171219.webp',
    alt: 'Traditional Indian wedding ceremony portrait',
  },
  {
    src: '/gallery/pexels-photo-19230329.webp',
    alt: 'Bengali couple at Indian wedding ceremony',
  },
  {
    src: '/gallery/pexels-photo-34479834.webp',
    alt: 'Beautiful Indian wedding couple in traditional attire',
  },
  {
    src: '/gallery/pexels-photo-28210870.webp',
    alt: 'Bride and groom in traditional Indian attire',
  },
  {
    src: '/gallery/pexels-photo-7694286.webp',
    alt: 'South Indian couple in traditional wedding attire',
  },
];

const loopedSlides = [...GALLERY_PHOTOS, ...GALLERY_PHOTOS];

// ── Component ────────────────────────────────────────────────────────────────
const CoupleCarousel = () => {
  const reduceMotion = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);
  const offsetRef = useRef(0);
  const rafRef = useRef<number>(0);
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < MOBILE_BREAKPOINT : false
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const animate = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const speed = window.innerWidth < MOBILE_BREAKPOINT ? SPEED_MOBILE : SPEED_DESKTOP;
    offsetRef.current -= speed;

    const singleSetWidth = CARD_COUNT * (CARD_WIDTH + CARD_GAP);
    if (Math.abs(offsetRef.current) >= singleSetWidth) {
      offsetRef.current += singleSetWidth;
    }

    track.style.transform = `translateX(${offsetRef.current}px)`;

    const viewportCenter = window.innerWidth / 2;
    const cards = track.children;
    for (let i = 0; i < cards.length; i++) {
      const card = cards[i] as HTMLElement;
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const distFromCenter = (cardCenter - viewportCenter) / viewportCenter;
      const rotateY = distFromCenter * -45;
      const scale = 1 - Math.abs(distFromCenter) * 0.12;
      card.style.transform = `perspective(800px) rotateY(${rotateY}deg) scale(${scale})`;
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [animate, reduceMotion]);

  return (
    <section
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #FAF3E0 0%, #F0E6C8 50%, #FAF3E0 100%)',
      }}
    >
      {/* Mehndi dot texture overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.06,
          backgroundImage: 'radial-gradient(circle, #B8860B 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          pointerEvents: 'none',
        }}
      />

      {/* Section title */}
      <div className="max-w-4xl mx-auto text-center px-4 relative z-10">
        <SectionTitle
          label="Yadein"
          heading="Our Gallery"
          description="Glimpses of the moments that brought us here"
          dark={false}
        />
      </div>

      {/* Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 overflow-hidden"
        style={{ height: CARD_HEIGHT }}
        aria-label="Scrolling gallery of wedding moments"
      >
        <div
          ref={trackRef}
          className="flex will-change-transform"
          style={{ gap: `${CARD_GAP}px`, paddingLeft: '40px', height: '100%', alignItems: 'center' }}
        >
          {loopedSlides.map((photo, i) => (
            <div
              key={`${photo.alt}-${i}`}
              className="shrink-0 overflow-hidden will-change-transform"
              style={{
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
                borderRadius: 16,
                border: '1px solid rgba(212,175,55,0.22)',
                boxShadow: '0 8px 30px rgba(45,8,8,0.14)',
                background: '#F0E6C8',
              }}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="pointer-events-none h-full w-full object-cover object-top"
                width={CARD_WIDTH}
                height={CARD_HEIGHT}
                loading={i > 8 ? 'lazy' : 'eager'}
                draggable={false}
              />
            </div>
          ))}
        </div>

        {/* Left fade mask */}
        <div
          className="pointer-events-none absolute inset-y-0 left-0 z-20"
          style={{
            width: isMobile ? '60px' : '100px',
            background: 'linear-gradient(to right, #F0E6C8 0%, transparent 100%)',
          }}
        />
        {/* Right fade mask */}
        <div
          className="pointer-events-none absolute inset-y-0 right-0 z-20"
          style={{
            width: isMobile ? '60px' : '100px',
            background: 'linear-gradient(to left, #F0E6C8 0%, transparent 100%)',
          }}
        />
      </motion.div>
    </section>
  );
};

export default CoupleCarousel;
