import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { toast } from 'sonner';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
}

interface CartState {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getCartTotal: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (itemToAdd) => {
        const { items } = get();
        const existingItem = items.find((item) => item.id === itemToAdd.id);

        if (existingItem) {
          const updatedItems = items.map((item) =>
            item.id === itemToAdd.id ? { ...item, quantity: item.quantity + 1 } : item
          );
          set({ items: updatedItems });
        } else {
          set({ items: [...items, { ...itemToAdd, quantity: 1 }] });
        }
        toast.success(`${itemToAdd.name} added to cart!`);
      },
      
      removeItem: (itemId) => {
        const { items } = get();
        const existingItem = items.find((item) => item.id === itemId);

        if (existingItem && existingItem.quantity > 1) {
          const updatedItems = items.map((item) =>
            item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
          );
          set({ items: updatedItems });
        } else {
          set({ items: items.filter((item) => item.id !== itemId) });
        }
        toast.info(`Item removed from cart.`);
      },

      clearCart: () => {
        set({ items: [] });
        toast.warning("Cart has been cleared.");
      },

      getTotalItems: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.quantity, 0);
      },

      getCartTotal: () => {
        const { items } = get();
        return items.reduce((total, item) => total + item.price * item.quantity, 0);
      },
    }),
    {
      name: 'cart-storage', // Name for the localStorage key
      storage: createJSONStorage(() => localStorage), // Use localStorage for persistence
    }
  )
);

