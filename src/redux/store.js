import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./slice/cartSlice";
import wishlistReducer from "./slice/wishlistSlice";
import productReducer from "./slice/seller/productSlice";
import authReducer from "./slice/authSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishlist: wishlistReducer,
    product: productReducer,
    auth: authReducer,
  },
});
