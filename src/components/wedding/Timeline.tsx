import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';

const GOLD = 'hsl(42, 52%, 54%)';
const GOLD_LIGHT = 'hsl(43, 60%, 70%)';
const BURGUNDY = 'hsl(348, 72%, 32%)';
const CREAM = 'hsl(43, 87%, 94%)';

interface TimelineEvent {
  title: string;
  time: string;
  venue: string;
  description: string;
  iconType: string;
  globalIndex: number;
}

interface DayGroup {
  day: string;
  date: string;
  events: TimelineEvent[];
}

const dayGroups: DayGroup[] = [
  {
    day: 'Day One',
    date: '13th December 2026',
    events: [
      {
        title: 'Haldi Ceremony',
        time: '10:00 AM',
        venue: 'Family Residence',
        description:
          'A vibrant celebration where turmeric paste is applied to the couple, symbolizing purification and blessings for the journey ahead.',
        iconType: 'haldi',
        globalIndex: 0,
      },
      {
        title: 'Mehndi Night',
        time: '6:00 PM',
        venue: 'Summer Palace — Lotus Garden',
        description:
          'An enchanting evening of intricate henna artistry, music, and dance as we adorn the bride with beautiful mehndi designs.',
        iconType: 'mehndi',
        globalIndex: 1,
      },
    ],
  },
  {
    day: 'Day Two',
    date: '14th December 2026',
    events: [
      {
        title: 'Sangeet & Cocktails',
        time: '7:00 PM',
        venue: 'Summer Palace — Grand Ballroom',
        description:
          'A glittering night of performances, music, and celebration as both families come together to dance the night away.',
        iconType: 'sangeet',
        globalIndex: 2,
      },
    ],
  },
  {
    day: 'Day Three',
    date: '15th December 2026',
    events: [
      {
        title: 'Baraat Procession',
        time: '9:00 AM',
        venue: 'Summer Palace — Main Entrance',
        description:
          "The groom's grand arrival with a joyous procession of music, dance, and celebration leading to the wedding venue.",
        iconType: 'baraat',
        globalIndex: 3,
      },
      {
        title: 'Wedding Ceremony',
        time: '11:00 AM',
        venue: 'Summer Palace — Sacred Mandap',
        description:
          'The sacred union under the mandap, where vows are exchanged around the holy fire in the presence of loved ones.',
        iconType: 'ceremony',
        globalIndex: 4,
      },
      {
        title: 'Grand Reception',
        time: '7:00 PM',
        venue: 'Summer Palace — Crystal Hall',
        description:
          'An elegant evening reception with dinner, toasts, and dancing as we celebrate the newly married couple.',
        iconType: 'reception',
        globalIndex: 5,
      },
    ],
  },
];

