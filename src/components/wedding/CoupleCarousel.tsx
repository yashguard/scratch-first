import { useEffect, useRef, useState } from 'react';
import SectionTitle from './SectionTitle';

// ── Constants ────────────────────────────────────────────────────────────────
const CARD_COUNT = 8;
const MAX_ANGLE  = 45; // max rotateY at viewport edges (degrees)

// ── Placeholder card icon ────────────────────────────────────────────────────
const PlaceholderIcon = () => (
  <svg viewBox="0 0 80 80" width="40" height="40" style={{ display: 'block', margin: '0 auto 8px' }}>
    <rect x="5" y="5" width="70" height="70" rx="8" fill="none" stroke="rgba(184,134,11,0.4)" strokeWidth="1.5" />
    <circle cx="30" cy="30" r="8" fill="none" stroke="rgba(184,134,11,0.4)" strokeWidth="1" />
    <path d="M5 55 L25 35 L45 50 L55 42 L75 60 L75 75 L5 75Z" fill="rgba(184,134,11,0.1)" />
  </svg>
);

// ── Component ────────────────────────────────────────────────────────────────
const CoupleCarousel = () => {
  // Lazy init reads window immediately — no flash on first render for mobile
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  );

  // All DOM refs — zero React re-renders at 60 fps
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef     = useRef<HTMLDivElement>(null);
  const cardRefs     = useRef<(HTMLDivElement | null)[]>([]);
  const offsetRef    = useRef(0);
  const rafRef       = useRef<number>(0);
  const pausedRef    = useRef(false);

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const cardW     = isMobile ? 140 : 200;
  const cardH     = isMobile ? 196 : 280;
  const gap       = 20;
  const slotWidth = cardW + gap;            // one card + its trailing gap
  const loopWidth = CARD_COUNT * slotWidth; // width of one full card set (seamless reset point)

  // ── rAF animation loop ───────────────────────────────────────────────────
  // Architecture:
  //   • Track slides left continuously; resets every loopWidth px (seamless — doubled cards)
  //   • Per-card rotateY is computed each frame from the card's CURRENT viewport X position
  //   • left-of-center cards → +rotateY (right edge closer) = concave inward ✓
  //   • right-of-center cards → -rotateY (left edge closer) = concave inward ✓
  useEffect(() => {
    const tick = () => {
      if (!pausedRef.current) {
        // Advance scroll and wrap seamlessly
        offsetRef.current = (offsetRef.current + 0.6) % loopWidth;

        // Slide the track
        if (trackRef.current) {
          trackRef.current.style.transform = `translateX(${-offsetRef.current}px)`;
        }

        // Dynamic per-card concave rotation
        const containerWidth = containerRef.current?.offsetWidth ?? window.innerWidth;
        const viewportCenter = containerWidth / 2;

        cardRefs.current.forEach((card, i) => {
          if (!card) return;

          // Card's center X position in the viewport (accounts for current scroll offset)
          const cardCenterInViewport = i * slotWidth + cardW / 2 - offsetRef.current;

          // Distance from viewport center: negative = left of center, positive = right
          const distFromCenter = cardCenterInViewport - viewportCenter;

          // Map to angle: left cards → positive rotateY, right → negative (concave arc)
          const rawAngle = -(distFromCenter / viewportCenter) * MAX_ANGLE;
          const angle    = Math.max(-MAX_ANGLE, Math.min(MAX_ANGLE, rawAngle));

          card.style.transform = `rotateY(${angle}deg)`;
        });
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [cardW, slotWidth, loopWidth]); // restart loop when dimensions change on resize

  // Double the cards for a seamless infinite loop (second set is visually identical to first)
  const cards = Array.from({ length: CARD_COUNT * 2 });

  return (
    <section
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #FAF3E0 0%, #F0E6C8 50%, #FAF3E0 100%)',
      }}
    >
      {/* Mehndi dot texture overlay — gold dots visible on cream bg */}
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

      {/* ── Curved sliding gallery ──────────────────────────────────────────
          Container: perspective creates the 3D depth — closer (center) cards
          appear larger, angled edge cards appear narrower due to rotateY.
          All cards slide together; each card's rotateY updates every frame.
      ─────────────────────────────────────────────────────────────────────── */}
      <div
        ref={containerRef}
        className="relative z-10 h-[300px] md:h-[380px]"
        style={{ overflow: 'hidden', perspective: '1000px' }}
        onMouseEnter={() => { pausedRef.current = true;  }}
        onMouseLeave={() => { pausedRef.current = false; }}
      >
        {/* Sliding track — zero-top origin, centred vertically via marginTop */}
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            gap: `${gap}px`,
            position: 'absolute',
            top: '50%',
            left: 0,
            marginTop: -(cardH / 2),
            transform: 'translateX(0px)', // rAF overrides this every frame
            willChange: 'transform',
          }}
        >
          {cards.map((_, i) => (
            <div
              key={i}
              ref={(el) => { cardRefs.current[i] = el; }}
              style={{
                flex: '0 0 auto',
                width: cardW,
                height: cardH,
                transform: 'rotateY(0deg)', // rAF overrides this every frame
                willChange: 'transform',
                background: 'linear-gradient(135deg, rgba(45,8,8,0.08) 0%, rgba(212,175,55,0.12) 100%)',
                border: '1.5px solid rgba(184,134,11,0.35)',
                borderRadius: 14,
                boxShadow: '0 8px 32px rgba(45,8,8,0.12), 0 2px 8px rgba(212,175,55,0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}
            >
              <div style={{ textAlign: 'center', padding: 16 }}>
                <PlaceholderIcon />
                <p
                  className="font-body text-xs"
                  style={{ color: 'rgba(45,8,8,0.4)' }}
                >
                  Photo {(i % CARD_COUNT) + 1}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoupleCarousel;
