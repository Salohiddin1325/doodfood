import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Flame, 
  MapPin, 
  Phone, 
  Clock, 
  Send, 
  ShieldCheck, 
  Heart,
  Globe,
  ArrowUpRight
} from 'lucide-react';

export const Footer = () => {
  const { lang, t } = useApp();

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 mb-12">
          
          {/* 1. Brand Info & Halal Trust */}
          <div className="lg:col-span-4 space-y-4">
            <a href="#" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-red-600 via-amber-500 to-yellow-400 flex items-center justify-center text-white shadow-glow-amber group-hover:scale-105 transition-transform">
                <Flame className="w-6 h-6 animate-pulse text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-black tracking-tight leading-none text-white font-display">
                  DOOD<span className="text-amber-500">FOOD</span>
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-amber-400">
                  Bektemir • 24/7 Fast-Food
                </span>
              </div>
            </a>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {t.footer.desc}
            </p>

            {/* Halal Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-950/70 border border-emerald-700/60 text-emerald-400 text-xs font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{t.footer.halalNote}</span>
            </div>

            {/* Payment Systems Badges */}
            <div className="pt-2">
              <span className="text-[10px] uppercase tracking-wider font-bold text-slate-500 block mb-2">
                Qabul qilinadigan to'lov turlari:
              </span>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-black text-cyan-400">
                  Payme
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-black text-blue-400">
                  Click
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-black text-purple-400">
                  Uzum Bank
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-black text-emerald-400">
                  Naqd pul
                </span>
              </div>
            </div>
          </div>

          {/* 2. Quick Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-black uppercase tracking-wider text-white font-display">
              {t.footer.quickLinks}
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#menu" className="hover:text-amber-400 transition-colors flex items-center justify-between group">
                  <span>{t.nav.menu}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </a>
              </li>
              <li>
                <a href="#combos" className="hover:text-amber-400 transition-colors flex items-center justify-between group">
                  <span>{t.nav.combos}</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-red-600 text-white font-black">HOT</span>
                </a>
              </li>
              <li>
                <a href="#builder" className="hover:text-amber-400 transition-colors flex items-center justify-between group">
                  <span>{t.nav.builder}</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-500 text-slate-950 font-black">DIY</span>
                </a>
              </li>
              <li>
                <a href="#delivery" className="hover:text-amber-400 transition-colors flex items-center justify-between group">
                  <span>{t.nav.delivery}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </a>
              </li>
              <li>
                <a href="#drinks" className="hover:text-amber-400 transition-colors flex items-center justify-between group">
                  <span>{t.nav.drinks}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-amber-400 transition-colors flex items-center justify-between group">
                  <span>{t.nav.contact}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </a>
              </li>
              <li>
                <a href="#reviews" className="hover:text-amber-400 transition-colors flex items-center justify-between group">
                  <span>{t.nav.reviews}</span>
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                </a>
              </li>
            </ul>
          </div>

          {/* 3. Bektemir District Focus & Contacts */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-sm font-black uppercase tracking-wider text-white font-display">
              {t.footer.contacts}
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Bektemir tumani, Husayn Boyqaro ko'chasi 42-uy (Rohat aylanmasi chorrahasi)</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <div>
                  <a href="tel:+998712004444" className="hover:text-white font-bold block text-sm text-slate-200">
                    +998 71 200 44 44
                  </a>
                  <span className="text-[10px] text-slate-500">24/7 Yetkazib berish xizmati</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <div>
                  <span className="text-white font-bold block">24/7 Ochiq</span>
                  <span className="text-[10px] text-slate-500">Restoran zali: 10:00 - 03:00</span>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Social Media Channels */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-sm font-black uppercase tracking-wider text-white font-display">
              {t.footer.socials}
            </h4>
            
            <p className="text-[11px] text-slate-400">
              Aksiya, chegirma va yangiliklarni tarmoqlarimizda kuzatib boring:
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              {/* Telegram */}
              <a
                href="https://t.me/doodfood_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 hover:bg-sky-500 hover:border-sky-500 text-slate-300 hover:text-white flex items-center justify-center transition-all group"
                title="Telegram Bot & Kanal"
              >
                <Send className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 hover:bg-pink-600 hover:border-pink-600 text-slate-300 hover:text-white flex items-center justify-center transition-all group"
                title="Instagram"
              >
                <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 hover:bg-blue-600 hover:border-blue-600 text-slate-300 hover:text-white flex items-center justify-center transition-all group"
                title="Facebook"
              >
                <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 hover:bg-red-600 hover:border-red-600 text-slate-300 hover:text-white flex items-center justify-center transition-all group"
                title="YouTube"
              >
                <svg className="w-4 h-4 fill-current group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
            </div>

            <div className="pt-2">
              <a
                href="https://t.me/doodfood_bot"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-500 hover:from-red-700 hover:to-amber-600 text-white text-xs font-black shadow-md transition-colors"
              >
                <span>Telegram Bot Orqali Buyurtma</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Strip */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Dood Food Bektemir. {t.footer.rights}
          </div>
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
            <span>for Bektemir Foodies • 24/7 Fast-Food Delivery</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
