import { motion } from 'framer-motion';

interface SectionTitleProps {
  label: string;
  heading: string;
  description: string;
  className?: string;
  dark?: boolean;
}

const SectionTitle = ({ label, heading, description, className, dark = true }: SectionTitleProps) => {
  const headingColor = dark ? '#F5E8D0' : '#2D0808';
  const descriptionColor = dark ? 'rgba(245,232,208,0.88)' : 'rgba(45,8,8,0.88)';
  const labelColor = dark ? 'rgba(212,175,55,0.85)' : '#7A1F1F';
  const lineColor = '#B8860B';

  return (
    <div className={`text-center ${className}`}>
      {/* Ornament row */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1 }}
        className="flex items-center justify-center gap-3 mb-3"
      >
        <span style={{ flex: 1, maxWidth: '5rem', height: '1px', background: lineColor, display: 'block' }} />
        <span className="font-body text-xs" style={{ color: lineColor }}>✦</span>
        <span style={{ flex: 1, maxWidth: '5rem', height: '1px', background: lineColor, display: 'block' }} />
      </motion.div>

      {/* Section label */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 }}
        className="font-body text-center uppercase"
        style={{ letterSpacing: '0.3em', color: labelColor, marginBottom: '0.5rem', fontSize: 'clamp(0.72rem, 1.1vw, 0.9rem)' }}
      >
        {label}
      </motion.p>

      {/* Main heading */}
      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="font-heading"
        style={{
          fontSize: 'clamp(2rem, 5vw, 3.5rem)',
          color: headingColor,
          marginBottom: '1rem',
        }}
      >
        {heading}
      </motion.h2>

      {/* Sub-description */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="font-body mx-auto"
        style={{
          fontSize: 'clamp(0.95rem, 1.5vw, 1.3rem)',
          color: descriptionColor,
          maxWidth: '36rem',
          marginBottom: '3rem',
        }}
      >
        {description}
      </motion.p>
    </div>
  );
};

export default SectionTitle;
