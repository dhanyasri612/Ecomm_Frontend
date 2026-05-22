import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async ({ keyword = "", page = 1, category } = {}, { rejectWithValue }) => {
    try {
      //const link = "/api/v1/products"
      /* const link = keyword
        ? `/api/v1/products?keyword=${encodeURIComponent(keyword)}&page=${page}`
        : `/api/v1/products?page=${page}`; */
      let link = "/api/v1/products?page=" + page;
      if (category) {
        link += `&category=${category}`;
      }
      if (keyword) {
        link += `&keyword=${keyword}`;
      }
      const { data } = await axios.get(link);
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong...");
    }
  },
);

export const getProductDetails = createAsyncThunk(
  "product/getProductDetails",
  async (id, { rejectWithValue }) => {
    try {
      const link = `/api/v1/product/${id}`;
      const { data } = await axios.get(link);
      console.log(data);
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Something went wrong...");
    }
  },
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
    productCount: 0,
    loading: false,
    error: null,
    product: null,
    resultsPerPage: 4,
    totalPages: 0,
  },
  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        console.log("Fullfilled action payload", action.payload);
        state.loading = false;
        state.error = null;
        state.products = action.payload.products;
        const countFromApi =
          action.payload.productCount ?? action.payload.productCounts;
        state.productCount =
          typeof countFromApi === "number"
            ? countFromApi
            : Array.isArray(action.payload.products)
              ? action.payload.products.length
              : 0;
        state.resultsPerPage = action.payload.resultsPerPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          action.payload ||
          action.error?.message ||
          "Something went wrong";
      });

    builder
      .addCase(getProductDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProductDetails.fulfilled, (state, action) => {
        console.log("Fullfilled action payload", action.payload);
        state.loading = false;
        state.error = null;
        state.product = action.payload.product;
      })
      .addCase(getProductDetails.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          action.payload ||
          action.error?.message ||
          "Something went wrong";
      });
  },
});

export const { removeErrors } = productSlice.actions;
export default productSlice.reducer;
