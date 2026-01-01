import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "@/utils/axios";

/* ======================
   ASYNC ACTIONS
====================== */
export const fetchWishlist = createAsyncThunk("wishlist/fetch", async () => {
  const res = await api.get("/user/wishlist");
  return res.data.wishlist;
});

export const addToWishlist = createAsyncThunk(
  "wishlist/add",
  async (productId) => {
    const res = await api.post("/user/wishlist/add", { productId });
    return res.data.wishlist;
  }
);

export const removeFromWishlist = createAsyncThunk(
  "wishlist/remove",
  async (productId) => {
    const res = await api.post("/user/wishlist/remove", { productId });
    return res.data.wishlist;
  }
);

/* ======================
   SLICE
====================== */
const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearWishlist: (state) => {
      state.items = [];
    },
  },
  extraReducers: (builder) => {
    builder
      /* FETCH WISHLIST */
      .addCase(fetchWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items || [];
      })
      .addCase(fetchWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      /* ADD TO WISHLIST */
      .addCase(addToWishlist.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToWishlist.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
      })
      .addCase(addToWishlist.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      /* REMOVE FROM WISHLIST */
      .addCase(removeFromWishlist.fulfilled, (state, action) => {
        state.items = action.payload.items;
      });
  },
});

export const { clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
