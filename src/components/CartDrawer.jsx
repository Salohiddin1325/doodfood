import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Bike, 
  Store, 
  Sparkles, 
  Check 
} from 'lucide-react';
import { handleImageError } from '../utils/imageFallback';

export const CartDrawer = () => {
  const { 
    lang, 
    t, 
    cart, 
    updateQuantity, 
    removeFromCart, 
    clearCart, 
    subtotal, 
    totalItemsCount, 
    deliveryFee, 
    discountAmount, 
    grandTotal, 
    isFreeDelivery, 
    orderType, 
    setOrderType, 
    appliedPromo, 
    applyPromoCode, 
    orderNotes, 
    setOrderNotes, 
    isCartOpen, 
    setIsCartOpen, 
    setIsCheckoutOpen 
  } = useApp();

  const [promoInput, setPromoInput] = useState('');

  if (!isCartOpen) return null;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoInput.trim()) {
      applyPromoCode(promoInput);
      setPromoInput('');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-fadeIn"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-slate-900 shadow-2xl flex flex-col justify-between border-l border-slate-100 dark:border-slate-800 animate-slide-left">
          
          {/* Header */}
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white font-display">
                  {t.cart.title}
                </h3>
                <span className="text-xs text-slate-400 font-semibold">
                  {totalItemsCount} {lang === 'uz' ? 'ta taom' : lang === 'ru' ? 'блюд' : 'items'}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            
            {/* Delivery vs Takeaway Switcher */}
            <div className="p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center">
              <button
                type="button"
                onClick={() => setOrderType('delivery')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${
                  orderType === 'delivery'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                <Bike className="w-4 h-4" />
                <span>{t.cart.delivery}</span>
              </button>
              <button
                type="button"
                onClick={() => setOrderType('takeaway')}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-xs font-bold transition-all ${
                  orderType === 'takeaway'
                    ? 'bg-amber-500 text-slate-950 shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
                }`}
              >
                <Store className="w-4 h-4" />
                <span>{t.cart.takeaway}</span>
              </button>
            </div>

            {/* Cart Items List */}
            {cart.length === 0 ? (
              <div className="text-center py-16">
                <ShoppingBag className="w-16 h-16 text-slate-300 dark:text-slate-600 mx-auto mb-4" />
                <h4 className="text-base font-bold text-slate-700 dark:text-slate-300">
                  {t.cart.emptyTitle}
                </h4>
                <p className="text-xs text-slate-400 mt-1 mb-6">
                  {t.cart.emptySubtitle}
                </p>
                <button
                  type="button"
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-black shadow-md hover:bg-amber-400 transition-colors"
                >
                  {t.cart.viewMenu}
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div
                    key={item.itemKey}
                    className="flex items-center gap-3.5 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/50"
                  >
                    <img
                      src={item.image}
                      alt=""
                      className="w-16 h-16 rounded-xl object-cover shrink-0"
                      onError={(e) => handleImageError(e, item.category || 'burgers')}
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-black text-slate-900 dark:text-white truncate">
                        {item.name[lang] || item.name}
                      </h4>

                      {/* Add-ons list if any */}
                      {item.selectedOptions && item.selectedOptions.length > 0 && (
                        <div className="text-[10px] text-amber-600 dark:text-amber-400 truncate">
                          +{item.selectedOptions.map(o => o.name[lang] || o.name).join(', ')}
                        </div>
                      )}

                      <div className="text-xs font-bold text-slate-900 dark:text-white mt-1">
                        {(item.unitPrice * item.quantity).toLocaleString()} {t.menu.currency}
                      </div>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-1.5 bg-white dark:bg-slate-700 rounded-xl p-1 border border-slate-200 dark:border-slate-600">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.itemKey, -1)}
                        className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-200"
                      >
                        <Minus className="w-3 h-3" />
                      </button>

                      <span className="w-5 text-center text-xs font-black text-slate-900 dark:text-white">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        onClick={() => updateQuantity(item.itemKey, 1)}
                        className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-200"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    {/* Remove button */}
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.itemKey)}
                      className="p-1.5 text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Promo Code Input */}
            {cart.length > 0 && (
              <div className="space-y-4 pt-2">
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder={t.cart.promoPlaceholder}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs font-semibold text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500 uppercase"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-bold hover:bg-amber-500 dark:hover:bg-amber-400 transition-colors"
                  >
                    {t.cart.apply}
                  </button>
                </form>

                {appliedPromo && (
                  <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                    <span className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5" />
                      <span>{appliedPromo.code} ({appliedPromo.discount})</span>
                    </span>
                    <span>-{discountAmount.toLocaleString()} {t.menu.currency}</span>
                  </div>
                )}

                {/* Free delivery progress meter */}
                {orderType === 'delivery' && (
                  <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50">
                    <div className="flex items-center justify-between text-[11px] font-bold text-amber-800 dark:text-amber-300 mb-1.5">
                      <span>{t.delivery.freeAbove}</span>
                      <span>{Math.min(100, Math.round((subtotal / 120000) * 100))}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-amber-200 dark:bg-amber-900/60 overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-amber-500 to-red-500 rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, (subtotal / 120000) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Order Notes */}
                <div>
                  <label className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-1.5">
                    {t.cart.notes}
                  </label>
                  <textarea
                    rows={2}
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder={t.cart.notesPlaceholder}
                    className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-white border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>
            )}

          </div>

          {/* Footer & Checkout Action */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-slate-100 dark:border-slate-800 space-y-3 bg-slate-50/50 dark:bg-slate-800/50">
              <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-400">
                <div className="flex justify-between">
                  <span>{t.cart.subtotal}</span>
                  <span className="font-bold text-slate-900 dark:text-white">
                    {subtotal.toLocaleString()} {t.menu.currency}
                  </span>
                </div>

                {appliedPromo && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                    <span>{t.cart.discount}</span>
                    <span className="font-bold">
                      -{discountAmount.toLocaleString()} {t.menu.currency}
                    </span>
                  </div>
                )}

                {orderType === 'delivery' && (
                  <div className="flex justify-between">
                    <span>{t.cart.deliveryFee}</span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      {isFreeDelivery ? (
                        <span className="text-emerald-500 font-black">{t.cart.free}</span>
                      ) : (
                        `${deliveryFee.toLocaleString()} ${t.menu.currency}`
                      )}
                    </span>
                  </div>
                )}

                <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex justify-between text-base font-black text-slate-900 dark:text-white font-display">
                  <span>{t.cart.total}</span>
                  <span className="text-amber-500 text-xl">
                    {grandTotal.toLocaleString()} {t.menu.currency}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleProceedToCheckout}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl bg-gradient-to-r from-red-600 via-amber-500 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-black text-sm shadow-lg hover:shadow-glow-amber transition-all active:scale-95"
              >
                <span>{t.cart.checkout}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
