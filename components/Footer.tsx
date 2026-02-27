import React from 'react';
import { Sparkles, Instagram, Youtube } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-violet-500 text-white border-t border-white/10">
      <div className="container mx-auto px-6 max-w-6xl py-12">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8 mb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="bg-white p-1.5 rounded-lg text-violet-500 shadow-lg">
                <Sparkles size={16} />
              </div>
              <span className="text-lg font-bold tracking-tight text-white">RENOVO HONGDAE</span>
            </div>
            <p className="text-white/80 text-sm leading-relaxed max-w-xs font-light">
              {t.footer.desc}
            </p>
          </div>

          <div className="flex gap-12 md:gap-16">
            <div>
              <h4 className="font-bold mb-4 text-xs uppercase tracking-wider text-white/60">{t.footer.sitemap}</h4>
              <ul className="space-y-2 text-sm text-white/80">
                <li><a href="#about" className="hover:text-white transition-colors">{t.footer.menu.about}</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">{t.footer.menu.services}</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors">{t.footer.menu.contact}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-xs uppercase tracking-wider text-white/60">{t.footer.social}</h4>
              <div className="flex gap-4">
                <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-violet-600 transition-colors">
                  <Instagram size={16} />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-violet-600 transition-colors">
                  <Youtube size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-white/40 font-medium">
          <p>&copy; {new Date().getFullYear()} {t.footer.copy}</p>
          <div className="flex gap-4">
            <span>{t.footer.rep}</span>
            <span>{t.footer.bizNum}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;