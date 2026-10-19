export const combosData = [
  {
    id: "combo-solo",
    tier: "solo",
    name: {
      uz: "Solo Quick Meal (Yakkaxon To'plam)",
      ru: "Соло Квик Комбо (Быстрый Ланч)",
      en: "Solo Quick Meal (Single Combo)",
    },
    description: {
      uz: "Klassik smash burger yoki go'shtli lavash, qarsildoq oltin fri va muzdek 0.5L gazli ichimlik",
      ru: "Классический бургер или лаваш, золотистый картофель фри и прохладная газировка 0.5L",
      en: "Classic beef burger or tender lavash, golden crispy fries, and chilled 0.5L soda",
    },
    badge: "hotDeal", // hotDeal | popular | bestValue | nightDeal
    badgeText: {
      uz: "⚡ Tezkor & To'yimli",
      ru: "⚡ Быстро и Сытно",
      en: "⚡ Quick & Filling",
    },
    basePrice: 46000,
    originalPrice: 58000,
    saving: 12000,
    calories: "820 kcal",
    weight: "520 g",
    rating: 4.9,
    reviewsCount: 312,
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&w=800&q=80",
    itemsSummary: {
      uz: ["1x Klassik Burger / Lavash", "1x Kichik Kartoshka Fri", "1x Gazli Ichimlik 0.5L"],
      ru: ["1x Классический бургер / лаваш", "1x Маленький картофель фри", "1x Напиток 0.5L на выбор"],
      en: ["1x Classic Burger / Lavash", "1x Small Golden Fries", "1x 0.5L Chilled Soda"],
    },
    slots: {
      main: {
        label: { uz: "Asosiy Taom", ru: "Основное блюдо", en: "Main Dish" },
        options: [
          { id: "burger-classic", name: { uz: "Klassik Beef Burger", ru: "Классический Биф Бургер", en: "Classic Beef Burger" }, extraPrice: 0 },
          { id: "lavash-beef", name: { uz: "Sersuv Go'shtli Lavash", ru: "Сочный Говяжий Лаваш", en: "Juicy Beef Lavash" }, extraPrice: 2000 },
          { id: "burger-double", name: { uz: "Monster Double Cheese (+7k)", ru: "Монстр Дабл Чиз (+7k)", en: "Monster Double Cheese (+7k)" }, extraPrice: 7000 },
        ]
      },
      side: {
        label: { uz: "Qo'shimcha / Fri", ru: "Гарнир / Закуска", en: "Side / Fries" },
        options: [
          { id: "fries-small", name: { uz: "Kichik Kartoshka Fri", ru: "Маленький Картофель Фри", en: "Small Crispy Fries" }, extraPrice: 0 },
          { id: "fries-cheese", name: { uz: "Pishloqli Fri (+5k)", ru: "Сырный Фри (+5k)", en: "Loaded Cheese Fries (+5k)" }, extraPrice: 5000 },
          { id: "nuggets-4", name: { uz: "4x Naggetslar (+7k)", ru: "4x Наггетсы (+7k)", en: "4x Crunchy Nuggets (+7k)" }, extraPrice: 7000 },
        ]
      },
      drink: {
        label: { uz: "Ichimlik (0.5L)", ru: "Напиток (0.5L)", en: "Beverage (0.5L)" },
        options: [
          { id: "cola-05", name: { uz: "Coca-Cola 0.5L", ru: "Coca-Cola 0.5L", en: "Coca-Cola 0.5L" }, extraPrice: 0 },
          { id: "pepsi-05", name: { uz: "Pepsi 0.5L", ru: "Pepsi 0.5L", en: "Pepsi 0.5L" }, extraPrice: 0 },
          { id: "fanta-05", name: { uz: "Fanta Orange 0.5L", ru: "Fanta Orange 0.5L", en: "Fanta Orange 0.5L" }, extraPrice: 0 },
          { id: "sprite-05", name: { uz: "Sprite 0.5L", ru: "Sprite 0.5L", en: "Sprite 0.5L" }, extraPrice: 0 },
          { id: "mojito-craft", name: { uz: "Mualliflik Mojito (+6k)", ru: "Крафтовый Мохито (+6k)", en: "Craft Mojito (+6k)" }, extraPrice: 6000 },
        ]
      }
    }
  },
  {
    id: "combo-duo",
    tier: "duo",
    name: {
      uz: "Duo Friends Feast (Do'stlar Combosi)",
      ru: "Дуо Комбо для Друзей",
      en: "Duo / Friends Feast Combo",
    },
    description: {
      uz: "2 ta to'yimli burger yoki lavash, katta porsiyali qarsildoq fri, 6 dona tovuqli naggets va 2 ta yaxna ichimlik (yoki 1.0L Cola)",
      ru: "2 сытных бургера или лаваша, большая порция хрустящего картофеля фри, 6 наггетсов и 2 напитка (или 1L Cola)",
      en: "2 hearty burgers or lavash wraps, large golden fries, 6 crispy chicken nuggets, and 2 chilled drinks (or 1L bottle)",
    },
    badge: "popular",
    badgeText: {
      uz: "👥 Ommabop Duo",
      ru: "👥 Хит для Двоих",
      en: "👥 Popular Duo",
    },
    basePrice: 89000,
    originalPrice: 115000,
    saving: 26000,
    calories: "1480 kcal",
    weight: "980 g",
    rating: 5.0,
    reviewsCount: 450,
    image: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d?auto=format&fit=crop&w=800&q=80",
    itemsSummary: {
      uz: ["2x Burger yoki Lavash", "1x Katta Kartoshka Fri", "6x Qarsildoq Naggetslar", "2x Ichimlik 0.5L (yoki 1L)"],
      ru: ["2x Бургера или Лаваша", "1x Большая порция фри", "6x Хрустящих наггетсов", "2x Напитка 0.5L или 1L"],
      en: ["2x Gourmet Burgers or Lavash", "1x Large Golden Fries", "6x Crispy Nuggets", "2x 0.5L Drinks or 1L Bottle"],
    },
    slots: {
      main: {
        label: { uz: "2x Asosiy Taom", ru: "2x Основных блюда", en: "2x Mains" },
        options: [
          { id: "duo-mix", name: { uz: "1x Burger + 1x Sersuv Lavash", ru: "1x Бургер + 1x Лаваш", en: "1x Burger + 1x Lavash" }, extraPrice: 0 },
          { id: "duo-burgers", name: { uz: "2x Klassik Beef Burger", ru: "2x Классических бургера", en: "2x Classic Beef Burgers" }, extraPrice: 0 },
          { id: "duo-lavashes", name: { uz: "2x Sersuv Sirli Lavash", ru: "2x Сырных сочных лаваша", en: "2x Cheesy Beef Lavash" }, extraPrice: 3000 },
          { id: "duo-monsters", name: { uz: "2x Monster Double Burger (+12k)", ru: "2x Монстр Дабл Бургера (+12k)", en: "2x Monster Double Burgers (+12k)" }, extraPrice: 12000 },
        ]
      },
      side: {
        label: { uz: "Qo'shimcha & Naggets", ru: "Гарнир и Снеки", en: "Sides & Bites" },
        options: [
          { id: "fries-lg-nuggets", name: { uz: "Katta Fri + 6x Naggets", ru: "Большой фри + 6 наггетсов", en: "Large Fries + 6 Nuggets" }, extraPrice: 0 },
          { id: "fries-cheese-nuggets", name: { uz: "Pishloqli Katta Fri + 6x Naggets (+6k)", ru: "Сырный фри + 6 наггетсов (+6k)", en: "Cheese Large Fries + 6 Nuggets (+6k)" }, extraPrice: 6000 },
          { id: "fries-wings", name: { uz: "Katta Fri + 4x Qarsildoq Qanotcha (+8k)", ru: "Большой фри + 4 хрустящих крылышка (+8k)", en: "Large Fries + 4 Crispy Wings (+8k)" }, extraPrice: 8000 },
        ]
      },
      drink: {
        label: { uz: "Ichimlik Tanlovi", ru: "Выбор напитков", en: "Drinks Option" },
        options: [
          { id: "drink-2x-cola", name: { uz: "2x Coca-Cola 0.5L", ru: "2x Coca-Cola 0.5L", en: "2x Coca-Cola 0.5L" }, extraPrice: 0 },
          { id: "drink-1l-cola", name: { uz: "1x Katta Coca-Cola 1.0L", ru: "1x Большая Coca-Cola 1.0L", en: "1x Coca-Cola 1.0L Bottle" }, extraPrice: 0 },
          { id: "drink-mix-soda", name: { uz: "1x Cola + 1x Fanta 0.5L", ru: "1x Cola + 1x Fanta 0.5L", en: "1x Cola + 1x Fanta 0.5L" }, extraPrice: 0 },
          { id: "drink-2x-mojito", name: { uz: "2x Mualliflik Muzdek Mojito (+10k)", ru: "2x Крафтовых ледяных мохито (+10k)", en: "2x Chilled Craft Mojitos (+10k)" }, extraPrice: 10000 },
        ]
      }
    }
  },
  {
    id: "combo-family",
    tier: "family",
    name: {
      uz: "Bektemir Mega Party Box (Oila & Bayram)",
      ru: "Семейный Мега Пати Бокс (Бектемир)",
      en: "Bektemir Mega Family Party Box",
    },
    description: {
      uz: "4 ta signature burger/lavash, 2 ta katta kartoshka fri, eruvchan mozzarella pishloq tayoqchalari (6 dona), qarsildoq tovuq stripsi (4 dona), 3 xil sous va 1.5L muzdek Coca-Cola / Pepsi!",
      ru: "4 фирменных бургера/лаваша, 2 больших фри, корзина сырных палочек моцарелла (6 шт), хрустящие стрипсы (4 шт), 3 соуса и 1.5L Coca-Cola / Pepsi!",
      en: "4 signature burgers/lavash, 2 large fries, basket of stretchy mozzarella sticks (6 pcs), crispy chicken strips (4 pcs), 3 dips, and a 1.5L Coca-Cola / Pepsi bottle!",
    },
    badge: "bestValue",
    badgeText: {
      uz: "🏆 Eng Katta Foyda -30%",
      ru: "🏆 Максимальная Выгода -30%",
      en: "🏆 Best Value -30%",
    },
    basePrice: 178000,
    originalPrice: 245000,
    saving: 67000,
    calories: "2850 kcal",
    weight: "1850 g",
    rating: 5.0,
    reviewsCount: 520,
    image: "https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=800&q=80",
    itemsSummary: {
      uz: ["4x Signature Burger yoki Lavash", "2x Katta Kartoshka Fri", "6x Mozzarella Tayoqchalari", "4x Tovuq Stripslari", "3x Sous", "1x Coca-Cola / Pepsi 1.5L"],
      ru: ["4x Фирменных бургера/лаваша", "2x Больших картофеля фри", "6x Сырных палочек", "4x Куриных стрипса", "3x Соуса", "1x 1.5L Coca-Cola / Pepsi"],
      en: ["4x Signature Burgers/Lavash", "2x Large Crispy Fries", "6x Mozzarella Sticks", "4x Chicken Strips", "3x Dips", "1x 1.5L Coca-Cola / Pepsi"],
    },
    slots: {
      main: {
        label: { uz: "4x Asosiy Taomlar", ru: "4x Основных блюда", en: "4x Main Sandwiches" },
        options: [
          { id: "family-mix-2-2", name: { uz: "2x Burger + 2x Sirli Lavash", ru: "2x Бургера + 2x Сырных Лаваша", en: "2x Burgers + 2x Cheesy Lavash" }, extraPrice: 0 },
          { id: "family-all-burgers", name: { uz: "4x Klassik Beef Burger", ru: "4x Классических Бургера", en: "4x Classic Beef Burgers" }, extraPrice: 0 },
          { id: "family-all-lavash", name: { uz: "4x Sersuv Go'shtli Lavash", ru: "4x Сочных Говяжьих Лаваша", en: "4x Juicy Beef Lavash" }, extraPrice: 4000 },
          { id: "family-monster-upgrade", name: { uz: "4x Monster Double Burger (+20k)", ru: "4x Монстр Дабл Бургера (+20k)", en: "4x Monster Double Burgers (+20k)" }, extraPrice: 20000 },
        ]
      },
      side: {
        label: { uz: "Qo'shimcha To'plam", ru: "Набор Закусок", en: "Snack Platter" },
        options: [
          { id: "party-sides-classic", name: { uz: "2x Katta Fri + Mozzarella + Strips (Standart)", ru: "2x Фри + Сырные палочки + Стрипсы", en: "2x Large Fries + Cheese Sticks + Strips" }, extraPrice: 0 },
          { id: "party-sides-cheese-load", name: { uz: "2x Pishloqli Fri + Mozzarella + Strips (+9k)", ru: "2x Сырных Фри + Палочки + Стрипсы (+9k)", en: "2x Cheese Fries + Sticks + Strips (+9k)" }, extraPrice: 9000 },
          { id: "party-sides-wings-combo", name: { uz: "2x Katta Fri + 8x Qarsildoq Qanotchalar (+14k)", ru: "2x Фри + 8 Крылышек (+14k)", en: "2x Large Fries + 8 Crispy Wings (+14k)" }, extraPrice: 14000 },
        ]
      },
      drink: {
        label: { uz: "1.5L Gazli Ichimlik", ru: "1.5L Газировка", en: "1.5L Big Bottle" },
        options: [
          { id: "party-cola-15", name: { uz: "Coca-Cola Classic 1.5L", ru: "Coca-Cola Classic 1.5L", en: "Coca-Cola Classic 1.5L" }, extraPrice: 0 },
          { id: "party-pepsi-15", name: { uz: "Pepsi Max 1.5L", ru: "Pepsi Max 1.5L", en: "Pepsi Max 1.5L" }, extraPrice: 0 },
          { id: "party-fanta-15", name: { uz: "Fanta Orange 1.5L", ru: "Fanta Orange 1.5L", en: "Fanta Orange 1.5L" }, extraPrice: 0 },
          { id: "party-mojito-4x", name: { uz: "4x Mualliflik Fresh Mojito 0.5L (+16k)", ru: "4x Крафтовых Мохито 0.5L (+16k)", en: "4x Craft Mojito Cups 0.5L (+16k)" }, extraPrice: 16000 },
        ]
      }
    }
  },
  {
    id: "combo-night",
    tier: "night",
    name: {
      uz: "Night Owl Bektemir Snack (Tungi Combosi)",
      ru: "Ночной Перекус Бектемир (Снек Комбо)",
      en: "Night Owl Bektemir Snack Combo",
    },
    description: {
      uz: "Soat 22:00 dan tonggacha: qaynoq smash cheeseburger, 4 dona xushbo'y qarsildoq qanotchalar va issiq espresso/cappuccino yoki limonli tog' choyi",
      ru: "С 22:00 до утра: сочный чизбургер, 4 хрустящих острых крылышка и согревающий кофе (американо/капучино) или чай с лимоном",
      en: "Late night exclusive: sizzling cheeseburger, 4 spicy chicken wings, and hot barista coffee or lemon mountain tea",
    },
    badge: "nightDeal",
    badgeText: {
      uz: "🌙 Tungi Qaynoq Taklif",
      ru: "🌙 Ночной Горячий Хит",
      en: "🌙 Midnight Special",
    },
    basePrice: 56000,
    originalPrice: 72000,
    saving: 16000,
    calories: "920 kcal",
    weight: "560 g",
    rating: 4.8,
    reviewsCount: 184,
    image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=800&q=80",
    itemsSummary: {
      uz: ["1x Sersuv Cheeseburger", "4x Qarsildoq Qanotchalar", "1x Qaynoq Qahva / Choy"],
      ru: ["1x Сочный чизбургер", "4x Хрустящих крылышка", "1x Горячий кофе или горный чай"],
      en: ["1x Juicy Cheeseburger", "4x Crispy Chicken Wings", "1x Hot Coffee or Mountain Tea"],
    },
    slots: {
      main: {
        label: { uz: "Burger Turi", ru: "Бургер", en: "Burger Choice" },
        options: [
          { id: "night-burger-cheese", name: { uz: "Klassik Double Cheeseburger", ru: "Классический дабл чизбургер", en: "Classic Double Cheeseburger" }, extraPrice: 0 },
          { id: "night-burger-zinger", name: { uz: "Achchiq Zinger Tovuq Burger (+4k)", ru: "Острый Зингер Чикен Бургер (+4k)", en: "Spicy Zinger Chicken Burger (+4k)" }, extraPrice: 4000 },
        ]
      },
      side: {
        label: { uz: "Qarsildoq Gazak", ru: "Хрустящая закуска", en: "Crispy Snack" },
        options: [
          { id: "night-wings-4", name: { uz: "4x Qarsildoq Qanotchalar (Standart)", ru: "4x Хрустящих крылышка", en: "4x Crispy Wings" }, extraPrice: 0 },
          { id: "night-sticks-6", name: { uz: "6x Mozzarella Tayoqchalari (+5k)", ru: "6x Сырных палочек моцарелла (+5k)", en: "6x Mozzarella Sticks (+5k)" }, extraPrice: 5000 },
          { id: "night-strips-4", name: { uz: "4x Oltin Tovuq Stripslari (+5k)", ru: "4x Куриных стрипса (+5k)", en: "4x Golden Chicken Strips (+5k)" }, extraPrice: 5000 },
        ]
      },
      drink: {
        label: { uz: "Qaynoq Ichimlik", ru: "Горячий напиток", en: "Hot Drink" },
        options: [
          { id: "night-americano", name: { uz: "Qaynoq Americano Roast", ru: "Горячий Американо", en: "Hot Americano Roast" }, extraPrice: 0 },
          { id: "night-cappuccino", name: { uz: "Mayin Cappuccino Cream", ru: "Нежный Капучино с пенкой", en: "Silky Cappuccino Cream" }, extraPrice: 0 },
          { id: "night-tea-lemon", name: { uz: "Limonli va Yalpizli Qora Choy", ru: "Черный чай с лимоном и мятой", en: "Black Tea with Lemon & Mint" }, extraPrice: 0 },
          { id: "night-latte", name: { uz: "Vanilla Latte Macchiato (+3k)", ru: "Ванильный Латте (+3k)", en: "Vanilla Latte (+3k)" }, extraPrice: 3000 },
          { id: "night-cola-cold", name: { uz: "Muzdek Coca-Cola 0.5L (Agar sovuq istasangiz)", ru: "Ледяная Coca-Cola 0.5L", en: "Ice-cold Coca-Cola 0.5L" }, extraPrice: 0 },
        ]
      }
    }
  }
];
