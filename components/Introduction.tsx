import React from 'react';
import { Award, Star, Clock, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Introduction: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="about" className="relative bg-white overflow-hidden min-h-[680px] flex flex-col justify-center">

      {/* 배경 사진 - 오른쪽 절반 */}
      <div className="absolute inset-0 pointer-events-none hidden lg:flex">
        <div className="w-1/2"></div>
        <div className="w-1/2 relative">
          <img
            src="/images/director_main.jpg"
            alt="Director"
            className="w-full h-full object-cover object-top"
          />
          {/* 왼쪽 페이드 */}
          <div className="absolute inset-y-0 left-0 w-2/3 bg-gradient-to-r from-white to-transparent"></div>
          {/* 상단 페이드 */}
          <div className="absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-white to-transparent"></div>
          {/* 하단 페이드 */}
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-white to-transparent"></div>
          {/* 오른쪽 페이드 */}
          <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-white to-transparent"></div>
        </div>
      </div>

      {/* 콘텐츠 */}
      <div className="relative z-10 container mx-auto px-10 max-w-6xl py-24 lg:py-32">

        {/* 2열: 텍스트만 왼쪽에 */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">

          {/* 1열: 병원 소개 */}
          <div className="text-slate-900 space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-50 rounded-full border border-violet-100">
              <Star size={16} className="text-violet-500" />
              <span className="text-xs font-medium text-slate-500 tracking-wide uppercase">{t.intro.badge}</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-slate-900">
              {t.intro.title1} <br />
              <span className="text-violet-500">{t.intro.title2}</span>
            </h2>
            <p className="text-slate-500 text-base leading-relaxed font-light">
              {t.intro.desc}
            </p>
          </div>

          {/* 2열: 원장님 소개 */}
          <div className="text-slate-900 space-y-8 animate-fade-in-up delay-100">
            <div className="space-y-4">
              <p className="text-violet-500 font-bold tracking-[0.3em] text-xs uppercase">{t.intro.director.badge}</p>
              <h3 className="text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight">{t.intro.director.name}</h3>
            </div>
            <div className="border-l-4 border-violet-500 pl-6 py-2">
              <p className="text-base text-slate-600 italic leading-relaxed">
                {t.intro.director.quote}
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-violet-500 text-xs font-bold uppercase tracking-[0.2em]">{t.intro.director.qualificationsTitle}</h4>
              <div className="grid gap-3">
                {[
                  t.intro.director.qual1,
                  t.intro.director.qual2,
                  t.intro.director.qual3,
                  t.intro.director.qual4
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 bg-violet-500 rounded-full flex-shrink-0"></div>
                    <span className="text-sm text-slate-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* 하단 카드 */}
        <div className="pt-12 border-t border-violet-100">
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