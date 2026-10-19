import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import confetti from 'canvas-confetti';
import { 
  X, 
  CreditCard, 
  Banknote, 
  CheckCircle2, 
  MapPin, 
  Phone, 
  User, 
  ShieldCheck, 
  Lock, 
  Sparkles 
} from 'lucide-react';

export const CheckoutModal = () => {
  const { 
    lang, 
    t, 
    cart, 
    subtotal, 
    deliveryFee, 
    discountAmount, 
    grandTotal, 
    orderType, 
    deliveryZone, 
    zonePricing, 
    orderNotes, 
    clearCart, 
    isCheckoutOpen, 
    setIsCheckoutOpen, 
    setIsOrderSuccessOpen, 
    setLastOrderDetails 
  } = useApp();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('payme'); // 'payme' | 'click' | 'cash' | 'uzum'
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const handlePhoneChange = (e) => {
    let val = e.target.value;
    if (!val.startsWith('+998')) {
      val = '+998 ';
    }
    setPhone(val);
  };

  const handleConfirmOrder = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = `DF-${Math.floor(100000 + Math.random() * 900000)}`;
      const orderData = {
        orderId,
        fullName: fullName || "Salohiddin",
        phone: phone || "+998 90 123 45 67",
        address: address || "Bektemir tumani, Husayn Boyqaro ko'chasi 15-uy",
        paymentMethod,
        orderType,
        total: grandTotal,
        itemsCount: cart.reduce((s, i) => s + i.quantity, 0),
        items: cart,
        estMinutes: 25,
      };

      setLastOrderDetails(orderData);
      setIsSubmitting(false);
      setIsCheckoutOpen(false);
      clearCart();
      setIsOrderSuccessOpen(true);

      // Trigger Confetti Celebration!
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#F59E0B', '#EF4444', '#10B981', '#3B82F6']
        });
      } catch (err) {
        console.error(err);
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-slate-100 dark:border-slate-800 relative my-8">
        
        {/* Close Button */}
        <button
          type="button"
          onClick={() => setIsCheckoutOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 text-xs font-bold mb-2">
            <Lock className="w-3.5 h-3.5" />
            <span>Xavfsiz Rasmiylashtirish</span>
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white font-display">
            {t.checkout.title}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {t.checkout.subtitle}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleConfirmOrder} className="space-y-4">
          
          {/* Full Name */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1 flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.checkout.name}</span>
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder={t.checkout.namePlaceholder}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1 flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span>{t.checkout.phone}</span>
            </label>
            <input
              type="tel"
              required
              value={phone}
              onChange={handlePhoneChange}
              placeholder={t.checkout.phonePlaceholder}
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          {/* Address (If delivery) */}
          {orderType === 'delivery' && (
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-amber-500" />
                <span>{t.checkout.address}</span>
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder={t.checkout.addressPlaceholder}
                className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              />
            </div>
          )}

          {/* Payment Method Selector */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block mb-2">
              {t.checkout.paymentMethod}
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {/* Payme */}
              <button
                type="button"
                onClick={() => setPaymentMethod('payme')}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  paymentMethod === 'payme'
                    ? 'border-cyan-500 bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 font-black ring-2 ring-cyan-500/30'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                <div className="text-xs font-black">Payme</div>
                <div className="text-[10px] opacity-70">Onlayn</div>
              </button>

              {/* Click */}
              <button
                type="button"
                onClick={() => setPaymentMethod('click')}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  paymentMethod === 'click'
                    ? 'border-blue-500 bg-blue-500/10 text-blue-600 dark:text-blue-400 font-black ring-2 ring-blue-500/30'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                <div className="text-xs font-black">Click</div>
                <div className="text-[10px] opacity-70">Onlayn</div>
              </button>

              {/* Uzum Bank */}
              <button
                type="button"
                onClick={() => setPaymentMethod('uzum')}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  paymentMethod === 'uzum'
                    ? 'border-purple-500 bg-purple-500/10 text-purple-600 dark:text-purple-400 font-black ring-2 ring-purple-500/30'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                <div className="text-xs font-black">Uzum Bank</div>
                <div className="text-[10px] opacity-70">Nasiya / Karta</div>
              </button>

              {/* Cash */}
              <button
                type="button"
                onClick={() => setPaymentMethod('cash')}
                className={`p-3 rounded-2xl border text-center transition-all ${
                  paymentMethod === 'cash'
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-black ring-2 ring-emerald-500/30'
                    : 'border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                <div className="text-xs font-black">Naqd pul</div>
                <div className="text-[10px] opacity-70">Qabul qilganda</div>
              </button>
            </div>
          </div>

          {/* Mini Summary Box */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60 flex items-center justify-between text-xs">
            <div>
              <span className="text-slate-400">Jami to'lov:</span>
              <div className="text-lg font-black text-amber-500 font-display">
                {grandTotal.toLocaleString()} {t.menu.currency}
              </div>
            </div>
            <div className="text-right text-[11px] text-slate-500">
              <div>{orderType === 'delivery' ? '⚡ Bektemir kuryeri: ~25 daqiqa' : '🏢 Olib ketish: 15 daqiqa'}</div>
              <div className="text-emerald-500 font-semibold">100% Halol kafolati</div>
            </div>
          </div>

          {/* Confirm Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-600 via-amber-500 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-black text-base shadow-lg hover:shadow-glow-amber transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <CheckCircle2 className="w-5 h-5" />
                <span>{t.checkout.confirmBtn}</span>
              </>
            )}
          </button>

        </form>

      </div>
    </div>
  );
};
