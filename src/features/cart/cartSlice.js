import { createSlice } from "@reduxjs/toolkit";

export const getUserStorageKey = () => {
  try {
    const rawUser = localStorage.getItem("user");
    const user = rawUser ? JSON.parse(rawUser) : null;
    if (user) {
      const uid = user._id || user.id || user.email || "unknown";
      return `cartItems_${uid}`;
    }
    return "cartItems_guest";
  } catch (e) {
    return "cartItems_guest";
  }
};

// Note: avoid reading storage at module import time to prevent loading another
// user's cart before app-level migration runs. Initialization is handled in
// App.jsx which dispatches `setCart` after user info is available.
const loadFromStorage = () => [];

const saveToStorage = (items) => {
  try {
    const key = getUserStorageKey();
    if (key === "cartItems_guest") {
      sessionStorage.setItem(key, JSON.stringify(items));
    } else {
      localStorage.setItem(key, JSON.stringify(items));
    }
  } catch (e) {
    // ignore
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const exists = state.cartItems.find((it) => it.product === item.product);
      if (exists) {
        exists.quantity = Math.min(
          (exists.quantity || 0) + (item.quantity || 1),
          item.stock || 9999,
        );
      } else {
        state.cartItems.push({ ...item, quantity: item.quantity || 1 });
      }
      saveToStorage(state.cartItems);
    },
    removeItem: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter((it) => it.product !== id);
      saveToStorage(state.cartItems);
    },
    increaseQty: (state, action) => {
      const id = action.payload;
      const item = state.cartItems.find((it) => it.product === id);
      if (item) {
        item.quantity = Math.min(item.quantity + 1, item.stock || 9999);
        saveToStorage(state.cartItems);
      }
    },
    decreaseQty: (state, action) => {
      const id = action.payload;
      const item = state.cartItems.find((it) => it.product === id);
      if (item) {
        item.quantity = Math.max(1, item.quantity - 1);
        saveToStorage(state.cartItems);
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      saveToStorage(state.cartItems);
    },
    setCart: (state, action) => {
      state.cartItems = action.payload || [];
      saveToStorage(state.cartItems);
    },
  },
});

export const {
  addItem,
  removeItem,
  increaseQty,
  decreaseQty,
  clearCart,
  setCart,
} = cartSlice.actions;
export default cartSlice.reducer;
