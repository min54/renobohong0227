import React from 'react';
import { User, MessageCircle, Sparkles } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import FadeIn from './FadeIn';

const Specialization: React.FC = () => {
  const { t } = useLanguage();

  const icons = [User, MessageCircle, Sparkles];

  return (
    <section className="py-24 lg:py-36 bg-white relative">
      <div className="container mx-auto px-10 max-w-6xl">
        <FadeIn className="text-center max-w-4xl mx-auto mb-16">
          <span className="text-violet-500 font-bold tracking-widest uppercase text-xs">{t.specialization.badge}</span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mt-2 mb-4 leading-tight">
            {t.specialization.title} <span className="text-violet-500">{t.specialization.titleHighlight}</span>
          </h2>
          <p className="text-slate-500 text-base leading-relaxed max-w-xl mx-auto">
            {t.specialization.desc}
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8">
          {t.specialization.points.map((point, index) => {
            const Icon = icons[index % icons.length];
            return (
              <FadeIn key={index} delay={index * 100}>
              <div className="group bg-violet-50 rounded-[32px] p-10 hover:bg-violet-100 transition-all duration-500 border border-violet-100">
                <div className="w-10 h-10 bg-violet-100 rounded-xl flex items-center justify-center mb-4 transition-colors duration-500 group-hover:bg-violet-500">
                  <Icon className="text-violet-500 w-5 h-5 group-hover:text-white transition-colors duration-500" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">{point.title}</h3>
                <p className="text-violet-500 font-medium mb-3 text-xs tracking-wide uppercase">{point.subtitle}</p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {point.desc}
                </p>
              </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Specialization;