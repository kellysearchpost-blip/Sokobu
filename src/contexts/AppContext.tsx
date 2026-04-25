import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

type Currency = "BIF" | "KES";
type Language = "en" | "fr";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

interface AppContextType {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  language: Language;
  setLanguage: (l: Language) => void;
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  t: (en: string, fr: string) => string;
  formatPrice: (price: number) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const KES_RATE = 0.027; // 1 BIF ≈ 0.027 KES (rough)

export function AppProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrencyState] = useState<Currency>(() =>
    (localStorage.getItem("soko-currency") as Currency) || "BIF"
  );
  const [language, setLanguageState] = useState<Language>(() =>
    (localStorage.getItem("soko-language") as Language) || "en"
  );
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("soko-cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem("soko-wishlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => { localStorage.setItem("soko-currency", currency); }, [currency]);
  useEffect(() => { localStorage.setItem("soko-language", language); }, [language]);
  useEffect(() => { localStorage.setItem("soko-cart", JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem("soko-wishlist", JSON.stringify(wishlist)); }, [wishlist]);

  const setCurrency = (c: Currency) => setCurrencyState(c);
  const setLanguage = (l: Language) => setLanguageState(l);

  const addToCart = (item: Omit<CartItem, "quantity">) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => setCart(prev => prev.filter(i => i.id !== id));
  const updateQuantity = (id: string, qty: number) => {
    if (qty <= 0) return removeFromCart(id);
    setCart(prev => prev.map(i => i.id === id ? { ...i, quantity: qty } : i));
  };
  const clearCart = () => setCart([]);

  const cartCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const cartTotal = cart.reduce((sum, i) => sum + i.price * i.quantity, 0);

  const toggleWishlist = (id: string) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };
  const isInWishlist = (id: string) => wishlist.includes(id);

  const t = (en: string, fr: string) => language === "fr" ? fr : en;

  const formatPrice = (priceBIF: number) => {
    if (currency === "KES") {
      const kes = Math.round(priceBIF * KES_RATE);
      return `KES ${kes.toLocaleString()}`;
    }
    return `${priceBIF.toLocaleString()} BIF`;
  };

  return (
    <AppContext.Provider value={{
      currency, setCurrency, language, setLanguage,
      cart, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, cartTotal,
      wishlist, toggleWishlist, isInWishlist,
      t, formatPrice,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used within AppProvider");
  return ctx;
}
