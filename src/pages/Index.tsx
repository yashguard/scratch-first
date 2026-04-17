import HeroSection from '@/components/wedding/HeroSection';
import ScratchReveal from '@/components/wedding/ScratchReveal';
import CountdownTimer from '@/components/wedding/CountdownTimer';
import CoupleCarousel from '@/components/wedding/CoupleCarousel';
import VenueSection from '@/components/wedding/VenueSection';
import Timeline from '@/components/wedding/Timeline';
import RSVPForm from '@/components/wedding/RSVPForm';
import CalendarButton from '@/components/wedding/CalendarButton';
import ThankYou from '@/components/wedding/ThankYou';
import ContactFooter from '@/components/wedding/ContactFooter';
import OrnamentalDivider from '@/components/wedding/OrnamentalDivider';
import FloatingParticles from '@/components/wedding/FloatingParticles';
import MusicPlayer from '@/components/wedding/MusicPlayer';

const Index = () => {
  return (
    <>
      <FloatingParticles />
      <MusicPlayer />

      <main className="relative">
        <HeroSection />
        <OrnamentalDivider variant="floral" />

        <ScratchReveal />
        <OrnamentalDivider variant="wave" />

        <CountdownTimer />
        <OrnamentalDivider variant="dots" />

        <CoupleCarousel />
        <OrnamentalDivider variant="zigzag" />

        <VenueSection />
        <OrnamentalDivider variant="torn" />

        <Timeline />
        <OrnamentalDivider variant="dots" />

        <RSVPForm />
        <CalendarButton />
        <OrnamentalDivider variant="floral" />

        <ThankYou />
        <OrnamentalDivider variant="wave" />

        <ContactFooter />
      </main>
    </>
  );
};

export default Index;
