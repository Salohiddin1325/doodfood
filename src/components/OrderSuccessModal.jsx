import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Clock, Send, MapPin, Phone, ChefHat, Bike, Home, Sparkles } from 'lucide-react';

export const OrderSuccessModal = () => {
  const { 
    lang, 
    t, 
    isOrderSuccessOpen, 
    setIsOrderSuccessOpen, 
    lastOrderDetails 
  } = useApp();

  if (!isOrderSuccessOpen || !lastOrderDetails) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-slate-100 dark:border-slate-800 text-center relative overflow-hidden">
        
        {/* Top ambient glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-48 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Success Icon */}
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-500 to-red-500 text-white flex items-center justify-center mx-auto mb-4 shadow-glow-amber animate-bounce-subtle">
          <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
        </div>

        <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white font-display">
          {t.checkout.successTitle}
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
          {t.checkout.successDesc}
        </p>

        {/* Order Details Chip Box */}
        <div className="my-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-100 dark:border-slate-700/60 text-left space-y-2 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-400 font-semibold">{t.checkout.orderId}</span>
            <span className="font-mono font-black text-amber-500 text-sm">{lastOrderDetails.orderId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400 font-semibold">{t.checkout.estArrival}</span>
            <span className="font-black text-emerald-500">~{lastOrderDetails.estMinutes} daqiqa</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400 font-semibold">Mijoz:</span>
            <span className="font-bold text-slate-800 dark:text-slate-200">{lastOrderDetails.fullName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400 font-semibold">Manzil:</span>
            <span className="font-bold text-slate-800 dark:text-slate-200 line-clamp-1">{lastOrderDetails.address}</span>
          </div>
          <div className="flex justify-between pt-1 border-t border-slate-200 dark:border-slate-700">
            <span className="text-slate-400 font-semibold">Jami to'lov:</span>
            <span className="font-black text-slate-900 dark:text-white text-sm">
              {lastOrderDetails.total.toLocaleString()} {t.menu.currency}
            </span>
          </div>
        </div>

        {/* Live Delivery Progress Tracker Steps */}
        <div className="mb-6 py-3 px-2 bg-amber-50/50 dark:bg-amber-950/20 rounded-2xl border border-amber-200/50 dark:border-amber-800/40">
          <div className="flex items-center justify-between relative">
            
            {/* Step 1: Confirmed */}
            <div className="flex flex-col items-center gap-1 z-10">
              <div className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-xs font-bold shadow-sm">
                ✓
              </div>
              <span className="text-[10px] font-bold text-slate-700 dark:text-slate-300">Qabul</span>
            </div>

            {/* Step 2: Cooking */}
            <div className="flex flex-col items-center gap-1 z-10">
              <div className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center text-xs font-bold animate-pulse shadow-md">
                <ChefHat className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-bold text-amber-500">Oshxonada</span>
            </div>

            {/* Step 3: Courier */}
            <div className="flex flex-col items-center gap-1 z-10">
              <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 flex items-center justify-center text-xs font-bold">
                <Bike className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-medium text-slate-400">Yetkazish</span>
            </div>

            {/* Step 4: Done */}
            <div className="flex flex-col items-center gap-1 z-10">
              <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-500 flex items-center justify-center text-xs font-bold">
                <Home className="w-4 h-4" />
              </div>
              <span className="text-[10px] font-medium text-slate-400">Eshikda</span>
            </div>

            {/* Connecting line */}
            <div className="absolute top-4 left-6 right-6 h-0.5 bg-slate-200 dark:bg-slate-700 -z-0" />
            <div className="absolute top-4 left-6 w-1/3 h-0.5 bg-amber-500 -z-0" />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <a
            href={`https://t.me/doodfood_bot?start=${lastOrderDetails.orderId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex-1 inline-flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-bold text-xs shadow-md transition-all active:scale-95"
          >
            <Send className="w-4 h-4" />
            <span>{t.checkout.trackTelegram}</span>
          </a>

          <button
            type="button"
            onClick={() => setIsOrderSuccessOpen(false)}
            className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            {t.checkout.backHome}
          </button>
        </div>

      </div>
    </div>
  );
};
