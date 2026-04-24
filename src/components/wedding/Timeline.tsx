import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import SectionTitle from './SectionTitle';

const MAPS_URL =
  'https://www.google.com/maps/place/Summer+Palace/@21.085763,72.718192,507m/data=!3m1!1e3!4m6!3m5!1s0x3be0532e4a01a64f:0x19e8cd4aaa84508f!8m2!3d21.085763!4d72.718192!16s%2Fg%2F1ptz6zxt8?hl=en&entry=ttu';

interface TimelineEvent {
  title: string;
  date: string;
  time: string;
  description: string;
  venue: string;
  venueUrl?: string;
  image: string;
  side: 'left' | 'right';
}

const events: TimelineEvent[] = [
  {
    title: 'Haldi Ceremony',
    date: '13th December 2026',
    time: '10:00 AM',
    description: 'The auspicious turmeric ceremony to bless the couple with joy and prosperity',
    venue: 'Family Residence',
    image: '/assets/images/haldi.webp',
    side: 'left',
  },
  {
    title: 'Mehndi Night',
    date: '13th December 2026',
    time: '6:00 PM',
    description: 'Beautiful henna adorning hands with intricate patterns and timeless motifs',
    venue: 'Summer Palace — Lotus Garden',
    venueUrl: MAPS_URL,
    image: '/assets/images/mehendi.webp',
    side: 'right',
  },
  {
    title: 'Sangeet & Cocktails',
    date: '14th December 2026',
    time: '7:00 PM',
    description: 'An evening of music, dance, and joyful celebration with family and friends',
    venue: 'Summer Palace — Grand Ballroom',
    venueUrl: MAPS_URL,
    image: '/assets/images/sangeet.webp',
    side: 'left',
  },
  {
    title: 'Baraat Procession',
    date: '15th December 2026',
    time: '9:00 AM',
    description: 'A grand procession to welcome the groom on his most sacred day',
    venue: 'Summer Palace — Main Entrance',
    venueUrl: MAPS_URL,
    image: '/assets/images/wedding.webp',
    side: 'right',
  },
  {
    title: 'Wedding Ceremony',
    date: '15th December 2026',
    time: '11:00 AM',
    description: 'The sacred union of two souls through ancient Vedic rituals and vows',
    venue: 'Summer Palace — Sacred Mandap',
    venueUrl: MAPS_URL,
    image: '/assets/images/wedding.webp',
    side: 'left',
  },
  {
    title: 'Grand Reception',
    date: '15th December 2026',
    time: '7:00 PM',
    description: 'A grand celebration to welcome the newlyweds into their new journey together',
    venue: 'Summer Palace — Crystal Hall',
    venueUrl: MAPS_URL,
    image: '/assets/images/reception.webp',
    side: 'right',
  },
];

/* ── Shared inline styles ── */
const timeStyle: React.CSSProperties = {
  fontFamily: "'Cinzel', serif",
  fontSize: '0.68rem',
  letterSpacing: '0.22em',
  color: '#B8860B',
  textTransform: 'uppercase',
  marginBottom: '4px',
  fontWeight: 600,
};

const titleStyle: React.CSSProperties = {
  fontFamily: "'Cormorant Garamond', serif",
  fontSize: 'clamp(1rem, 1.8vw, 1.25rem)',
  fontWeight: 600,
  color: '#2D0808',
  marginBottom: '4px',
  lineHeight: 1.2,
};

const descStyle: React.CSSProperties = {
  fontFamily: "'Cormorant Garamond', serif",
  fontSize: 'clamp(0.82rem, 1.1vw, 0.95rem)',
  color: '#7A1F1F',
  lineHeight: 1.55,
  marginBottom: '4px',
  fontWeight: 600,
};

const venueBaseStyle: React.CSSProperties = {
  fontFamily: "'Cormorant Garamond', serif",
  fontSize: 'clamp(0.78rem, 1vw, 0.88rem)',
  fontWeight: 600,
  color: '#7A1F1F',
};

