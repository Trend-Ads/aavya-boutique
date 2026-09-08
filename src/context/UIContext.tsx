"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

export interface CartItem {
  id: string;
  slug?: string;
  name: string;
  price: number;
  image: string;
  size: string;
  quantity: number;
  color?: string;
}

export interface WishlistItem {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  colors?: string[];
  inStock?: boolean;
  badge?: string;
  descriptor?: string;
}

interface UIContextType {
  // Drawer / Modal states
  isCartOpen: boolean;
  isSearchOpen: boolean;
  isMobileMenuOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  openSearch: () => void;
  closeSearch: () => void;
  openMobileMenu: () => void;
  closeMobileMenu: () => void;

  // Cart management
  cartItems: CartItem[];
  cartCount: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, qty: number) => void;
  clearCart: () => void;

  // Wishlist management
  wishlistItems: WishlistItem[];
  wishlistCount: number;
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  toggleWishlist: (item: WishlistItem) => void;
  isInWishlist: (id: string) => boolean;
  clearWishlist: () => void;
}

const CART_STORAGE_KEY = "aavya_cart_items_v2";
const WISHLIST_STORAGE_KEY = "aavya_wishlist_items_v1";

// Safe fallback context so methods are NEVER undefined
const defaultUIContext: UIContextType = {
  isCartOpen: false,
  isSearchOpen: false,
  isMobileMenuOpen: false,
  openCart: () => {},
  closeCart: () => {},
  openSearch: () => {},
  closeSearch: () => {},
  openMobileMenu: () => {},
  closeMobileMenu: () => {},
  cartItems: [],
  cartCount: 0,
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  wishlistItems: [],
  wishlistCount: 0,
  addToWishlist: () => {},
  removeFromWishlist: () => {},
  toggleWishlist: () => {},
  isInWishlist: () => false,
  clearWishlist: () => {},
};

const UIContext = createContext<UIContextType>(defaultUIContext);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  // 1. Hydrate from localStorage once on client mount
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const savedCart = localStorage.getItem(CART_STORAGE_KEY);
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setCartItems(parsed);
        }
      }

      const savedWishlist = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (savedWishlist) {
        const parsed = JSON.parse(savedWishlist);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setWishlistItems(parsed);
        }
      }
    } catch (e) {
      console.error("Error reading cart/wishlist from localStorage:", e);
    }

    // Synchronize across tabs
    const handleStorage = (e: StorageEvent) => {
      if (e.key === CART_STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) setCartItems(parsed);
        } catch {}
      }
      if (e.key === WISHLIST_STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) setWishlistItems(parsed);
        } catch {}
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  const cartCount = cartItems.reduce((sum, item) => sum + (item.quantity || 1), 0);
  const wishlistCount = wishlistItems.length;

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

  // Helper to persist cart directly
  const saveCartToStorage = (items: CartItem[]) => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
      }
    } catch (e) {
      console.error("Failed to save cart to localStorage:", e);
    }
  };

  // Helper to persist wishlist directly
  const saveWishlistToStorage = (items: WishlistItem[]) => {
    try {
      if (typeof window !== "undefined") {
        localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
      }
    } catch (e) {
      console.error("Failed to save wishlist to localStorage:", e);
    }
  };

  // Cart operations
  const addToCart = useCallback((item: CartItem) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (i) =>
          i.id === item.id ||
          (i.name === item.name &&
            i.size === item.size &&
            (i.color || "") === (item.color || ""))
      );

      let updated: CartItem[];
      if (existingIdx > -1) {
        updated = prev.map((i, idx) =>
          idx === existingIdx
            ? { ...i, quantity: i.quantity + (item.quantity || 1) }
            : i
        );
      } else {
        updated = [...prev, { ...item, quantity: item.quantity || 1 }];
      }

      saveCartToStorage(updated);
      return updated;
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCartItems((prev) => {
      const updated = prev.filter((i) => i.id !== id);
      saveCartToStorage(updated);
      return updated;
    });
  }, []);

  const updateQuantity = useCallback((id: string, qty: number) => {
    setCartItems((prev) => {
      let updated: CartItem[];
      if (qty <= 0) {
        updated = prev.filter((i) => i.id !== id);
      } else {
        updated = prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i));
      }
      saveCartToStorage(updated);
      return updated;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem(CART_STORAGE_KEY);
      }
    } catch {}
  }, []);

  // Wishlist operations
  const addToWishlist = useCallback((item: WishlistItem) => {
    setWishlistItems((prev) => {
      if (prev.some((i) => i.id === item.id)) return prev;
      const updated = [...prev, item];
      saveWishlistToStorage(updated);
      return updated;
    });
  }, []);

  const removeFromWishlist = useCallback((id: string) => {
    setWishlistItems((prev) => {
      const updated = prev.filter((i) => i.id !== id);
      saveWishlistToStorage(updated);
      return updated;
    });
  }, []);

  const toggleWishlist = useCallback((item: WishlistItem) => {
    setWishlistItems((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      const updated = exists
        ? prev.filter((i) => i.id !== item.id)
        : [...prev, item];
      saveWishlistToStorage(updated);
      return updated;
    });
  }, []);

  const isInWishlist = useCallback(
    (id: string) => {
      return wishlistItems.some((i) => i.id === id);
    },
    [wishlistItems]
  );

  const clearWishlist = useCallback(() => {
    setWishlistItems([]);
    try {
      if (typeof window !== "undefined") {
        localStorage.removeItem(WISHLIST_STORAGE_KEY);
      }
    } catch {}
  }, []);

  return (
    <UIContext.Provider
      value={{
        isCartOpen,
        isSearchOpen,
        isMobileMenuOpen,
        openCart,
        closeCart,
        openSearch,
        closeSearch,
        openMobileMenu,
        closeMobileMenu,
        cartItems,
        cartCount,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        wishlistItems,
        wishlistCount,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isInWishlist,
        clearWishlist,
      }}
    >
      {children}
    </UIContext.Provider>
  );
}

export function useUI(): UIContextType {
  const ctx = useContext(UIContext);
  return ctx || defaultUIContext;
}
