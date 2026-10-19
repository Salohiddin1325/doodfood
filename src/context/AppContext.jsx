import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../data/translations';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // 1. Language state (UZ is default as requested)
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('dood_food_lang') || 'uz';
  });

  // 2. Theme state (Dual Theme: Light / Dark)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('dood_food_theme') || 'dark'; // Dark mode by default for neon fast food vibe
  });

  // 3. Cart State
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem('dood_food_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 4. Modals and Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);
  const [lastOrderDetails, setLastOrderDetails] = useState(null);

  // 5. Checkout & Delivery Config
  const [orderType, setOrderType] = useState('delivery'); // 'delivery' | 'takeaway'
  const [deliveryZone, setDeliveryZone] = useState('rohat');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [orderNotes, setOrderNotes] = useState('');

  // 6. Toast Notification
  const [toast, setToast] = useState(null);

  // Sync theme with HTML class
  useEffect(() => {
    localStorage.setItem('dood_food_theme', theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Sync lang with LocalStorage
  useEffect(() => {
    localStorage.setItem('dood_food_lang', lang);
    document.documentElement.setAttribute('lang', lang);
  }, [lang]);

  // Sync cart with LocalStorage
  useEffect(() => {
    localStorage.setItem('dood_food_cart', JSON.stringify(cart));
  }, [cart]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  const addToCart = (product, selectedOptions = [], customPrice = null, customName = null) => {
    setCart(prev => {
      // Calculate item price including custom add-ons
      const basePrice = customPrice !== null ? customPrice : product.price;
      const optionsPrice = selectedOptions.reduce((acc, opt) => acc + (opt.price || 0), 0);
      const finalUnitCost = basePrice + optionsPrice;

      // Options signature
      const optionsKey = selectedOptions.map(o => o.id).sort().join(',');
      const itemKey = `${product.id || 'custom'}-${optionsKey}`;

      const existingIndex = prev.findIndex(item => item.itemKey === itemKey);

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      } else {
        return [
          ...prev,
          {
            itemKey,
            id: product.id || 'custom',
            name: customName || product.name,
            image: product.image || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80',
            unitPrice: finalUnitCost,
            quantity: 1,
            selectedOptions: selectedOptions,
            isCustom: Boolean(customName),
          }
        ];
      }
    });

    const itemName = customName ? (customName[lang] || customName) : (product.name[lang] || product.name);
    showToast(`${itemName} ${lang === 'uz' ? "savatga qo'shildi!" : lang === 'ru' ? "добавлен в корзину!" : "added to cart!"}`);
  };

  const updateQuantity = (itemKey, delta) => {
    setCart(prev => {
      return prev.map(item => {
        if (item.itemKey === itemKey) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const removeFromCart = (itemKey) => {
    setCart(prev => prev.filter(item => item.itemKey !== itemKey));
  };

  const clearCart = () => {
    setCart([]);
  };

  // Bektemir delivery zone pricing mapping
  const zonePricing = {
    rohat: { name: "Rohat / Husayn Boyqaro", fee: 5000, time: "15-20" },
    center: { name: "Bektemir Markaz / Hokimiyat", fee: 7000, time: "20-25" },
    vodnik: { name: "Vodnik (Suvchilar)", fee: 8000, time: "25-30" },
    binokor: { name: "Binokor qo'rg'oni", fee: 10000, time: "25-35" },
    majnuntol: { name: "Majnuntol / Oltintopgan", fee: 8000, time: "20-25" },
    qoyliq: { name: "Qo'yliq bozor chegarasi", fee: 6000, time: "15-20" },
  };

  // Calculate totals
  const subtotal = cart.reduce((acc, item) => acc + (item.unitPrice * item.quantity), 0);
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Free delivery threshold: 120,000 UZS
  const currentZoneData = zonePricing[deliveryZone] || zonePricing.rohat;
  const isFreeDelivery = subtotal >= 120000 || orderType === 'takeaway';
  const deliveryFee = orderType === 'takeaway' ? 0 : (isFreeDelivery ? 0 : currentZoneData.fee);

  // Discount calculation
  let discountAmount = 0;
  if (appliedPromo) {
    if (appliedPromo.code === 'DOOD20') {
      discountAmount = Math.round(subtotal * 0.20);
    } else if (appliedPromo.code === 'DOODSTUDENT') {
      discountAmount = Math.round(subtotal * 0.15);
    } else if (appliedPromo.code === 'BEKTEMIR') {
      discountAmount = 15000;
    }
  }

  const grandTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  const applyPromoCode = (code) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'DOOD20') {
      setAppliedPromo({ code: 'DOOD20', discount: '20%' });
      showToast(lang === 'uz' ? "20% chegirma faollashtirildi!" : lang === 'ru' ? "Скидка 20% активирована!" : "20% discount applied!");
      return true;
    } else if (clean === 'DOODSTUDENT') {
      setAppliedPromo({ code: 'DOODSTUDENT', discount: '15%' });
      showToast(lang === 'uz' ? "Talaba 15% chegirmasi berildi!" : lang === 'ru' ? "Студенческая скидка 15% применена!" : "Student 15% discount applied!");
      return true;
    } else if (clean === 'BEKTEMIR') {
      setAppliedPromo({ code: 'BEKTEMIR', discount: '15,000 UZS' });
      showToast(lang === 'uz' ? "15,000 so'm chegirma berildi!" : lang === 'ru' ? "Скидка 15 000 сум применена!" : "15,000 UZS discount applied!");
      return true;
    } else {
      showToast(lang === 'uz' ? "Bunday promokod mavjud emas" : lang === 'ru' ? "Неверный промокод" : "Invalid promo code", "error");
      return false;
    }
  };

  const t = translations[lang] || translations.uz;

  return (
    <AppContext.Provider
      value={{
        lang,
        setLang,
        theme,
        toggleTheme,
        t,
        cart,
        addToCart,
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
        deliveryZone,
        setDeliveryZone,
        zonePricing,
        currentZoneData,
        appliedPromo,
        applyPromoCode,
        orderNotes,
        setOrderNotes,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        isOrderSuccessOpen,
        setIsOrderSuccessOpen,
        lastOrderDetails,
        setLastOrderDetails,
        toast,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
