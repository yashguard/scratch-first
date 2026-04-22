import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';
import { useCountdown } from '@/hooks/useCountdown';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const WEDDING_DATE = new Date('2026-12-15T10:00:00');

const CircleUnit = ({ value, label, max, delay }: { value: number; label: string; max: number; delay: number }) => {
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / max) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay }}
      viewport={{ once: true }}
      className="flex flex-col items-center"
    >
      {/* Ring with thin gold outer border */}
      <div
        className="relative w-28 h-28 md:w-36 md:h-36"
        style={{
          border: '1px solid rgba(212,175,55,0.2)',
          borderRadius: '50%',
        }}
      >
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          {/* Track ring */}
          <circle
            cx="60" cy="60" r={radius}
            fill="none"
            stroke="rgba(245,232,208,0.1)"
            strokeWidth="3.5"
          />
          {/* Progress ring */}
          <circle
            cx="60" cy="60" r={radius}
            fill="none"
            stroke="#D4AF37"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        {/* Number */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="font-heading"
            style={{
              fontSize: 'clamp(1.6rem, 4vw, 2.2rem)',
              color: '#F5E8D0',
              lineHeight: 1,
            }}
          >
            {value}
          </span>
        </div>
      </div>

      {/* Unit label */}
      <p
        className="font-body uppercase mt-3 text-xs"
        style={{ letterSpacing: '0.25em', color: 'rgba(212,175,55,0.8)' }}
      >
        {label}
      </p>
    </motion.div>
  );
};

const CountdownTimer = () => {
  const { days, hours, minutes, seconds } = useCountdown(WEDDING_DATE);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-32 px-4 overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #2D0808 0%, #4A1010 50%, #3A0C0C 100%)',
      }}
    >
      {/* Mehndi gold dot texture overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.04,
          backgroundImage:
            'radial-gradient(circle, #D4AF37 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          pointerEvents: 'none',
        }}
      />

      {/* Mandala backdrop — slightly more visible on dark bg */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.07]">
        <svg viewBox="0 0 400 400" className="w-[60vmin] h-[60vmin]">
          {[...Array(8)].map((_, i) => (
            <rect
              key={i} x="150" y="150" width="100" height="100" rx="10"
              fill="none" stroke="#D4AF37" strokeWidth="0.5"
              transform={`rotate(${i * 22.5} 200 200)`}
            />
          ))}
        </svg>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">

        <SectionTitle
          label="Shubh Muhurat"
          heading="Our Sacred Countdown"
          description="Every moment that passes brings us closer to our eternal union"
          dark={true}
        />

        {/* ── Countdown rings ─────────────────────────────────────────────── */}
        {isInView && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
            <CircleUnit value={days} label="Days" max={365} delay={0.2} />
            <CircleUnit value={hours} label="Hours" max={24} delay={0.4} />
            <CircleUnit value={minutes} label="Minutes" max={60} delay={0.6} />
            <CircleUnit value={seconds} label="Seconds" max={60} delay={0.8} />
          </div>
        )}

      </div>

      {/* ── Diya decorative divider ──────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 1.5 }}
        style={{
          justifyContent: 'center',
          marginTop: 'clamp(2rem, 5vw, 3.5rem)',
        }}
        // className='hidden md:flex'
        className='hidden'
      >
        <img
          src="/assets/diya-divider.webp"
          alt="decorative diyas"
          style={{
            width: 'min(88vw, 680px)',
            height: 'auto',
            display: 'block',
            filter: 'drop-shadow(0 0 18px rgba(212,175,55,0.35))',
          }}
        />
      </motion.div>
    </section>
  );
};

export default CountdownTimer;
