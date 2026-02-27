import React, { useEffect, useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Services from './components/Services';
import Introduction from './components/Introduction';
import TreatmentList from './components/TreatmentList';
import TreatmentPage from './components/TreatmentPage';
import Gallery from './components/Gallery';
import Specialization from './components/Specialization';
import LocationPage from './components/LocationPage';
import Contact from './components/Contact';
import Footer from './components/Footer';
import YoutubeSection from './components/YoutubeSection';
import BlogSection from './components/BlogSection';
import Admin from './components/Admin';
import { Phone } from 'lucide-react';

function App() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [showAdmin, setShowAdmin] = useState(false);
  const [activeTreatmentId, setActiveTreatmentId] = useState<string | null>(null);
  const [showLocation, setShowLocation] = useState(false);

  const handleTreatmentSelect = (id: string) => {
    setActiveTreatmentId(id);
    window.scrollTo(0, 0);
  };

  const handleTreatmentBack = () => {
    setActiveTreatmentId(null);
    setShowLocation(false);
    window.scrollTo(0, 0);
  };

  const handleShowLocation = () => {
    setShowLocation(true);
    setActiveTreatmentId(null);
    window.scrollTo(0, 0);
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col relative">
        <Navigation
          onOpenAdmin={() => setShowAdmin(true)}
          onTreatmentSelect={handleTreatmentSelect}
          onNavigateHome={handleTreatmentBack}
          onNavigateLocation={handleShowLocation}
        />

        <main className="flex-grow">
          {activeTreatmentId ? (
            <TreatmentPage id={activeTreatmentId} onBack={handleTreatmentBack} />
          ) : showLocation ? (
            <LocationPage onBack={handleTreatmentBack} />
          ) : (
            <>
              <Hero />
              <Introduction />
              <Services />
              <TreatmentList onTreatmentSelect={handleTreatmentSelect} />
              <Gallery />
              <Specialization />
              <YoutubeSection />
              <BlogSection />
              <Contact />
            </>
          )}
        </main>

        {!activeTreatmentId && <Footer />}

        {showAdmin && <Admin onClose={() => setShowAdmin(false)} />}

        {/* 모바일 전용 하단 고정 전화 버튼 */}
        <a
          href="tel:023141-4282"
          className="md:hidden fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-violet-500 hover:bg-violet-600 text-white px-5 py-3.5 rounded-full shadow-lg shadow-violet-500/40 transition-all active:scale-95"
        >
          <Phone size={18} />
          <span className="text-sm font-bold tracking-wide">전화 상담</span>
        </a>
      </div>
    </LanguageProvider>
  );
}

export default App;
