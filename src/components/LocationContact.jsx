import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  Headphones, 
  Sparkles,
  ExternalLink
} from 'lucide-react';

export const LocationContact = () => {
  const { t, showToast } = useApp();

  const [formState, setFormState] = useState({
    name: '',
    phone: '+998 ',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handlePhoneChange = (e) => {
    let val = e.target.value;
    if (!val.startsWith('+998')) {
      val = '+998 ';
    }
    setFormState({ ...formState, phone: val });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    showToast(t.contact.feedbackSuccess);
    setTimeout(() => {
      setFormState({ name: '', phone: '+998 ', message: '' });
      setSubmitted(false);
    }, 4000);
  };

  return (
    <section id="contact" className="py-16 sm:py-24 bg-gradient-to-b from-transparent via-slate-100/60 dark:via-slate-900/60 to-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-100 dark:bg-red-950/60 border border-red-300 dark:border-red-800 text-red-700 dark:text-red-400 text-xs sm:text-sm font-black tracking-wider uppercase mb-3">
            <MapPin className="w-4 h-4 text-red-500" />
            <span>{t.contact.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight font-display">
            {t.contact.title}
          </h2>

          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            {t.contact.subtitle}
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          
          {/* 1. Exact Location */}
          <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 shadow-soft-card border border-slate-100 dark:border-slate-700/70 flex flex-col justify-between group hover:border-amber-500 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-slate-900 dark:text-white font-display mb-1">
                {t.contact.addressTitle}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-semibold mb-2">
                {t.contact.addressValue}
              </p>
              <div className="inline-block px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 text-[11px] font-bold">
                {t.contact.landmark}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/60 flex items-center gap-2">
              <a
                href="https://yandex.uz/maps"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-black text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
              >
                <span>{t.contact.yandexMaps}</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* 2. Opening Hours */}
          <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 shadow-soft-card border border-slate-100 dark:border-slate-700/70 flex flex-col justify-between group hover:border-amber-500 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-slate-900 dark:text-white font-display mb-2">
                {t.contact.hoursTitle}
              </h3>
              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                <div className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span>{t.contact.hoursDelivery}</span>
                </div>
                <div>{t.contact.hoursDineIn}</div>
                <div>{t.contact.hoursTakeaway}</div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/60 text-[11px] text-slate-400">
              📅 Haftaning barcha 7 kunida ochiq
            </div>
          </div>

          {/* 3. Phone Contacts */}
          <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 shadow-soft-card border border-slate-100 dark:border-slate-700/70 flex flex-col justify-between group hover:border-amber-500 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-slate-900 dark:text-white font-display mb-2">
                {t.contact.phoneTitle}
              </h3>
              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400 block">Yagona yetkazish raqami:</span>
                  <a href="tel:+998712004444" className="font-black text-amber-500 hover:underline text-sm">
                    +998 71 200 44 44
                  </a>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block">Filial ma'muri:</span>
                  <a href="tel:+998901234567" className="font-bold text-slate-800 dark:text-slate-200 hover:text-amber-500">
                    +998 90 123 45 67
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/60 text-[11px] text-slate-400">
              📞 Qo'ng'iroqlarni kutish vaqti: ~30 soniya
            </div>
          </div>

          {/* 4. Online Socials & Bot */}
          <div className="bg-white dark:bg-slate-800/90 rounded-3xl p-6 shadow-soft-card border border-slate-100 dark:border-slate-700/70 flex flex-col justify-between group hover:border-amber-500 transition-all">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Send className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-slate-900 dark:text-white font-display mb-2">
                {t.contact.socialTitle}
              </h3>
              <div className="space-y-2 text-xs">
                <a
                  href="https://t.me/doodfood_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-300 font-bold hover:bg-sky-100 transition-colors"
                >
                  <span>Telegram Buyurtma Boti</span>
                  <span>@doodfood_bot</span>
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-2 rounded-xl bg-pink-50 dark:bg-pink-950/40 text-pink-700 dark:text-pink-300 font-bold hover:bg-pink-100 transition-colors"
                >
                  <span>Instagram Sahifamiz</span>
                  <span>@doodfood</span>
                </a>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-700/60 text-[11px] text-emerald-500 font-bold flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>100% Halol sertifikatlangan taomlar</span>
            </div>
          </div>

        </div>

        {/* Interactive Callback / Message Form & Map Route Banner */}
        <div className="bg-white dark:bg-slate-800/95 rounded-3xl p-6 sm:p-10 shadow-2xl border border-slate-100 dark:border-slate-700/80 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Form */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-2">
              <Headphones className="w-5 h-5 text-amber-500" />
              <h3 className="text-xl font-black text-slate-900 dark:text-white font-display">
                {t.contact.feedbackTitle}
              </h3>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
              {t.contact.feedbackDesc}
            </p>

            {submitted ? (
              <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 shrink-0" />
                <div>
                  <div className="font-black text-sm">{t.contact.feedbackSuccess}</div>
                  <div className="text-xs text-emerald-600 dark:text-emerald-400 mt-0.5">Xabaringiz Bektemir filialimiz menejeriga yetkazildi.</div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      {t.contact.feedbackName}
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      placeholder="Masalan, Jamshid"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                      {t.contact.feedbackPhone}
                    </label>
                    <input
                      type="tel"
                      required
                      value={formState.phone}
                      onChange={handlePhoneChange}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                    {t.contact.feedbackMsg}
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Savol, taklif yoki korporativ buyurtma tafsilotlarini yozing..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 via-amber-500 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-black text-xs shadow-md hover:shadow-glow-amber transition-all active:scale-95 flex items-center gap-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{t.contact.feedbackSubmit}</span>
                </button>
              </form>
            )}
          </div>

          {/* Right Visual Card */}
          <div className="lg:col-span-5 bg-gradient-to-br from-slate-900 to-slate-950 rounded-2xl p-6 sm:p-8 text-white border border-slate-800 flex flex-col justify-between relative overflow-hidden">
            <div className="relative z-10 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-[10px] font-black uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Bektemir No.1 Fast Food</span>
              </span>

              <h4 className="text-xl font-black font-display leading-snug">
                Rohat Aylanmasidagi Bosh Restoranimizga Marhamat!
              </h4>

              <p className="text-xs text-slate-400 leading-relaxed">
                Avtoturargoh, bepul Wi-Fi, bolalar uchun burchak va qulay shinam muhit. Do'stlar yoki oila bilan mazali tushlik va kechki ovqat uchun eng qulay maskan.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
                <a
                  href="tel:+998712004444"
                  className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-black text-center shadow-md transition-colors"
                >
                  📞 Qo'ng'iroq Qilish
                </a>
                <a
                  href="https://yandex.uz/maps"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold text-center border border-slate-700 transition-colors"
                >
                  🧭 Marshrutni Ochish
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
