import React from 'react';
import { Award, Star, Clock, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Introduction: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="relative bg-white overflow-hidden min-h-[700px] flex items-center">
      {/* Background Section Split */}
      <div className="absolute inset-0 flex flex-col lg:flex-row pointer-events-none">
        <div className="w-full lg:w-1/2 h-full bg-white"></div>
        <div className="w-full lg:w-1/2 h-full relative">
          <img
            src="/images/director_main.jpg"
            alt="Director"
            className="w-full h-full object-cover object-top opacity-100"
          />
          {/* Left-to-Right Fade (Minimal, only for text readability on left) */}
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/10 to-transparent"></div>

          {/* Bottom-to-Top Fade (For smooth bottom edge) */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white to-transparent"></div>

          {/* Top-to-Bottom Fade (Minimal) */}
          <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/50 to-transparent"></div>
        </div>
      </div>

      <div className="container mx-auto px-10 max-w-6xl relative z-10 py-24 lg:py-36">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-32 items-center">
          {/* Left: Hospital Intro */}
          <div className="text-slate-900 space-y-10 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-50 rounded-full border border-violet-100 backdrop-blur-sm">
              <Star size={18} className="text-violet-500" />
              <span className="text-sm font-medium text-slate-500 tracking-wide uppercase">{t.intro.badge}</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight text-slate-900">
              {t.intro.title1} <br className="hidden md:block" />
              <span className="text-violet-500">{t.intro.title2}</span>
            </h2>
            <p className="text-slate-600 text-xl leading-relaxed max-w-lg font-light">
              {t.intro.desc}
            </p>
          </div>

          {/* Right: Director Intro */}
          <div className="text-slate-900 space-y-10 lg:pl-20 animate-fade-in-up delay-100 self-end lg:pb-16">
            <div className="space-y-6">
              <p className="text-violet-500 font-bold tracking-[0.3em] text-xs uppercase">{t.intro.director.badge}</p>
              <h3 className="text-4xl lg:text-5xl font-bold text-slate-900 tracking-tight">{t.intro.director.name}</h3>

              <div className="relative py-5">
                <p className="text-xl lg:text-2xl text-slate-700 font-medium italic leading-relaxed border-l-4 border-violet-500 pl-8">
                  {t.intro.director.quote}
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <h4 className="text-violet-500 text-xs font-bold uppercase tracking-[0.2em]">{t.intro.director.qualificationsTitle}</h4>
              <div className="grid gap-4">
                {[
                  t.intro.director.qual1,
                  t.intro.director.qual2,
                  t.intro.director.qual3,
                  t.intro.director.qual4
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4 group">
                    <div className="w-2 h-2 bg-violet-500 rounded-full flex-shrink-0 group-hover:scale-125 transition-transform"></div>
                    <span className="text-lg text-slate-600 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Full-width Cards at bottom */}
        <div className="mt-20 pt-20 border-t border-violet-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 animate-fade-in-up">
            {[
              { icon: ShieldCheck, text: t.intro.points.specialist },
              { icon: Star, text: t.intro.points.equipment },
              { icon: Award, text: t.intro.points.guarantee },
              { icon: Clock, text: t.intro.points.private }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-4 bg-violet-50 p-6 rounded-[32px] border border-violet-100 hover:bg-violet-100 transition-all hover:shadow-lg hover:shadow-violet-500/5 group">
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:bg-violet-500 transition-colors flex-shrink-0">
                  <item.icon className="text-violet-500 group-hover:text-white transition-colors" size={22} />
                </div>
                <span className="font-bold text-base text-slate-700 leading-snug">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Introduction;