import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-background px-4">
      {/* Decorative corner ornaments */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
        className="absolute top-8 left-8 w-32 h-32 md:w-48 md:h-48 opacity-30"
      >
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
          <path d="M10 10 Q100 10 100 100 Q100 10 190 10" stroke="hsl(var(--gold))" strokeWidth="1.5" fill="none" />
          <path d="M10 10 Q10 100 100 100 Q10 100 10 190" stroke="hsl(var(--gold))" strokeWidth="1.5" fill="none" />
          <circle cx="100" cy="100" r="30" stroke="hsl(var(--gold))" strokeWidth="1" fill="none" />
          <circle cx="100" cy="100" r="15" stroke="hsl(var(--gold))" strokeWidth="0.5" fill="none" />
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.3, scale: 1 }}
        transition={{ duration: 2, ease: 'easeOut' }}
        className="absolute bottom-8 right-8 w-32 h-32 md:w-48 md:h-48 opacity-30 rotate-180"
      >
        <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
          <path d="M10 10 Q100 10 100 100 Q100 10 190 10" stroke="hsl(var(--gold))" strokeWidth="1.5" fill="none" />
          <path d="M10 10 Q10 100 100 100 Q10 100 10 190" stroke="hsl(var(--gold))" strokeWidth="1.5" fill="none" />
          <circle cx="100" cy="100" r="30" stroke="hsl(var(--gold))" strokeWidth="1" fill="none" />
          <circle cx="100" cy="100" r="15" stroke="hsl(var(--gold))" strokeWidth="0.5" fill="none" />
        </svg>
      </motion.div>

      {/* Mandala backdrop */}
      <motion.div
        initial={{ opacity: 0, rotate: -180, scale: 0.3 }}
        animate={{ opacity: 0.08, rotate: 0, scale: 1 }}
        transition={{ duration: 3, ease: 'easeOut' }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <svg viewBox="0 0 500 500" className="w-[80vmin] h-[80vmin]">
          {[...Array(12)].map((_, i) => (
            <ellipse
              key={i}
              cx="250" cy="250" rx="200" ry="80"
              fill="none" stroke="hsl(var(--gold))" strokeWidth="0.8"
              transform={`rotate(${i * 15} 250 250)`}
            />
          ))}
          <circle cx="250" cy="250" r="100" fill="none" stroke="hsl(var(--gold))" strokeWidth="1" />
          <circle cx="250" cy="250" r="50" fill="none" stroke="hsl(var(--gold))" strokeWidth="0.5" />
        </svg>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-body text-lg md:text-xl text-muted-foreground tracking-[0.3em] uppercase mb-6"
        >
          Together with their families
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        >
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl text-foreground leading-tight">
            Priya
          </h1>
          <motion.p
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="font-heading text-3xl md:text-4xl text-primary italic my-2"
          >
            &
          </motion.p>
          <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl text-foreground leading-tight">
            Arjun
          </h1>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.5, delay: 2 }}
          className="w-48 h-[1px] bg-primary mx-auto my-8"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.3 }}
          className="font-body text-xl md:text-2xl text-muted-foreground tracking-wider"
        >
          Request the honour of your presence
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.6 }}
          className="font-body text-lg text-muted-foreground mt-2 tracking-wider"
        >
          at the celebration of their marriage
        </motion.p>
      </div>
    </section>
  );
};

export default HeroSection;