/* ── Timeline Section ── */
const Timeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const flowerY = useTransform(scrollYProgress, [0, 1], ['8%', '92%']);

  return (
    <section
      className="py-12 lg:py-16 px-5 relative overflow-hidden"
      style={{
        background:
          'linear-gradient(180deg, hsl(40,50%,88%) 0%, hsl(43,87%,94%) 35%, hsl(43,87%,94%) 65%, hsl(40,50%,88%) 100%)',
      }}
      ref={containerRef}
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

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* ── Section header ── */}
        <div className="mb-10 md:mb-14">
          <SectionTitle
            label="Celebrations Schedule"
            heading="Wedding Schedule"
            description="Three days of joyful rituals, music, and celebration with our loved ones"
            dark={false}
          />
        </div>

        {/* ── Timeline ── */}
        <div className="relative">

          {/* Center line — desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(184,134,11,0.45) 15%, rgba(184,134,11,0.45) 85%, transparent)' }}
          />

          {/* Left line — mobile */}
          <div className="md:hidden absolute left-6 top-0 bottom-0 w-px"
            style={{ background: 'linear-gradient(to bottom, transparent, rgba(184,134,11,0.45) 10%, rgba(184,134,11,0.45) 90%, transparent)' }}
          />

          {/* Scrolling sakura — desktop */}
          <motion.div
            className="absolute z-20 pointer-events-none hidden md:block left-1/2 -translate-x-1/2"
            style={{ top: flowerY }}
          >
            <div className="w-10 h-10 -translate-y-1/2">
              <img src="/assets/images/sakura.webp" alt="" className="w-full h-full object-contain drop-shadow-md" />
            </div>
          </motion.div>

          {/* Scrolling sakura — mobile */}
          <motion.div
            className="absolute z-20 pointer-events-none md:hidden left-6 -translate-x-1/2"
            style={{ top: flowerY }}
          >
            <div className="w-8 h-8 -translate-y-1/2">
              <img src="/assets/images/sakura.webp" alt="" className="w-full h-full object-contain drop-shadow-md" />
            </div>
          </motion.div>

          {/* Events */}
          <div className="space-y-6 md:space-y-8">
            {events.map((event, index) => (
              <div
                key={index}
                className={`relative flex items-start md:items-center ${event.side === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
              >

                {/* ── Mobile layout ── */}
                <div className="md:hidden flex items-start gap-3 pl-14 pr-2 w-full">
                  <ScrollReveal delay={index * 0.1} className="w-full">
                    <div className="flex gap-4">
                      <div className="w-14 h-14 rounded-lg overflow-hidden flex-shrink-0"
                        style={{ border: '1px solid rgba(184,134,11,0.18)' }}>
                        <img src={event.image} alt={event.title} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p style={{ ...timeStyle, fontSize: '0.6rem', marginBottom: '2px' }}>
                          {event.date} · {event.time}
                        </p>
                        <h3 style={{ ...titleStyle, fontSize: '1rem', marginBottom: '2px' }}>
                          {event.title}
                        </h3>
                        <p style={{ ...descStyle, fontSize: '0.8rem', marginBottom: '2px' }}>
                          {event.description}
                        </p>
                        {event.venueUrl ? (
                          <a
                            href={event.venueUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              ...venueBaseStyle,
                              fontSize: '0.75rem',
                              textDecoration: 'underline',
                              textDecorationColor: 'rgba(122,31,31,0.4)',
                              textUnderlineOffset: '2px',
                            }}
                          >
                            {event.venue}
                          </a>
                        ) : (
                          <p style={{ ...venueBaseStyle, fontSize: '0.75rem' }}>{event.venue}</p>
                        )}
                      </div>
                    </div>
                  </ScrollReveal>
                </div>

                {/* ── Desktop layout — card ── */}
                <div className="hidden md:block w-[calc(50%-32px)]">
                  <ScrollReveal
                    direction={event.side === 'left' ? 'right' : 'left'}
                    delay={index * 0.1}
                  >
                    <div
                      className={`p-4 rounded-lg md:grid md:grid-cols-[1fr_120px] md:items-center md:gap-4 ${event.side === 'left' ? 'text-right' : 'text-left'
                        }`}
                      style={{
                        border: '1px solid rgba(184,134,11,0.18)',
                        background: 'rgba(255,255,255,0.62)',
                        boxShadow: '0 1px 8px rgba(45,8,8,0.04)',
                      }}
                    >
                      <div className={event.side === 'left' ? 'md:text-right' : 'md:text-left'}>
                        <p style={timeStyle}>
                          {event.date} · {event.time}
                        </p>
                        <h3 style={titleStyle}>
                          {event.title}
                        </h3>
                        <p style={descStyle}>
                          {event.description}
                        </p>
                        {event.venueUrl ? (
                          <a
                            href={event.venueUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              ...venueBaseStyle,
                              textDecoration: 'underline',
                              textDecorationColor: 'rgba(122,31,31,0.4)',
                              textUnderlineOffset: '2px',
                            }}
                          >
                            {event.venue}
                          </a>
                        ) : (
                          <p style={venueBaseStyle}>{event.venue}</p>
                        )}
                      </div>

                      {/* Event image */}
                      <div className="w-full h-24 md:h-28 rounded-lg overflow-hidden flex-shrink-0"
                        style={{ border: '1px solid rgba(184,134,11,0.12)' }}>
                        <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                      </div>
                    </div>
                  </ScrollReveal>
                </div>

                {/* Center dot — desktop */}
                <div
                  className="hidden md:block absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full z-10"
                  style={{ border: '2px solid #B8860B', background: 'hsl(43,87%,94%)' }}
                />

                {/* Left dot — mobile */}
                <div
                  className="md:hidden absolute left-6 -translate-x-1/2 top-2 w-2.5 h-2.5 rounded-full z-10"
                  style={{ border: '2px solid #B8860B', background: 'hsl(43,87%,94%)' }}
                />

                {/* Spacer — desktop */}
                <div className="hidden md:block w-[calc(50%-32px)]" />

              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
