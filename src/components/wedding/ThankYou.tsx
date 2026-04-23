import { motion } from 'framer-motion';

const ThankYou = () => {
  return (
    <footer
      className="relative px-4 overflow-hidden min-h-[100dvh] flex flex-col items-center justify-center"
      style={{
        background: 'linear-gradient(160deg, #FAF3E0 0%, #F0E6C8 50%, #FAF3E0 100%)',
      }}
    >
      {/* Mehndi dot texture */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0, opacity: 0.06, pointerEvents: 'none',
          backgroundImage: 'radial-gradient(circle, #B8860B 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="max-w-2xl mx-auto text-center relative z-10">

        {/* ── Radha-Krishna illustration ─────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1 }}
          style={{ marginBottom: '2rem' }}
        >
          <img
            src="/assets/radha-krishna.webp"
            alt="Radha Krishna — Divine Blessing"
            style={{
              width: 'min(65vw, 300px)',
              height: 'auto',
              display: 'block',
              margin: '0 auto',
              objectFit: 'contain',
              // multiply: white bg blends into cream, illustration stays vivid
              mixBlendMode: 'multiply',
            }}
          />
        </motion.div>

        {/* ── // Shubh Vivah // ──────────────────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="font-heading italic mb-5"
          style={{
            fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
            color: '#7A1F1F',
            letterSpacing: '0.12em',
          }}
        >
          // Shubh Vivah //
        </motion.p>

        {/* ── Thank You heading ─────────────────────────────────────────────── */}
        <motion.h2
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="font-heading mb-6"
          style={{
            fontSize: 'clamp(3rem, 8vw, 5rem)',
            color: '#2D0808',
            lineHeight: 1.1,
          }}
        >
          Thank You
        </motion.h2>

        {/* ── Gold divider ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <span style={{ flex: 1, maxWidth: '6rem', height: '1px', background: 'rgba(184,134,11,0.4)', display: 'block' }} />
          <span className="font-body text-xs" style={{ color: '#B8860B' }}>✦</span>
          <span style={{ flex: 1, maxWidth: '6rem', height: '1px', background: 'rgba(184,134,11,0.4)', display: 'block' }} />
        </motion.div>

        {/* ── For any queries ───────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.55 }}
          style={{ marginBottom: '2rem' }}
        >
          <p
            className="font-body uppercase mb-3"
            style={{ fontSize: 'clamp(0.72rem, 1.1vw, 0.9rem)', letterSpacing: '0.3em', color: '#7A1F1F' }}
          >
            For Any Queries
          </p>
          <p className="font-body" style={{ fontSize: 'clamp(0.95rem, 1.4vw, 1.15rem)', color: 'rgba(45,8,8,0.85)', lineHeight: 1.8 }}>
            Arjun · <a href="tel:+919876543210" className="font-sans tracking-wide">+91 98765 43210</a>
            <br />
            Priya · <a href="tel:+919876543211" className="font-sans tracking-wide">+91 98765 43211</a>
          </p>
        </motion.div>

        {/* ── Gold divider ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.65 }}
          className="flex items-center justify-center gap-4 mb-8"
        >
          <span style={{ flex: 1, maxWidth: '4rem', height: '1px', background: 'rgba(184,134,11,0.65)', display: 'block' }} />
          <span className="font-body text-xs" style={{ color: 'rgba(184,134,11,0.85)' }}>✦</span>
          <span style={{ flex: 1, maxWidth: '4rem', height: '1px', background: 'rgba(184,134,11,0.65)', display: 'block' }} />
        </motion.div>

        {/* ── Sanskrit shloka ───────────────────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.75 }}
          className="font-heading italic"
          style={{
            fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)',
            color: 'rgba(45,8,8,0.82)',
            lineHeight: 1.9,
            maxWidth: '28rem',
            margin: '0 auto',
          }}
        >
          सप्तपदी — सात फेरों का वचन
          <br />
          <span style={{ fontSize: '0.88em', letterSpacing: '0.04em' }}>
            "एक दूजे के साथ, सात जन्मों तक"
          </span>
        </motion.p>

        {/* ── Couple names ──────────────────────────────────────────────────── */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.85 }}
          className="font-heading mt-8"
          style={{
            fontSize: 'clamp(1.4rem, 3.5vw, 2rem)',
            color: '#2D0808',
            letterSpacing: '0.06em',
          }}
        >
          Priya &amp; Arjun
        </motion.p>

      </div>
    </footer>
  );
};

export default ThankYou;
