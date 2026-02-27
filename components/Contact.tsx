import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import FadeIn from './FadeIn';

const Contact: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-24 lg:py-36 bg-white text-slate-900 border-t border-violet-100">
      <div className="container mx-auto px-10 max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Location Info (Left Side) */}
          <FadeIn direction="right" className="lg:w-1/2">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-slate-900">
              {t.contact.title}
            </h2>
            <p className="text-slate-500 mb-8 text-base font-light">
              {t.contact.subtitle}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-violet-50 flex items-center justify-center shrink-0">
                  <MapPin className="w-4 h-4 text-violet-500" />
                </div>
                <div>
                  <h4 className="text-base font-bold mb-0.5 text-slate-900">{t.contact.addressTitle}</h4>
                  <p className="text-slate-500 text-base">{t.contact.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-violet-50 flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-violet-500" />
                </div>
                <div>
                  <h4 className="text-base font-bold mb-0.5 text-slate-900">{t.contact.emailTitle}</h4>
                  <p className="text-slate-500 text-base">contact@renovo.com</p>
                </div>
              </div>

              <div className="flex items-start gap-3 sm:col-span-2">
                <div className="w-10 h-10 rounded-full bg-violet-50 flex items-center justify-center shrink-0">
                  <Clock className="w-4 h-4 text-violet-500" />
                </div>
                <div className="w-full">
                  <h4 className="text-base font-bold mb-1 text-slate-900">{t.contact.hoursTitle}</h4>
                  <div className="flex flex-wrap gap-x-6 text-base text-slate-500">
                    <span>{t.contact.weekdays}</span>
                    <span>{t.contact.saturday}</span>
                    <span className="text-red-500">{t.contact.sunday}</span>
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Compact Form (Right Side) */}
          <FadeIn direction="left" delay={150} className="lg:w-1/2 w-full">
            <div className="bg-white rounded-[32px] p-6 shadow-2xl border border-violet-100 text-gray-800">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-slate-900">{t.contact.formTitle}</h3>
              </div>
              <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder={t.contact.namePlaceholder}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-base focus:outline-none focus:border-violet-500"
                  />
                  <input
                    type="email"
                    placeholder={t.contact.emailPlaceholder}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-base focus:outline-none focus:border-violet-500"
                  />
                </div>
                <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500 text-gray-500">
                  <option>{t.contact.selectPlaceholder}</option>
                  <option>레이저 토닝</option>
                  <option>리프팅</option>
                  <option>쁘띠 성형</option>
                </select>
                <div className="flex gap-3">
                  <textarea
                    placeholder={t.contact.messagePlaceholder}
                    rows={1}
                    className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-violet-500 resize-none"
                  ></textarea>
                  <button type="submit" className="whitespace-nowrap bg-violet-500 text-white font-bold px-6 rounded-xl hover:bg-violet-600 transition-colors text-base">
                    {t.contact.submitBtn}
                  </button>
                </div>
              </form>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
};

export default Contact;