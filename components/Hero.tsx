import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Hero: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="home" className="relative min-h-[80vh] w-full overflow-hidden bg-white">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/images/main_visual.jpg"
          alt="Lumina Clinic Interior"
          className="w-full h-full object-cover"
        />
        {/* Very Light Overlay for Text Contrast */}
        <div className="absolute inset-0 bg-black/15"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 from-0% via-black/40 via-40% to-transparent to-75%"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-[80vh] flex flex-col justify-center items-center text-center px-6 py-20 container mx-auto max-w-6xl">
        {/* Main Copy */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-4 drop-shadow-2xl">
          {t.hero.title}
        </h1>

        {/* Sub Copy */}
        <p className="text-sm md:text-lg text-white/90 font-medium tracking-[0.1em] md:tracking-[0.2em] mb-6 md:mb-12 max-w-xl md:whitespace-nowrap drop-shadow-md">
          {t.hero.subtitle}
        </p>

        {/* Feature Columns */}
        <div className="hidden md:grid grid-cols-3 gap-8 text-white mb-6 lg:mb-12 w-full">
          <div className="text-center group">
            <h3 className="text-xl font-bold mb-2 group-hover:text-violet-400 transition-colors">{t.hero.care}</h3>
            <p className="text-base text-white/80 font-light tracking-wide">{t.hero.careDesc}</p>
          </div>
          <div className="text-center group">
            <h3 className="text-xl font-bold mb-2 group-hover:text-violet-400 transition-colors">{t.hero.safe}</h3>
            <p className="text-base text-white/80 font-light tracking-wide">{t.hero.safeDesc}</p>
          </div>
          <div className="text-center group">
            <h3 className="text-xl font-bold mb-2 group-hover:text-violet-400 transition-colors">{t.hero.result}</h3>
            <p className="text-base text-white/80 font-light tracking-wide">{t.hero.resultDesc}</p>
          </div>
        </div>

        {/* View Button */}
        <a href="#services" className="px-10 py-3 bg-violet-500 text-white text-sm font-bold tracking-[0.3em] hover:bg-violet-600 transition-all duration-300 uppercase rounded-xl shadow-lg shadow-violet-500/20">
          {t.hero.btn}
        </a>
      </div>
    </section>

  );
};

export default Hero;