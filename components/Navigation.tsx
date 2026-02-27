import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, Lock, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface NavigationProps {
  onOpenAdmin: () => void;
  onTreatmentSelect: (id: string) => void;
  onNavigateHome: () => void;
  onNavigateLocation: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ onOpenAdmin, onTreatmentSelect, onNavigateHome, onNavigateLocation }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.about, href: '#about', isHome: true, isLocation: false },
    { name: t.nav.services, href: '#services', isHome: false, isLocation: false },
    { name: t.nav.contact, href: '#contact', isHome: false, isLocation: true },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-violet-500 shadow-lg py-2.5' : 'bg-transparent py-4'
        }`}
    >
      <div className="container mx-auto px-6 max-w-6xl flex justify-between items-center">
        <button onClick={onNavigateHome} className={`text-2xl font-bold tracking-tighter hover:opacity-80 transition-opacity text-white`}>
          RENOVO <span className={isScrolled ? 'text-violet-100' : 'text-violet-600'}>HONGDAE</span>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8">
          <div className="flex gap-4 lg:gap-8">
            {navLinks.map((link) => (
              <div
                key={link.name}
                className="relative group"
                onMouseEnter={() => link.href === '#services' && setServicesDropdownOpen(true)}
                onMouseLeave={() => link.href === '#services' && setServicesDropdownOpen(false)}
              >
                <a
                  href={link.isLocation ? undefined : link.href}
                  onClick={link.isHome ? onNavigateHome : link.isLocation ? onNavigateLocation : undefined}
                  className={`flex items-center gap-1 text-xs lg:text-sm font-medium transition-colors tracking-wide whitespace-nowrap py-2 text-white/90 hover:text-white cursor-pointer`}
                >
                  {link.name}
                  {link.href === '#services' && <ChevronDown size={14} className={`transition-transform duration-300 ${servicesDropdownOpen ? 'rotate-180' : ''}`} />}
                </a>

                {link.href === '#services' && (
                  <div className={`absolute left-0 mt-0 w-64 bg-white/95 backdrop-blur-xl border border-violet-100 rounded-2xl shadow-2xl transition-all duration-300 origin-top-left ${servicesDropdownOpen ? 'opacity-100 scale-100 translate-y-2 visible' : 'opacity-0 scale-95 translate-y-0 invisible'}`}>
                    <div className="p-4 grid gap-1">
                      {Object.entries(t.services.items).map(([key, item]: [string, any]) => (
                        <button
                          key={key}
                          onClick={() => { setServicesDropdownOpen(false); onTreatmentSelect(key); }}
                          className="px-4 py-2.5 rounded-xl text-xs text-slate-600 hover:text-violet-700 hover:bg-violet-50 transition-all flex flex-col text-left w-full"
                        >
                          <span className="font-bold text-[11px] text-violet-600 mb-0.5">{item.title}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Language Switcher */}
          <div className={`flex items-center gap-2 border-l pl-6 h-4 border-white/20`}>
            {(['KR', 'EN', 'JP'] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`text-[10px] font-bold px-1.5 py-0.5 rounded border transition-all ${language === lang
                  ? 'bg-white text-violet-600 border-white'
                  : 'border-white/20 text-white/60 hover:border-white hover:text-white'
                  }`}
              >
                {lang}
              </button>
            ))}
          </div>

          <button
            onClick={onOpenAdmin}
            className="p-1.5 opacity-0 hover:opacity-0 cursor-default"
            title=""
            aria-hidden="true"
          >
            <Lock size={14} />
          </button>

          <a href="#reservation" className={`${isScrolled ? 'bg-white text-violet-600' : 'bg-violet-600 text-white'} px-5 py-2 rounded-full text-xs font-bold hover:opacity-90 transition-all shadow-lg`}>
            {t.nav.book}
          </a>
        </div>

        <button
          className="text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white/98 backdrop-blur-xl pt-24 px-6 md:hidden animate-in fade-in slide-in-from-top duration-300">
          <div className="flex flex-col gap-6 text-center max-h-[80vh] overflow-y-auto pb-10">
            {navLinks.map((link) => (
              <div key={link.name} className="flex flex-col">
                <div
                  className="flex items-center justify-center gap-2"
                  onClick={() => link.href === '#services' && setMobileServicesOpen(!mobileServicesOpen)}
                >
                  <a
                    href={link.href === '#services' ? undefined : link.href}
                    className="text-xl font-medium text-slate-800 hover:text-violet-600 cursor-pointer"
                    onClick={() => {
                      if (link.isHome) onNavigateHome();
                      if (link.isLocation) { onNavigateLocation(); setMobileMenuOpen(false); }
                      if (link.href !== '#services') setMobileMenuOpen(false);
                    }}
                  >
                    {link.name}
                  </a>
                  {link.href === '#services' && <ChevronDown size={20} className={`text-violet-600 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />}
                </div>

                {link.href === '#services' && mobileServicesOpen && (
                  <div className="grid grid-cols-1 gap-2 mt-4 px-2 animate-in zoom-in-95 duration-200">
                    {Object.entries(t.services.items).map(([key, item]: [string, any]) => (
                      <button
                        key={key}
                        className="p-4 bg-violet-50 rounded-2xl text-[12px] text-violet-700 font-bold border border-violet-100 flex justify-between items-center active:bg-violet-100 transition-colors text-left w-full"
                        onClick={() => { setMobileMenuOpen(false); onTreatmentSelect(key); }}
                      >
                        <span>{item.title}</span>
                        <ChevronDown size={14} className="-rotate-90 text-violet-300" />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Mobile Admin Link (Hidden/Secret) */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="text-xl font-medium opacity-0 cursor-default h-6"
              aria-hidden="true"
            >
              Secret
            </button>

            <div className="flex justify-center gap-3 pt-4">
              {(['KR', 'EN', 'JP'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    setLanguage(lang);
                    setMobileMenuOpen(false);
                  }}
                  className={`text-xs font-bold px-3 py-1 rounded border ${language === lang
                    ? 'bg-violet-600 border-violet-600 text-white'
                    : 'border-slate-200 text-slate-500 hover:border-violet-600'
                    }`}
                >
                  {lang}
                </button>
              ))}
            </div>

          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;