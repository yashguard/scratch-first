import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';

// ── Detail card data ──────────────────────────────────────────────────────────
const DETAILS = [
  {
    label: 'Venue',
    title: 'Summer Palace',
    detail: 'Vesu, Surat, Gujarat 395007',
  },
  {
    label: 'Date',
    title: 'December 15, 2026',
    detail: 'Monday · Shubh Muhurat',
  },
  {
    label: 'Time',
    title: '10:00 AM Onwards',
    detail: 'Ceremony & Celebrations',
  },
];

const MAPS_URL =
  'https://www.google.com/maps/place/Summer+Palace/@21.085763,72.718192,507m/data=!3m1!1e3!4m6!3m5!1s0x3be0532e4a01a64f:0x19e8cd4aaa84508f!8m2!3d21.085763!4d72.718192!16s%2Fg%2F1ptz6zxt8?hl=en&entry=ttu&g_ep=EgoyMDI2MDQxNS4wIKXMDSoASAFQAw%3D%3D';

// ── Component ─────────────────────────────────────────────────────────────────
const VenueSection = () => {
  return (
    <section
      className="relative py-24 md:py-32 px-4 overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #2D0808 0%, #4A1010 50%, #3A0C0C 100%)',
      }}
    >
      {/* Mehndi dot texture */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.04,
          backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          pointerEvents: 'none',
        }}
      />

      {/* Mandala backdrop */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.05]">
        <svg viewBox="0 0 400 400" className="w-[60vmin] h-[60vmin]">
          {[...Array(8)].map((_, i) => (
            <rect
              key={i}
              x="150" y="150" width="100" height="100" rx="10"
              fill="none" stroke="#D4AF37" strokeWidth="0.5"
              transform={`rotate(${i * 22.5} 200 200)`}
            />
          ))}
        </svg>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">

        {/* ── Section title ─────────────────────────────────────────────────── */}
        <div className="text-center">
          <SectionTitle
            label="Vivah Sthal"
            heading="Our Venue"
            description="Join us at this magnificent palace where timeless elegance meets the grandeur of celebration"
            dark={true}
          />
        </div>

        {/* ── Venue illustration in parchment frame ─────────────────────────── */}
        {/* ── Venue illustration — floats directly on dark bg via screen blend ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.9 }}
          className="mb-10 md:mb-14"
        >
          <img
            src="/assets/venue-illustration.png"
            alt="Summer Palace — Our Wedding Venue"
            style={{
              width: '100%',
              maxWidth: '860px',
              height: 'auto',
              display: 'block',
              margin: '0 auto',
              objectFit: 'contain',
              // screen blend: black pixels become transparent,
              // white line art floats on the maroon section background
              mixBlendMode: 'screen',
              opacity: 0.82,
            }}
          />
        </motion.div>

        {/* ── Three detail cards ────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-10">
          {DETAILS.map(({ label, title, detail }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45 + i * 0.1 }}
              className="text-center"
              style={{
                padding: '1.5rem 1rem',
                border: '1px solid rgba(212,175,55,0.12)',
                borderRadius: '8px',
                background: 'rgba(212,175,55,0.04)',
              }}
            >
              {/* Card label */}
              <p
                className="font-body text-xs uppercase mb-2"
                style={{ letterSpacing: '0.3em', color: 'rgba(212,175,55,0.65)' }}
              >
                {label}
              </p>

              {/* Thin separator */}
              <div
                style={{
                  width: '2rem',
                  height: '1px',
                  background: 'rgba(212,175,55,0.25)',
                  margin: '0 auto 0.75rem',
                }}
              />

              {/* Card title */}
              <p
                className="font-heading mb-1"
                style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', color: '#F5E8D0' }}
              >
                {title}
              </p>

              {/* Card detail */}
              <p
                className="font-body text-xs"
                style={{ color: 'rgba(245,232,208,0.45)', letterSpacing: '0.05em' }}
              >
                {detail}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── Gold ornament divider ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.65, duration: 0.6 }}
          className="flex items-center justify-center gap-4 mb-10"
        >
          <span
            style={{
              flex: 1,
              maxWidth: '6rem',
              height: '1px',
              background: 'rgba(212,175,55,0.25)',
              display: 'block',
            }}
          />
          <span className="font-body text-xs" style={{ color: '#B8860B' }}>✦</span>
          <span
            style={{
              flex: 1,
              maxWidth: '6rem',
              height: '1px',
              background: 'rgba(212,175,55,0.25)',
              display: 'block',
            }}
          />
        </motion.div>

        {/* ── Get Directions button ─────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.75 }}
          className="flex justify-center"
        >
          <a
            href={MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 font-body uppercase"
            style={{
              padding: '0.875rem 2.75rem',
              border: '1px solid rgba(212,175,55,0.45)',
              borderRadius: '100px',
              background: 'rgba(212,175,55,0.07)',
              color: '#D4AF37',
              fontSize: '0.78rem',
              letterSpacing: '0.22em',
              textDecoration: 'none',
              transition: 'background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget;
              el.style.background     = 'rgba(212,175,55,0.16)';
              el.style.borderColor    = 'rgba(212,175,55,0.75)';
              el.style.boxShadow      = '0 0 28px rgba(212,175,55,0.14)';
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget;
              el.style.background     = 'rgba(212,175,55,0.07)';
              el.style.borderColor    = 'rgba(212,175,55,0.45)';
              el.style.boxShadow      = 'none';
            }}
          >
            {/* Map pin icon */}
            <svg
              width="13" height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            Get Directions
            {/* Arrow */}
            <svg
              width="11" height="11"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ transition: 'transform 0.3s ease' }}
              className="group-hover:translate-x-1"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default VenueSection;
