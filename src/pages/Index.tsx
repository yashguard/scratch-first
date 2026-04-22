import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSection from '@/components/wedding/HeroSection';
import ScratchReveal from '@/components/wedding/ScratchReveal';
import CountdownTimer from '@/components/wedding/CountdownTimer';
import CoupleCarousel from '@/components/wedding/CoupleCarousel';
import VenueSection from '@/components/wedding/VenueSection';
import Timeline from '@/components/wedding/Timeline';
import RSVPForm from '@/components/wedding/RSVPForm';
import CalendarButton from '@/components/wedding/CalendarButton';
import ThankYou from '@/components/wedding/ThankYou';
import TornEdge from '@/components/wedding/TornEdge';
import FloatingParticles from '@/components/wedding/FloatingParticles';
import MusicPlayer from '@/components/wedding/MusicPlayer';

const Index = () => {
  const [heroComplete, setHeroComplete] = useState(false);

  useEffect(() => {
    // Always start from top on load/refresh — disable browser scroll restoration
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  return (
    <>
      <FloatingParticles />
      <MusicPlayer canPlay={heroComplete} />

      <main className="relative">
        <HeroSection onComplete={() => setHeroComplete(true)} />
        {/* <TornEdge index={0} /> */}

        <AnimatePresence>
          {heroComplete && (
            <motion.div
              key="main-sections"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
            >
              <ScratchReveal />
              <CountdownTimer />
              <CoupleCarousel />
              <VenueSection />
              <Timeline />
              <RSVPForm />
              <CalendarButton />
              <ThankYou />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
};

export default Index;
