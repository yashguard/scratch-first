import { motion } from 'framer-motion';
import SectionTitle from './SectionTitle';

const GOLD = 'hsl(42, 52%, 54%)';
const GOLD_LIGHT = 'hsl(43, 60%, 70%)';
const BURGUNDY = 'hsl(348, 72%, 32%)';
const CREAM = 'hsl(43, 87%, 94%)';

const ICON_COLORS = {
  haldi:    { bg: '#FEF3C7', primary: '#D97706', secondary: '#FCD34D', accent: '#92400E' },
  mehndi:   { bg: '#FCE7F3', primary: '#9D174D', secondary: '#F9A8D4', accent: '#6B21A8' },
  sangeet:  { bg: '#EDE9FE', primary: '#7C3AED', secondary: '#C4B5FD', accent: '#EC4899' },
  baraat:   { bg: '#DBEAFE', primary: '#1D4ED8', secondary: '#93C5FD', accent: '#D4AF37' },
  ceremony: { bg: '#FFF7ED', primary: '#C2410C', secondary: '#FB923C', accent: '#7C2020' },
  reception:{ bg: '#D1FAE5', primary: '#065F46', secondary: '#34D399', accent: '#D4AF37' },
} as const;

type IconColors = typeof ICON_COLORS[keyof typeof ICON_COLORS];

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
const CeremonyIcon = ({ type, size = 48, colors }: { type: string; size?: number; colors: IconColors }) => {
  const c = size / 2;
  switch (type) {
    case 'haldi':
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
          {[...Array(12)].map((_, i) => (
            <ellipse
              key={i}
              cx={c} cy={c * 0.48} rx={c * 0.12} ry={c * 0.44}
              fill={colors.primary} opacity="0.55"
              transform={`rotate(${i * 30} ${c} ${c})`}
            />
          ))}
          <circle cx={c} cy={c} r={c * 0.37} fill={colors.primary} />
          <circle cx={c} cy={c} r={c * 0.22} fill={colors.secondary} opacity="0.9" />
          <circle cx={c} cy={c} r={c * 0.1} fill="#FFFFFF" opacity="0.95" />
        </svg>
      );
    case 'mehndi':
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
          <circle cx={c} cy={c} r={c * 0.88} stroke={colors.primary} strokeWidth="1" fill="none" opacity="0.3" />
          <circle cx={c} cy={c} r={c * 0.62} stroke={colors.primary} strokeWidth="1.5" fill="none" opacity="0.6" />
          <circle cx={c} cy={c} r={c * 0.28} fill={colors.primary} opacity="0.85" />
          <circle cx={c} cy={c} r={c * 0.13} fill="#FFFFFF" opacity="0.9" />
          {[...Array(8)].map((_, i) => {
            const a = (i * 45 * Math.PI) / 180;
            const r = c * 0.62;
            return (
              <circle key={i}
                cx={c + r * Math.cos(a)} cy={c + r * Math.sin(a)}
                r={c * 0.1} fill={colors.secondary} opacity="0.75"
              />
            );
          })}
          {[...Array(8)].map((_, i) => {
            const a = ((i * 45 + 22.5) * Math.PI) / 180;
            return (
              <line key={i}
                x1={c + c * 0.38 * Math.cos(a)} y1={c + c * 0.38 * Math.sin(a)}
                x2={c + c * 0.62 * Math.cos(a)} y2={c + c * 0.62 * Math.sin(a)}
                stroke={colors.primary} strokeWidth="1" opacity="0.4"
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
            stroke={colors.primary} strokeWidth={size * 0.045} strokeLinecap="round" strokeLinejoin="round"
          />
          <circle cx={c * 0.53} cy={c * 1.58} r={c * 0.22} fill={colors.primary} />
          <circle cx={c * 1.42} cy={c * 1.36} r={c * 0.22} fill={colors.primary} />
          <circle cx={c * 1.72} cy={c * 0.32} r={c * 0.12} fill={colors.accent} opacity="0.6" />
          <circle cx={c * 1.88} cy={c * 0.72} r={c * 0.09} fill={colors.secondary} opacity="0.45" />
          <circle cx={c * 0.38} cy={c * 0.55} r={c * 0.1} fill={colors.secondary} opacity="0.5" />
          <circle cx={c * 0.22} cy={c * 0.85} r={c * 0.07} fill={colors.accent} opacity="0.35" />
        </svg>
      );
    case 'baraat':
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
          <path
            d={`M${c * 0.28} ${c * 1.48} L${c * 0.28} ${c * 0.9} L${c * 0.64} ${c * 1.12} L${c} ${c * 0.52} L${c * 1.36} ${c * 1.12} L${c * 1.72} ${c * 0.9} L${c * 1.72} ${c * 1.48} Z`}
            fill={colors.primary} opacity="0.72"
          />
          <rect x={c * 0.16} y={c * 1.48} width={c * 1.68} height={c * 0.22} rx={c * 0.11} fill={colors.secondary} opacity="0.52" />
          <circle cx={c * 0.28} cy={c * 0.82} r={c * 0.19} fill={colors.primary} />
          <circle cx={c} cy={c * 0.44} r={c * 0.19} fill={colors.primary} />
          <circle cx={c * 1.72} cy={c * 0.82} r={c * 0.19} fill={colors.primary} />
          <circle cx={c * 0.63} cy={c * 1.22} r={c * 0.1} fill={colors.accent} opacity="0.8" />
          <circle cx={c} cy={c * 1.12} r={c * 0.1} fill={colors.accent} opacity="0.8" />
          <circle cx={c * 1.37} cy={c * 1.22} r={c * 0.1} fill={colors.accent} opacity="0.8" />
        </svg>
      );
    case 'ceremony':
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
          <path
            d={`M${c} ${c * 1.88} C${c * 0.5} ${c * 1.88} ${c * 0.28} ${c * 1.5} ${c * 0.28} ${c * 1.1} C${c * 0.28} ${c * 0.58} ${c * 0.62} ${c * 0.3} ${c} ${c * 0.08} C${c} ${c * 0.44} ${c * 1.18} ${c * 0.52} ${c * 1.18} ${c * 0.76} C${c * 1.38} ${c * 0.52} ${c * 1.32} ${c * 0.3} ${c * 1.32} ${c * 0.3} C${c * 1.65} ${c * 0.58} ${c * 1.72} ${c * 0.85} ${c * 1.72} ${c * 1.1} C${c * 1.72} ${c * 1.5} ${c * 1.5} ${c * 1.88} ${c} ${c * 1.88} Z`}
            fill={colors.accent} opacity="0.52"
          />
          <path
            d={`M${c} ${c * 1.72} C${c * 0.62} ${c * 1.72} ${c * 0.52} ${c * 1.42} ${c * 0.52} ${c * 1.1} C${c * 0.52} ${c * 0.78} ${c * 0.68} ${c * 0.58} ${c} ${c * 0.32} C${c} ${c * 0.66} ${c * 1.12} ${c * 0.72} ${c * 1.12} ${c * 0.92} C${c * 1.22} ${c * 0.72} ${c * 1.18} ${c * 0.52} ${c * 1.18} ${c * 0.52} C${c * 1.42} ${c * 0.72} ${c * 1.48} ${c * 0.92} ${c * 1.48} ${c * 1.1} C${c * 1.48} ${c * 1.42} ${c * 1.38} ${c * 1.72} ${c} ${c * 1.72} Z`}
            fill={colors.primary} opacity="0.88"
          />
          <ellipse cx={c} cy={c * 1.18} rx={c * 0.22} ry={c * 0.28} fill={colors.secondary} opacity="0.65" />
        </svg>
      );
    case 'reception':
      return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none">
          <path
            d={`M${c * 0.72} ${c * 1.78} L${c * 1.28} ${c * 1.78} L${c * 1.16} ${c} Q${c * 1.36} ${c * 0.64} ${c * 1.36} ${c * 0.38} L${c * 0.64} ${c * 0.38} Q${c * 0.64} ${c * 0.64} ${c * 0.84} ${c} Z`}
            fill={colors.primary} opacity="0.2"
          />
          <path
            d={`M${c * 0.72} ${c * 1.78} L${c * 1.28} ${c * 1.78} L${c * 1.16} ${c} Q${c * 1.36} ${c * 0.64} ${c * 1.36} ${c * 0.38} L${c * 0.64} ${c * 0.38} Q${c * 0.64} ${c * 0.64} ${c * 0.84} ${c} Z`}
            stroke={colors.primary} strokeWidth="1.5" fill="none"
          />
          <line x1={c * 0.64} y1={c * 0.38} x2={c * 1.36} y2={c * 0.38} stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" />
          <line x1={c * 0.72} y1={c * 1.78} x2={c * 1.28} y2={c * 1.78} stroke={colors.primary} strokeWidth="2.5" strokeLinecap="round" />
          <circle cx={c * 0.38} cy={c * 0.44} r={c * 0.12} fill={colors.secondary} opacity="0.65" />
          <circle cx={c * 1.66} cy={c * 0.33} r={c * 0.1} fill={colors.secondary} opacity="0.7" />
          <circle cx={c * 0.28} cy={c} r={c * 0.08} fill={colors.accent} opacity="0.5" />
          <circle cx={c * 1.74} cy={c * 0.84} r={c * 0.1} fill={colors.secondary} opacity="0.6" />
          <path d={`M${c * 1.52} ${c * 1.22} L${c * 1.57} ${c * 1.1} L${c * 1.62} ${c * 1.22} Z`} fill={colors.accent} opacity="0.55" />
          <path d={`M${c * 0.34} ${c * 0.7} L${c * 0.39} ${c * 0.58} L${c * 0.44} ${c * 0.7} Z`} fill={colors.accent} opacity="0.55" />
        </svg>
      );
    default:
      return null;
  }
};

