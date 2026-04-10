import { motion } from 'framer-motion';

type Variant = 'zigzag' | 'wave' | 'floral' | 'torn' | 'dots';

const OrnamentalDivider = ({ variant = 'floral' }: { variant?: Variant }) => {
  const dividers: Record<Variant, JSX.Element> = {
    zigzag: (
      <svg viewBox="0 0 1200 40" className="w-full h-8" preserveAspectRatio="none">
        <path
          d="M0 20 L40 5 L80 20 L120 5 L160 20 L200 5 L240 20 L280 5 L320 20 L360 5 L400 20 L440 5 L480 20 L520 5 L560 20 L600 5 L640 20 L680 5 L720 20 L760 5 L800 20 L840 5 L880 20 L920 5 L960 20 L1000 5 L1040 20 L1080 5 L1120 20 L1160 5 L1200 20"
          fill="none" stroke="hsl(var(--gold))" strokeWidth="1.5" opacity="0.4"
        />
        <path
          d="M0 25 L40 35 L80 25 L120 35 L160 25 L200 35 L240 25 L280 35 L320 25 L360 35 L400 25 L440 35 L480 25 L520 35 L560 25 L600 35 L640 25 L680 35 L720 25 L760 35 L800 25 L840 35 L880 25 L920 35 L960 25 L1000 35 L1040 25 L1080 35 L1120 25 L1160 35 L1200 25"
          fill="none" stroke="hsl(var(--gold))" strokeWidth="1" opacity="0.25"
        />
      </svg>
    ),
    wave: (
      <svg viewBox="0 0 1200 60" className="w-full h-10" preserveAspectRatio="none">
        <path
          d="M0 30 Q150 0 300 30 Q450 60 600 30 Q750 0 900 30 Q1050 60 1200 30"
          fill="none" stroke="hsl(var(--gold))" strokeWidth="1.5" opacity="0.4"
        />
        <path
          d="M0 35 Q150 5 300 35 Q450 65 600 35 Q750 5 900 35 Q1050 65 1200 35"
          fill="none" stroke="hsl(var(--gold))" strokeWidth="0.8" opacity="0.2"
        />
      </svg>
    ),
    floral: (
      <div className="flex items-center justify-center gap-4 py-2">
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-primary/30 to-primary/30" />
        <svg viewBox="0 0 60 60" className="w-10 h-10 flex-shrink-0" fill="none">
          {[0, 60, 120, 180, 240, 300].map(angle => (
            <ellipse
              key={angle} cx="30" cy="30" rx="12" ry="5"
              stroke="hsl(var(--gold))" strokeWidth="1" opacity="0.5"
              transform={`rotate(${angle} 30 30)`}
            />
          ))}
          <circle cx="30" cy="30" r="4" fill="hsl(var(--gold))" opacity="0.4" />
        </svg>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-primary/30 to-primary/30" />
      </div>
    ),
    torn: (
      <svg viewBox="0 0 1200 30" className="w-full h-6" preserveAspectRatio="none">
        <path
          d="M0 15 C50 0, 100 25, 150 10 C200 0, 250 20, 300 12 C350 5, 400 22, 450 8 C500 0, 550 18, 600 14 C650 5, 700 25, 750 10 C800 0, 850 20, 900 12 C950 5, 1000 22, 1050 8 C1100 0, 1150 18, 1200 14"
          fill="none" stroke="hsl(var(--gold))" strokeWidth="1.5" opacity="0.35"
        />
      </svg>
    ),
    dots: (
      <div className="flex items-center justify-center gap-3 py-4">
        {Array.from({ length: 7 }).map((_, i) => (
          <div
            key={i}
            className="rounded-full bg-primary"
            style={{
              width: i === 3 ? 8 : 4,
              height: i === 3 ? 8 : 4,
              opacity: i === 3 ? 0.5 : 0.25,
            }}
          />
        ))}
      </div>
    ),
  };

  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      whileInView={{ opacity: 1, scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className="max-w-4xl mx-auto px-8"
    >
      {dividers[variant]}
    </motion.div>
  );
};

export default OrnamentalDivider;
