import React from 'react';
import { Award, Star, Clock, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Introduction: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="relative bg-white">

      {/* 배경 사진 - 데스크탑만 */}
      <div className="absolute inset-0 pointer-events-none hidden lg:flex">
        <div className="w-1/2"></div>
        <div className="w-1/2 relative flex items-center justify-center">
          <img
            src="/images/director_main.jpg"
            alt="Director"
            className="h-4/5 w-auto object-contain"
            style={{ filter: 'brightness(0.95) saturate(0.7) blur(0.7px)' }}
          />
          <div className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-white/60 to-transparent"></div>
          <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-white to-transparent"></div>
        </div>
      </div>

      {/* 콘텐츠 */}
      <div className="relative z-10 container mx-auto px-5 sm:px-8 lg:px-10 max-w-6xl py-16 sm:py-20 lg:py-32">

        {/* 텍스트 그리드 */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-20 items-center mb-10 lg:mb-20">

          {/* 1열: 병원 소개 */}
          <div className="text-slate-900 space-y-5 lg:space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-50 rounded-full border border-violet-100">
              <Star size={14} className="text-violet-500" />
              <span className="text-xs font-medium text-slate-500 tracking-wide uppercase">{t.intro.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-slate-900">
              {t.intro.title1} <br />
              <span className="text-violet-500">{t.intro.title2}</span>
            </h2>
            <p className="text-slate-500 text-sm sm:text-base leading-relaxed font-light">
              {t.intro.desc}
            </p>
          </div>

          {/* 2열: 원장님 소개 */}
          <div className="text-slate-900 space-y-5 lg:space-y-8">
            <div className="space-y-2">
              <p className="text-violet-500 font-bold tracking-[0.3em] text-xs uppercase">{t.intro.director.badge}</p>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">{t.intro.director.name}</h3>
            </div>
            <div className="border-l-4 border-violet-500 pl-5 py-1">
              <p className="text-sm sm:text-base text-slate-600 italic leading-relaxed">
                {t.intro.director.quote}
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="text-violet-500 text-xs font-bold uppercase tracking-[0.2em]">{t.intro.director.qualificationsTitle}</h4>
              <div className="grid gap-2">
                {[
                  t.intro.director.qual1,
                  t.intro.director.qual2,
                  t.intro.director.qual3,
                  t.intro.director.qual4
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-violet-500 rounded-full flex-shrink-0"></div>
                    <span className="text-xs sm:text-sm text-slate-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* 하단 카드 */}
        <div className="pt-8 lg:pt-12 border-t border-violet-100">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {[
              { icon: ShieldCheck, text: t.intro.points.specialist },
              { icon: Star, text: t.intro.points.equipment },
              { icon: Award, text: t.intro.points.guarantee },
              { icon: Clock, text: t.intro.points.private }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-violet-50 p-4 sm:p-6 rounded-2xl sm:rounded-[32px] border border-violet-100 hover:bg-violet-100 transition-all group">
                <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-white flex items-center justify-center shadow-sm group-hover:bg-violet-500 transition-colors flex-shrink-0">
                  <item.icon className="text-violet-500 group-hover:text-white transition-colors" size={18} />
                </div>
                <span className="font-bold text-xs sm:text-sm lg:text-base text-slate-700 leading-snug">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Introduction;