const MAPS_URL =
  'https://www.google.com/maps/place/Summer+Palace/@21.085763,72.718192,507m/data=!3m1!1e3!4m6!3m5!1s0x3be0532e4a01a64f:0x19e8cd4aaa84508f!8m2!3d21.085763!4d72.718192!16s%2Fg%2F1ptz6zxt8?hl=en&entry=ttu';

/* ─── Timeline Section ─── */
const Timeline = () => {
  return (
    <section
      className="py-20 md:py-28 px-5 relative overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, hsl(40,50%,88%) 0%, hsl(43,87%,94%) 35%, hsl(43,87%,94%) 65%, hsl(40,50%,88%) 100%)',
      }}
    >
      {/* Mehndi dot overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.03,
          backgroundImage: 'radial-gradient(circle, #D4AF37 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          pointerEvents: 'none',
        }}
      />

      <div className="max-w-lg mx-auto relative z-10">
        {/* ── Section header ── */}
        <SectionTitle
          label="Celebrations Schedule"
          heading="Wedding Schedule"
          description="Three days of joyful rituals, music, and celebration with our loved ones"
          dark={false}
        />

        {/* ── Day groups ── */}
        {dayGroups.map((group, gi) => (
          <div key={group.day}>
            {/* Day date header */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10px' }}
              transition={{ duration: 0.45 }}
              style={{ textAlign: 'center', marginTop: gi === 0 ? '0' : '2.5rem', marginBottom: '1rem' }}
            >
              <p style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(1.1rem, 2.5vw, 1.55rem)',
                fontStyle: 'italic',
                fontWeight: 400,
                color: '#2D0808',
                marginBottom: '0.35rem',
              }}>
                {group.date}
              </p>
              <div style={{ width: '3.2rem', height: '2px', background: '#B8860B', margin: '0 auto', opacity: 0.75 }} />
            </motion.div>

            {/* Event rows */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {group.events.map((event, ei) => {
                const colors = ICON_COLORS[event.iconType as keyof typeof ICON_COLORS] ?? ICON_COLORS.ceremony;
                const isHighlighted = event.iconType === 'ceremony';

                return (
                  <motion.div
                    key={event.title}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-10px' }}
                    transition={{ duration: 0.4, delay: ei * 0.07 }}
                  >
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '12px 16px',
                      borderRadius: '12px',
                      background: isHighlighted ? 'rgba(212,175,55,0.1)' : 'rgba(255,255,255,0.62)',
                      border: isHighlighted
                        ? '1px solid rgba(212,175,55,0.35)'
                        : '1px solid rgba(0,0,0,0.07)',
                      boxShadow: '0 1px 6px rgba(45,8,8,0.04)',
                    }}>
                      {/* Icon tile */}
                      <div style={{
                        width: 34, height: 34,
                        borderRadius: '8px',
                        background: colors.bg,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0,
                      }}>
                        <CeremonyIcon type={event.iconType} size={22} colors={colors} />
                      </div>

                      {/* Event name */}
                      <p style={{
                        flex: 1,
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 'clamp(0.95rem, 1.8vw, 1.2rem)',
                        fontWeight: 600,
                        color: '#2D0808',
                        margin: 0,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}>
                        {event.title}
                      </p>

                      {/* Time */}
                      <p style={{
                        flexShrink: 0,
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 'clamp(0.8rem, 1.4vw, 1rem)',
                        color: 'rgba(45,8,8,0.68)',
                        margin: 0,
                        whiteSpace: 'nowrap',
                        letterSpacing: '0.03em',
                      }}>
                        {event.time}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Timeline;
