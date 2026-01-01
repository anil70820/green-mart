import api from "@/utils/axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

/* ======================
   ASYNC THUNKS
====================== */

export const fetchCart = createAsyncThunk("cart/fetch", async () => {
  const res = await api.get("/cart");
  return res.data.cart;
});

export const addToCart = createAsyncThunk(
  "cart/add",
  async ({ productId, quantity }) => {
    const res = await api.post("/cart/add", {
      productId,
      quantity,
    });
    return res.data.cart;
  }
);

export const removeFromCart = createAsyncThunk(
  "cart/remove",
  async ({ productId }) => {
    const res = await api.post("/cart/remove", {
      productId,
    });
    return res.data.cart;
  }
);
export const updateQuantity = createAsyncThunk(
  "cart/updateQuantity",
  async ({ productId, quantity }) => {
    const res = await api.post("/cart/update", { productId, quantity });
    return res.data.cart;
  }
);

/* ======================
   SLICE
====================== */

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearCart: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder

      /* FETCH CART */
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload?.items || [];
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      /* ADD TO CART */
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      /* REMOVE FROM CART */
      .addCase(removeFromCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = action.payload.items;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      // UPDATE PRODUCT QUANTITY
      .addCase(updateQuantity.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateQuantity.fulfilled, (state, action) => {
        state.items = action.payload.items;
      })
      .addCase(updateQuantity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer;
