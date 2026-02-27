import React from 'react';
import FadeIn from './FadeIn';
import { useLanguage } from '../contexts/LanguageContext';

const Gallery: React.FC = () => {
  const { t } = useLanguage();
  const g = (t as any).gallery;

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: '300px', minHeight: '240px' }}
    >
      {/* Background photo */}
      <img
        src="/images/service_12_antiaging.jpg"
        alt="clinic"
        className="absolute inset-0 w-full h-full object-cover object-center"
      />

      {/* Gradient layers */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900/30 via-transparent to-transparent" />

      {/* Copy */}
      <div className="relative h-full flex items-center">
        <div className="container mx-auto px-10 lg:px-20 max-w-6xl">
          <FadeIn direction="right" className="max-w-xl">

            <span className="text-[10px] font-bold tracking-[0.5em] uppercase text-violet-300 mb-6 block">
              Renovo Hongdae
            </span>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.2] tracking-tight mb-8">
              {g.headline1}<br />
              <span className="text-violet-300">{g.headline2}</span>
            </h2>

            <div className="w-12 h-[2px] bg-violet-400 mb-8" />

            <p className="text-base md:text-lg text-white/70 leading-[1.9] font-light max-w-sm whitespace-pre-line">
              {g.body}
            </p>

          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
