import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slices/cartSlice";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import { injectStore } from "./api/uniBazzarApi";
import favoriteReducer from "./slices/favoriteSlice";

const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    user: userReducer,
    favorites: favoriteReducer,
  },
});

// Inject the store into the API
injectStore(store);

// Sync Redux state to localStorage on every change
store.subscribe(() => {
  const { cart } = store.getState();
  localStorage.setItem("cart", JSON.stringify(cart));
});

export default store;
