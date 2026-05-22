import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

//Regsiter api
export const register = createAsyncThunk(
  "user/register",
  async (userData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.post("/api/v1/register", userData, config);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Registration failed. Please try again later.",
      );
    }
  },
);

export const loadUser = createAsyncThunk(
  "user/loaduser",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("api/v1/profile");
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to load user details.",
      );
    }
  },
);

export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/login",
        { email, password },
        config,
      );
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to login");
    }
  },
);

export const logout = createAsyncThunk(
  "user/logout",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get("/api/v1/logout");
      return data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to logout");
    }
  },
);

export const updateProfile = createAsyncThunk(
  "user/updateprofile",
  async (userData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.put(
        "/api/v1/update/profile",
        userData,
        config,
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update profile. Please try again.",
      );
    }
  },
);

export const updatePassword = createAsyncThunk(
  "user/updatepassword",
  async (passwordData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.put(
        "/api/v1/update/password",
        passwordData,
        config,
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update password. Please try again.",
      );
    }
  },
);

export const forgetPassword = createAsyncThunk(
  "user/forgetpassword",
  async (emailData, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/v1/password/forget",
        emailData,
        config,
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to send password reset email.",
      );
    }
  },
);

export const resetPassword = createAsyncThunk(
  "user/resetpassword",
  async ({ token, passwordData }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `/api/v1/reset/${token}`,
        passwordData,
        config,
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to reset password. Please try again.",
      );
    }
  },
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null,
    loading: false,
    error: null,
    success: false,
    isAuthenticated: localStorage.getItem("isAuthenticated") === "true",
    message: null,
  },
  reducers: {
    removeErrors: (state) => {
      state.error = null;
    },
    removeSuccess: (state) => {
      state.success = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = action.payload?.success ?? true;
        state.message = action.payload?.message || null;
        state.user = action.payload?.user || null;
        state.isAuthenticated = Boolean(action.payload?.user);
        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem("isAuthenticated", String(state.isAuthenticated));
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error =
          action.payload?.message ||
          action.payload ||
          "Registration failed. Try again later.";
        state.isAuthenticated = false;
        state.user = null;
      });

    //Loading user
    builder.addCase(loadUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loadUser.fulfilled, (state, action) => {
      state.error = null;
      state.user = action.payload?.user || null;
      state.loading = false;
      state.isAuthenticated = Boolean(action.payload?.user);
      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("isAuthenticated", String(state.isAuthenticated));
    });
    builder.addCase(loadUser.rejected, (state, action) => {
      state.error = action.payload?.message || null;
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
      if (action.payload?.statusCode === 401) {
        state.user = null;
        state.isAuthenticated = false;
        localStorage.removeItem("user");
        localStorage.removeItem("isAuthenticated");
      }
    });

    //login
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = action.payload?.success ?? true;
        state.message = action.payload?.message || null;
        state.user = action.payload?.user || null;
        state.isAuthenticated = Boolean(action.payload?.user);
        localStorage.setItem("user", JSON.stringify(state.user));
        localStorage.setItem("isAuthenticated", String(state.isAuthenticated));
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error =
          action.payload?.message ||
          action.payload ||
          "Login failed. Try again later.";
        state.isAuthenticated = false;
        state.user = null;
      });

    //Log out
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.loading = false;
      state.error = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user");
      localStorage.removeItem("isAuthenticated");
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload?.message || "Failed to logout";
    });

    //Update profile
    builder.addCase(updateProfile.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = action.payload?.success ?? true;
      state.message = action.payload?.message || "Profile updated successfully";
      state.user = action.payload?.user || state.user;
      state.isAuthenticated = Boolean(state.user);
      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("isAuthenticated", String(state.isAuthenticated));
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error =
        action.payload?.message ||
        action.payload ||
        "Failed to update profile. Please try again.";
    });

    //Update password
    builder.addCase(updatePassword.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(updatePassword.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = action.payload?.success ?? true;
      state.message =
        action.payload?.message || "Password updated successfully";
      state.user = action.payload?.user || state.user;
      state.isAuthenticated = Boolean(state.user);
      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("isAuthenticated", String(state.isAuthenticated));
    });
    builder.addCase(updatePassword.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error =
        action.payload?.message ||
        action.payload ||
        "Failed to update password. Please try again.";
    });

    //Forget password
    builder.addCase(forgetPassword.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(forgetPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = action.payload?.success ?? true;
      state.message = action.payload?.message || "Password reset email sent";
    });
    builder.addCase(forgetPassword.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error =
        action.payload?.message ||
        action.payload ||
        "Failed to send password reset email.";
    });

    //Reset password
    builder.addCase(resetPassword.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.success = false;
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.success = action.payload?.success ?? true;
      state.message = action.payload?.message || "Password reset successfully";
      state.user = action.payload?.user || state.user;
      state.isAuthenticated = Boolean(state.user);
      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("isAuthenticated", String(state.isAuthenticated));
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error =
        action.payload?.message ||
        action.payload ||
        "Failed to reset password. Please try again.";
    });
  },
});

export const { removeErrors, removeSuccess } = userSlice.actions;
export default userSlice.reducer;
