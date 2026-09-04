"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
  color?: string;
}

interface UIContextType {
  isCartOpen: boolean;
  isSearchOpen: boolean;
  isMobileMenuOpen: boolean;
  cartItems: CartItem[];
  cartCount: number;
  openCart: () => void;
  closeCart: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
}

const UIContext = createContext<UIContextType | null>(null);

const INITIAL_CART: CartItem[] = [
  {
    id: "1",
    name: "Satin Draped Midi Dress",
    price: 2490,
    image: "/images/product-1.jpg",
    size: "S",
    quantity: 1,
    color: "Dusty Rose",
  },
];

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(INITIAL_CART);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const openCart = useCallback(() => {
    setIsCartOpen(true);
    setIsSearchOpen(false);
    setIsMobileMenuOpen(false);
  }, []);

  const closeCart = useCallback(() => setIsCartOpen(false), []);

  const openSearch = useCallback(() => {
    setIsSearchOpen(true);
    setIsCartOpen(false);
    setIsMobileMenuOpen(false);
  }, []);

  const closeSearch = useCallback(() => setIsSearchOpen(false), []);

  const openMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(true);
    setIsCartOpen(false);
    setIsSearchOpen(false);
  }, []);

  const closeMobileMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  const addToCart = useCallback((item: CartItem) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.id === item.id && i.size === item.size);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id && i.size === item.size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, item];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCartItems((prev) => prev.filter((i) => i.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, qty: number) => {
    if (qty <= 0) {
      setCartItems((prev) => prev.filter((i) => i.id !== id));
    } else {
      setCartItems((prev) =>
        prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i))
      );
    }
  }, []);

  return (
    <UIContext.Provider
      value={{
        isCartOpen,
        isSearchOpen,
        isMobileMenuOpen,
        cartItems,
        cartCount,
        openCart,
        closeCart,
        openSearch,
        closeSearch,
        openMobileMenu,
        closeMobileMenu,
        addToCart,
        removeFromCart,
        updateQuantity,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within UIProvider");
  return ctx;
}
