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
import TornEdge from '@/components/wedding/TornEdge';
import FloatingParticles from '@/components/wedding/FloatingParticles';
import MusicPlayer from '@/components/wedding/MusicPlayer';

const Index = () => {
  return (
    <>
      <FloatingParticles />
      <MusicPlayer />

      <main className="relative">
        <HeroSection />
        <TornEdge index={0} />

        <ScratchReveal />
        <TornEdge index={1} />

        <CountdownTimer />
        <TornEdge index={2} />

        <CoupleCarousel />
        <TornEdge index={3} />

        <VenueSection />
        <TornEdge index={4} />

        <Timeline />
        <TornEdge index={5} />

        <RSVPForm />
        <CalendarButton />
        <TornEdge index={6} />

        <ThankYou />
        <TornEdge index={7} />

        <ContactFooter />
      </main>
    </>
  );
};

export default Index;
