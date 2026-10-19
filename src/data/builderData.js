export const builderIngredients = {
  bases: [
    // Burger
    {
      id: "brioche-bun",
      name: { uz: "Yaltiroq Briosh Non", ru: "Глянцевая Бриошь Булочка", en: "Glazed Brioche Bun" },
      price: 8000,
      calories: 180,
      type: "burger",
      color: "#F59E0B"
    },
    {
      id: "black-artisan-bun",
      name: { uz: "Qora Mualliflik Briosh", ru: "Черная Крафтовая Бриошь", en: "Artisan Black Brioche Bun" },
      price: 9000,
      calories: 190,
      type: "burger",
      color: "#1F2937"
    },

    // Hamburger
    {
      id: "sesame-bun",
      name: { uz: "Kunjutli Klassik Bulochka", ru: "Классическая с кунжутом", en: "Classic Sesame Hamburger Bun" },
      price: 6000,
      calories: 160,
      type: "hamburger",
      color: "#D97706"
    },
    {
      id: "soft-milk-bun",
      name: { uz: "Mayin Sutli Bulochka", ru: "Нежная молочная булочка", en: "Soft Golden Milk Bun" },
      price: 7000,
      calories: 170,
      type: "hamburger",
      color: "#FBBF24"
    },

    // Lavash
    {
      id: "crispy-lavash",
      name: { uz: "Yupqa Qarsildoq Lavash", ru: "Тонкий Хрустящий Лаваш", en: "Thin Crispy Flatbread Wrap" },
      price: 6000,
      calories: 140,
      type: "lavash",
      color: "#E2E8F0"
    },
    {
      id: "cheese-crust-lavash",
      name: { uz: "Pishloqli Xamir Lavash", ru: "Сырный Хрустящий Лаваш", en: "Cheese-Crust Flatbread Wrap" },
      price: 9000,
      calories: 210,
      type: "lavash",
      color: "#FDE68A"
    },

    // Doner
    {
      id: "turkish-tombik",
      name: { uz: "Turkcha Yumshoq Tombik Non", ru: "Турецкая Пышная Лепешка Томбик", en: "Fluffy Turkish Tombik Bread" },
      price: 7000,
      calories: 185,
      type: "doner",
      color: "#D97706"
    },
    {
      id: "sesame-pide",
      name: { uz: "Qarsildoq Kunjutli Pide", ru: "Хрустящая Кунжутная Пиде", en: "Crispy Sesame Pide Bread" },
      price: 8000,
      calories: 195,
      type: "doner",
      color: "#B45309"
    },

    // Club Sandwich
    {
      id: "triple-toast",
      name: { uz: "3 Qavatli Tost Noni", ru: "3 Слоя Тостового Хлеба", en: "Triple-Decker Artisan Toast" },
      price: 7000,
      calories: 175,
      type: "clubSandwich",
      color: "#FCD34D"
    },
    {
      id: "whole-wheat-toast",
      name: { uz: "Donli Qovurilgan Tost", ru: "Зерновой Хрустящий Тост", en: "Whole Wheat Crunchy Toast" },
      price: 8000,
      calories: 160,
      type: "clubSandwich",
      color: "#B45309"
    }
  ],

  meats: [
    {
      id: "beef-patty-150g",
      name: { uz: "Sersuv Mol Go'shti (150g)", ru: "Сочная говяжья котлета (150г)", en: "Halal Beef Smash Patty (150g)" },
      price: 24000,
      calories: 290,
      color: "#78350F"
    },
    {
      id: "double-beef-patty",
      name: { uz: "Qo'shaloq Mol Go'shti (2x100g)", ru: "Двойная говяжья котлета (2x100г)", en: "Double Beef Patty (2x100g)" },
      price: 35000,
      calories: 420,
      color: "#5C2607"
    },
    {
      id: "crispy-chicken",
      name: { uz: "Qarsildoq Tovuq Filesi", ru: "Хрустящее филе цыпленка", en: "Crispy Fried Chicken Breast" },
      price: 20000,
      calories: 250,
      color: "#D97706"
    },
    {
      id: "shawarma-beef",
      name: { uz: "Vertikal Gril Doner Go'shti (160g)", ru: "Мясо донер с вертела (160г)", en: "Spit-Roasted Doner Beef (160g)" },
      price: 23000,
      calories: 270,
      color: "#92400E"
    },
    {
      id: "beef-bacon-meat",
      name: { uz: "Dudlangan Mol Go'shti Bekoni (Saxiy)", ru: "Копченый говяжий бекон (щедрая порция)", en: "Smoked Halal Beef Bacon Cuts" },
      price: 22000,
      calories: 260,
      color: "#991B1B"
    }
  ],

  cheeses: [
    {
      id: "aged-cheddar",
      name: { uz: "Erigan Qora Chedder", ru: "Тающий Чеддер", en: "Melted Aged Cheddar" },
      price: 7000,
      calories: 110,
      color: "#FBBF24"
    },
    {
      id: "stretch-mozzarella",
      name: { uz: "Cho'ziluvchan Mozzarella", ru: "Тягучая Моцарелла", en: "Stretchy Mozzarella" },
      price: 8000,
      calories: 95,
      color: "#FEF3C7"
    },
    {
      id: "american-cheese",
      name: { uz: "Amerikan Krem-Pishloq", ru: "Американский сыр пластинками", en: "American Cheese Slices" },
      price: 6000,
      calories: 100,
      color: "#FCD34D"
    },
    {
      id: "spicy-pepperjack",
      name: { uz: "Achchiq Pepper Jack", ru: "Пикантный Пеппер Джек", en: "Spicy Pepper Jack" },
      price: 9000,
      calories: 105,
      color: "#FDE047"
    },
    {
      id: "none-cheese",
      name: { uz: "Pishloqsiz (0 so'm)", ru: "Без сыра (0 сум)", en: "No Cheese (0 UZS)" },
      price: 0,
      calories: 0,
      color: "transparent"
    }
  ],

  veggies: [
    {
      id: "pickles",
      name: { uz: "Qarsildoq Tuzlangan Bodring", ru: "Хрустящие маринованные огурцы", en: "Crispy Pickled Gherkins" },
      price: 3000,
      calories: 15,
      color: "#15803D"
    },
    {
      id: "jalapeno",
      name: { uz: "Olovli Xalapeno Qalampiri", ru: "Острый перец халапеньо", en: "Fire Jalapeno Slices" },
      price: 4000,
      calories: 10,
      color: "#16A34A"
    },
    {
      id: "crispy-bacon-strips",
      name: { uz: "Qarsildoq Mol Bekoni Bo'laklari", ru: "Хрустящий говяжий бекон", en: "Crispy Halal Beef Bacon Strips" },
      price: 8000,
      calories: 120,
      color: "#991B1B"
    },
    {
      id: "fresh-tomato",
      name: { uz: "Yangi Pomidor Bo'laklari", ru: "Свежие сочные томаты", en: "Fresh Vine Tomatoes" },
      price: 3000,
      calories: 20,
      color: "#DC2626"
    },
    {
      id: "crispy-lettuce",
      name: { uz: "Qarsildoq Aysberg Salati", ru: "Хрустящий салат айсберг", en: "Crisp Iceberg Lettuce" },
      price: 3000,
      calories: 10,
      color: "#22C55E"
    },
    {
      id: "caramelized-onion",
      name: { uz: "Karamellangan Shirin Piyoz", ru: "Карамелизированный лук", en: "Caramelized Sweet Onion" },
      price: 4000,
      calories: 45,
      color: "#B45309"
    },
    {
      id: "mushrooms",
      name: { uz: "Qovurilgan Sarimsoqli Qo'ziqorin", ru: "Жареные шампиньоны с чесноком", en: "Sautéed Garlic Mushrooms" },
      price: 5000,
      calories: 40,
      color: "#78716C"
    },
    {
      id: "fries-inside",
      name: { uz: "Ichiga Qarsildoq Fri", ru: "Картофель фри внутрь", en: "Crispy Fries Inside" },
      price: 5000,
      calories: 110,
      color: "#EAB308"
    }
  ],

  sauces: [
    {
      id: "dood-signature",
      name: { uz: "Dood Mualliflik Maxsus Sousi", ru: "Фирменный секретный соус Dood", en: "Dood Secret House Sauce" },
      price: 4000,
      calories: 60,
      color: "#EA580C"
    },
    {
      id: "garlic-mayo",
      name: { uz: "Ko'katli Oq Sarimsoq Sousi", ru: "Чесночный белый соус с зеленью", en: "Creamy Garlic Herb Mayo" },
      price: 4000,
      calories: 70,
      color: "#F3F4F6"
    },
    {
      id: "smoky-bbq",
      name: { uz: "Dudlangan Texas BBQ", ru: "Копченый Техасский BBQ", en: "Smoky Texas Barbecue" },
      price: 4000,
      calories: 50,
      color: "#7C2D12"
    },
    {
      id: "fire-sriracha",
      name: { uz: "Achchiq Sriracha Mayo", ru: "Острая Шрирача Майо", en: "Fiery Sriracha Mayo" },
      price: 4000,
      calories: 35,
      color: "#B91C1C"
    },
    {
      id: "chipotle",
      name: { uz: "Dudli Olovli Chipotle", ru: "Огненный соус Чипотле", en: "Smoky Fire Chipotle" },
      price: 4000,
      calories: 45,
      color: "#991B1B"
    }
  ]
};