/* ─── Ceremony Icons ─── */
const CeremonyIcon = ({ type, size = 48 }: { type: string; size?: number }) => {
  const c = size / 2;
  switch (type) {
    case 'haldi':
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
          {[...Array(12)].map((_, i) => (
            <ellipse
              key={i}
              cx={c} cy={c * 0.48} rx={c * 0.12} ry={c * 0.44}
              fill={GOLD} opacity="0.55"
              transform={`rotate(${i * 30} ${c} ${c})`}
            />
          ))}
          <circle cx={c} cy={c} r={c * 0.37} fill={GOLD} />
          <circle cx={c} cy={c} r={c * 0.22} fill={GOLD_LIGHT} opacity="0.9" />
          <circle cx={c} cy={c} r={c * 0.1} fill={CREAM} opacity="0.95" />
        </svg>
      );
    case 'mehndi':
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
          <circle cx={c} cy={c} r={c * 0.88} stroke={GOLD} strokeWidth="1" fill="none" opacity="0.3" />
          <circle cx={c} cy={c} r={c * 0.62} stroke={GOLD} strokeWidth="1.5" fill="none" opacity="0.6" />
          <circle cx={c} cy={c} r={c * 0.28} fill={GOLD} opacity="0.85" />
          <circle cx={c} cy={c} r={c * 0.13} fill={CREAM} opacity="0.9" />
          {[...Array(8)].map((_, i) => {
            const a = (i * 45 * Math.PI) / 180;
            const r = c * 0.62;
            return (
              <circle key={i}
                cx={c + r * Math.cos(a)} cy={c + r * Math.sin(a)}
                r={c * 0.1} fill={GOLD} opacity="0.75"
              />
            );
          })}
          {[...Array(8)].map((_, i) => {
            const a = ((i * 45 + 22.5) * Math.PI) / 180;
            return (
              <line key={i}
                x1={c + c * 0.38 * Math.cos(a)} y1={c + c * 0.38 * Math.sin(a)}
                x2={c + c * 0.62 * Math.cos(a)} y2={c + c * 0.62 * Math.sin(a)}
                stroke={GOLD} strokeWidth="1" opacity="0.4"
              />
            );
          })}
        </svg>
      );
    case 'sangeet':
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
          <path
            d={`M${c * 0.68} ${c * 1.58} L${c * 0.68} ${c * 0.72} L${c * 1.56} ${c * 0.52} L${c * 1.56} ${c * 1.36}`}
            stroke={GOLD} strokeWidth={size * 0.045} strokeLinecap="round" strokeLinejoin="round"
          />
          <circle cx={c * 0.53} cy={c * 1.58} r={c * 0.22} fill={GOLD} />
          <circle cx={c * 1.42} cy={c * 1.36} r={c * 0.22} fill={GOLD} />
          <circle cx={c * 1.72} cy={c * 0.32} r={c * 0.12} fill={GOLD} opacity="0.6" />
          <circle cx={c * 1.88} cy={c * 0.72} r={c * 0.09} fill={GOLD} opacity="0.45" />
          <circle cx={c * 0.38} cy={c * 0.55} r={c * 0.1} fill={GOLD} opacity="0.5" />
          <circle cx={c * 0.22} cy={c * 0.85} r={c * 0.07} fill={GOLD} opacity="0.35" />
        </svg>
      );
    case 'baraat':
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
          <path
            d={`M${c * 0.28} ${c * 1.48} L${c * 0.28} ${c * 0.9} L${c * 0.64} ${c * 1.12} L${c} ${c * 0.52} L${c * 1.36} ${c * 1.12} L${c * 1.72} ${c * 0.9} L${c * 1.72} ${c * 1.48} Z`}
            fill={GOLD} opacity="0.72"
          />
          <rect x={c * 0.16} y={c * 1.48} width={c * 1.68} height={c * 0.22} rx={c * 0.11} fill={GOLD} opacity="0.52" />
          <circle cx={c * 0.28} cy={c * 0.82} r={c * 0.19} fill={GOLD} />
          <circle cx={c} cy={c * 0.44} r={c * 0.19} fill={GOLD} />
          <circle cx={c * 1.72} cy={c * 0.82} r={c * 0.19} fill={GOLD} />
          <circle cx={c * 0.63} cy={c * 1.22} r={c * 0.1} fill={CREAM} opacity="0.8" />
          <circle cx={c} cy={c * 1.12} r={c * 0.1} fill={CREAM} opacity="0.8" />
          <circle cx={c * 1.37} cy={c * 1.22} r={c * 0.1} fill={CREAM} opacity="0.8" />
        </svg>
      );
    case 'ceremony':
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
          <path
            d={`M${c} ${c * 1.88} C${c * 0.5} ${c * 1.88} ${c * 0.28} ${c * 1.5} ${c * 0.28} ${c * 1.1} C${c * 0.28} ${c * 0.58} ${c * 0.62} ${c * 0.3} ${c} ${c * 0.08} C${c} ${c * 0.44} ${c * 1.18} ${c * 0.52} ${c * 1.18} ${c * 0.76} C${c * 1.38} ${c * 0.52} ${c * 1.32} ${c * 0.3} ${c * 1.32} ${c * 0.3} C${c * 1.65} ${c * 0.58} ${c * 1.72} ${c * 0.85} ${c * 1.72} ${c * 1.1} C${c * 1.72} ${c * 1.5} ${c * 1.5} ${c * 1.88} ${c} ${c * 1.88} Z`}
            fill={BURGUNDY} opacity="0.52"
          />
          <path
            d={`M${c} ${c * 1.72} C${c * 0.62} ${c * 1.72} ${c * 0.52} ${c * 1.42} ${c * 0.52} ${c * 1.1} C${c * 0.52} ${c * 0.78} ${c * 0.68} ${c * 0.58} ${c} ${c * 0.32} C${c} ${c * 0.66} ${c * 1.12} ${c * 0.72} ${c * 1.12} ${c * 0.92} C${c * 1.22} ${c * 0.72} ${c * 1.18} ${c * 0.52} ${c * 1.18} ${c * 0.52} C${c * 1.42} ${c * 0.72} ${c * 1.48} ${c * 0.92} ${c * 1.48} ${c * 1.1} C${c * 1.48} ${c * 1.42} ${c * 1.38} ${c * 1.72} ${c} ${c * 1.72} Z`}
            fill={GOLD} opacity="0.88"
          />
          <ellipse cx={c} cy={c * 1.18} rx={c * 0.22} ry={c * 0.28} fill={CREAM} opacity="0.65" />
        </svg>
      );
    case 'reception':
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
          <path
            d={`M${c * 0.72} ${c * 1.78} L${c * 1.28} ${c * 1.78} L${c * 1.16} ${c} Q${c * 1.36} ${c * 0.64} ${c * 1.36} ${c * 0.38} L${c * 0.64} ${c * 0.38} Q${c * 0.64} ${c * 0.64} ${c * 0.84} ${c} Z`}
            fill={GOLD} opacity="0.2"
          />
          <path
            d={`M${c * 0.72} ${c * 1.78} L${c * 1.28} ${c * 1.78} L${c * 1.16} ${c} Q${c * 1.36} ${c * 0.64} ${c * 1.36} ${c * 0.38} L${c * 0.64} ${c * 0.38} Q${c * 0.64} ${c * 0.64} ${c * 0.84} ${c} Z`}
            stroke={GOLD} strokeWidth="1.5" fill="none"
          />
          <line x1={c * 0.64} y1={c * 0.38} x2={c * 1.36} y2={c * 0.38} stroke={GOLD} strokeWidth="1.5" strokeLinecap="round" />
          <line x1={c * 0.72} y1={c * 1.78} x2={c * 1.28} y2={c * 1.78} stroke={GOLD} strokeWidth="2.5" strokeLinecap="round" />
          <circle cx={c * 0.38} cy={c * 0.44} r={c * 0.12} fill={GOLD} opacity="0.65" />
          <circle cx={c * 1.66} cy={c * 0.33} r={c * 0.1} fill={GOLD} opacity="0.7" />
          <circle cx={c * 0.28} cy={c} r={c * 0.08} fill={GOLD} opacity="0.5" />
          <circle cx={c * 1.74} cy={c * 0.84} r={c * 0.1} fill={GOLD} opacity="0.6" />
          <path d={`M${c * 1.52} ${c * 1.22} L${c * 1.57} ${c * 1.1} L${c * 1.62} ${c * 1.22} Z`} fill={GOLD} opacity="0.55" />
          <path d={`M${c * 0.34} ${c * 0.7} L${c * 0.39} ${c * 0.58} L${c * 0.44} ${c * 0.7} Z`} fill={GOLD} opacity="0.55" />
        </svg>
      );
    default:
      return null;
  }
};

