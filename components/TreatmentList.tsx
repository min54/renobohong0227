import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import FadeIn from './FadeIn';

const groupIds = [
  ['1', '2', '3'],
  ['4', '5', '6', '7', '8'],
  ['14', '15', '16', '17', '18'],
  ['11', '12', '13'],
  ['9', '10'],
  ['19', '20', '21', '22'],
];

interface Props {
  onTreatmentSelect: (id: string) => void;
}

const TreatmentList: React.FC<Props> = ({ onTreatmentSelect }) => {
  const { t } = useLanguage();

  return (
    <section id="services" className="py-24 lg:py-36 bg-[#fafafa]">
      <div className="container mx-auto px-10 max-w-6xl">

        {/* Header */}
        <FadeIn className="text-center mb-20">
          <span className="text-[10px] font-bold text-violet-500 tracking-[0.4em] uppercase">{t.services.badge}</span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mt-3 mb-4 leading-tight">
            {t.services.title}
          </h2>
          <p className="text-base text-slate-500 max-w-lg mx-auto leading-relaxed font-light">
            {t.services.desc}
          </p>
        </FadeIn>

        {/* 리스트 */}
        <div className="flex flex-col divide-y divide-violet-100">
          {(t as any).serviceGroups.map((group: any, i: number) => {
            const items = groupIds[i].map((id) => ({
              id,
              ...(t.services.items as any)[id],
            }));

            return (
              <FadeIn key={group.label} delay={i * 80} direction="left">
              <div className="flex items-center gap-14 py-9">

                {/* 왼쪽: 카테고리명 */}
                <div className="w-44 flex-shrink-0">
                  <p className="text-[10px] font-bold text-violet-400 tracking-[0.3em] uppercase mb-1">
                    {group.label}
                  </p>
                  <p className="text-xl font-bold text-violet-600">{group.labelNative}</p>
                </div>

                {/* 구분선 */}
                <div className="w-px h-10 bg-violet-100 flex-shrink-0" />

                {/* 오른쪽: 시술 버튼 */}
                <div className="flex flex-wrap gap-3">
                  {items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => onTreatmentSelect(item.id)}
                      className="rounded-full px-7 py-3.5 border border-violet-100 bg-white
                        text-base font-semibold text-slate-700
                        hover:bg-violet-500 hover:text-white hover:border-violet-500
                        transition-all duration-200"
                    >
                      {item.title}
                    </button>
                  ))}
                </div>

              </div>
              </FadeIn>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default TreatmentList;