/* ─── Day Banner ─── */
const DayDivider = ({ day, date }: { day: string; date: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-30px' }}
    transition={{ duration: 0.7 }}
    className="relative flex items-center justify-center w-full my-12 md:my-16 z-10"
  >
    <div className="flex flex-col items-center gap-1.5">
      {/* Top rule with star */}
      <div className="flex items-center gap-4" style={{ minWidth: 'min(88vw, 460px)' }}>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[hsl(42,52%,54%,0.65)]" />
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" className="flex-shrink-0">
          <path
            d="M11 1 L13.4 7.9 L21 7.9 L14.8 12.4 L17.2 19.2 L11 14.7 L4.8 19.2 L7.2 12.4 L1 7.9 L8.6 7.9 Z"
            fill={GOLD} opacity="0.82"
          />
        </svg>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[hsl(42,52%,54%,0.65)]" />
      </div>

      <p className="font-heading text-2xl md:text-3xl text-foreground tracking-wide mt-0.5">{day}</p>
      <p className="font-body text-xs md:text-sm tracking-[0.28em] uppercase text-primary/80">{date}</p>

      {/* Bottom rule with leaf */}
      <div className="flex items-center gap-4 mt-0.5" style={{ minWidth: 'min(88vw, 460px)' }}>
        <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[hsl(42,52%,54%,0.5)]" />
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="flex-shrink-0">
          <path d="M6 0 C8.5 3 12 3 12 6 C12 9 8.5 9 6 12 C3.5 9 0 9 0 6 C0 3 3.5 3 6 0Z" fill={GOLD} opacity="0.6" />
        </svg>
        <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[hsl(42,52%,54%,0.5)]" />
      </div>
    </div>
  </motion.div>
);

/* ─── Center-line node ─── */
const TimelineNode = ({ inView }: { inView: boolean }) => (
  <motion.div
    initial={{ scale: 0 }}
    whileInView={{ scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.4, type: 'spring', stiffness: 220 }}
    className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-8 -translate-y-1/2 w-11 h-11 z-10 items-center justify-center"
  >
    <div className="relative flex items-center justify-center">
      {inView && (
        <motion.div
          className="absolute rounded-full border border-[hsl(42,52%,54%)]"
          style={{ width: 44, height: 44 }}
          animate={{ scale: [1, 1.9, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}
      <div
        className={`w-11 h-11 rounded-full bg-background border-2 border-[hsl(42,52%,54%)] flex items-center justify-center transition-shadow duration-500 ${
          inView ? 'shadow-[0_0_14px_hsl(42,52%,54%,0.35)]' : ''
        }`}
      >
        <motion.div
          animate={{ scale: inView ? 1 : 0, opacity: inView ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          className="w-[18px] h-[18px] rounded-full bg-[hsl(42,52%,54%)]"
        />
      </div>
    </div>
  </motion.div>
);

/* ─── Event Card ─── */
const TimelineCard = ({ event }: { event: TimelineEvent }) => {
  const isLeft = event.globalIndex % 2 === 0;
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: false, margin: '-80px' });

  return (
    <div
      ref={cardRef}
      className={`relative flex w-full mb-10 md:mb-14 items-start ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}
    >
      <TimelineNode inView={inView} />

      {/* Connector arm (desktop) */}
      <div
        className={`hidden md:block absolute top-8 -translate-y-1/2 h-px w-[6%] ${
          isLeft
            ? 'left-[44%] bg-gradient-to-r from-[hsl(42,52%,54%,0.7)] to-transparent'
            : 'right-[44%] bg-gradient-to-l from-[hsl(42,52%,54%,0.7)] to-transparent'
        }`}
      />

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -55 : 55 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.72, ease: [0.25, 0.46, 0.45, 0.94] }}
        className={`w-full md:w-[44%] ${isLeft ? 'md:pr-10' : 'md:pl-10'}`}
      >
        {/* Mobile: icon + title above card */}
        <div className="flex items-center gap-3 mb-2 md:hidden">
          <CeremonyIcon type={event.iconType} size={30} />
          <h3 className="font-heading text-xl text-foreground">{event.title}</h3>
        </div>

        <div className="group relative bg-card rounded-2xl overflow-hidden border border-[hsl(42,52%,54%,0.18)] shadow-md hover:shadow-[0_8px_32px_hsl(42,52%,54%,0.18)] transition-all duration-500 hover:-translate-y-1">
          {/* Gold accent bar */}
          <div className="h-[3px] bg-gradient-to-r from-[hsl(42,52%,54%,0.3)] via-[hsl(42,52%,54%)] to-[hsl(42,52%,54%,0.3)]" />

          <div className="p-6 md:p-7 relative">
            {/* Watermark icon */}
            <div className="absolute top-5 right-5 opacity-[0.12] group-hover:opacity-[0.22] transition-opacity duration-500 pointer-events-none select-none">
              <CeremonyIcon type={event.iconType} size={54} />
            </div>

            {/* Time — primary visual */}
            <div className="mb-3">
              <span className="font-body text-[2rem] md:text-[2.25rem] leading-none tracking-wider text-[hsl(42,52%,54%)] font-semibold">
                {event.time}
              </span>
            </div>

            {/* Ornamental rule */}
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px flex-1 bg-[hsl(42,52%,54%,0.22)]" />
              <svg width="14" height="7" viewBox="0 0 14 7">
                <path d="M7 0 L9 2.5 L14 3.5 L9 4.5 L7 7 L5 4.5 L0 3.5 L5 2.5 Z" fill={GOLD} opacity="0.48" />
              </svg>
              <div className="h-px flex-1 bg-[hsl(42,52%,54%,0.22)]" />
            </div>

            {/* Title (desktop) */}
            <h3 className="hidden md:block font-heading text-xl md:text-2xl text-foreground mb-3 pr-14 leading-snug">
              {event.title}
            </h3>

            {/* Venue */}
            <div className="flex items-start gap-2 mb-4">
              <svg width="13" height="14" viewBox="0 0 24 26" fill="none" className="flex-shrink-0 mt-0.5">
                <path
                  d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
                  fill={GOLD} opacity="0.7"
                />
                <circle cx="12" cy="9" r="2.5" fill={CREAM} opacity="0.95" />
              </svg>
              <p className="font-body text-sm text-muted-foreground tracking-wide leading-snug">
                {event.venue}
              </p>
            </div>

            {/* Description */}
            <p className="font-body text-[15px] md:text-base text-muted-foreground leading-relaxed">
              {event.description}
            </p>

            {/* Bottom ornament */}
            <div className="flex items-center justify-center gap-3 mt-5 pt-4 border-t border-[hsl(42,52%,54%,0.1)]">
              <div className="h-px w-10 bg-[hsl(42,52%,54%,0.2)]" />
              <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                <path d="M4.5 0 C6 2.25 9 2.25 9 4.5 C9 6.75 6 6.75 4.5 9 C3 6.75 0 6.75 0 4.5 C0 2.25 3 2.25 4.5 0Z" fill={GOLD} opacity="0.45" />
              </svg>
              <div className="h-px w-10 bg-[hsl(42,52%,54%,0.2)]" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

/* ─── Timeline Section ─── */
const Timeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });
  const vineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <section
      ref={containerRef}
      className="py-24 md:py-32 px-4 relative overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, hsl(40,50%,88%) 0%, hsl(43,87%,94%) 35%, hsl(43,87%,94%) 65%, hsl(40,50%,88%) 100%)',
      }}
    >
      {/* Subtle center radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 50%, hsl(42,52%,54%,0.05) 0%, transparent 68%)',
        }}
      />

      <div className="max-w-5xl mx-auto relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-body text-base md:text-lg text-muted-foreground tracking-[0.3em] uppercase mb-3"
          >
            The Celebrations
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="flex items-center justify-center gap-3 mb-4"
          >
            <div className="h-px w-14 bg-gradient-to-r from-transparent to-[hsl(42,52%,54%,0.6)]" />
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M9 2 C11 5.5 16 5.5 16 9 C16 12.5 11 12.5 9 16 C7 12.5 2 12.5 2 9 C2 5.5 7 5.5 9 2Z"
                fill={GOLD} opacity="0.68"
              />
            </svg>
            <div className="h-px w-14 bg-gradient-to-l from-transparent to-[hsl(42,52%,54%,0.6)]" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-heading text-4xl md:text-5xl text-foreground"
          >
            Wedding Schedule
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="w-32 h-px bg-gradient-to-r from-transparent via-[hsl(42,52%,54%)] to-transparent mx-auto mt-6"
          />
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Faint static center line (desktop) */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-[hsl(42,52%,54%,0.12)]" />

          {/* Animated scroll-fill vine */}
          <motion.div
            className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 w-px bg-gradient-to-b from-[hsl(42,52%,54%,0.55)] via-[hsl(42,52%,54%,0.35)] to-[hsl(42,52%,54%,0.55)] origin-top"
            style={{ height: vineHeight }}
          />

          {dayGroups.map((group) => (
            <div key={group.day}>
              <DayDivider day={group.day} date={group.date} />
              {group.events.map((event) => (
                <TimelineCard key={event.title} event={event} />
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Timeline;
