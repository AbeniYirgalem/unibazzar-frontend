import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api';

// Async thunks for authentication
export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post('/users/login/', { email, password });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { detail: 'Login failed' });
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { refreshToken } = getState().auth;
      
      if (refreshToken) {
        await api.post('/users/logout/', { refresh: refreshToken });
      }
      
      return null;
    } catch (error) {
      return rejectWithValue(error.response?.data || { detail: 'Logout failed' });
    }
  }
);

export const refreshToken = createAsyncThunk(
  'auth/refreshToken',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { refreshToken } = getState().auth;
      
      if (!refreshToken) {
        return rejectWithValue({ detail: 'No refresh token available' });
      }
      
      const response = await api.post('/token/refresh/', {
        refresh: refreshToken,
      });
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { detail: 'Token refresh failed' });
    }
  }
);

export const verifyToken = createAsyncThunk(
  'auth/verifyToken',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { accessToken } = getState().auth;
      
      if (!accessToken) {
        return rejectWithValue({ detail: 'No access token available' });
      }
      
      await api.post('/token/verify/', {
        token: accessToken,
      });
      
      return { isValid: true };
    } catch (error) {
      return rejectWithValue({ isValid: false });
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.post('/users/register/', userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { detail: 'Registration failed' });
    }
  }
);

export const requestPasswordReset = createAsyncThunk(
  'auth/requestPasswordReset',
  async (email, { rejectWithValue }) => {
    try {
      const response = await api.post('/password_reset/', { email });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { detail: 'Password reset request failed' });
    }
  }
);

export const confirmPasswordReset = createAsyncThunk(
  'auth/confirmPasswordReset',
  async ({ uid, token, password }, { rejectWithValue }) => {
    try {
      const response = await api.post('/password_reset/confirm/', {
        uid,
        token,
        new_password: password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { detail: 'Password reset confirmation failed' });
    }
  }
);

export const validateResetToken = createAsyncThunk(
  'auth/validateResetToken',
  async ({ uid, token }, { rejectWithValue }) => {
    try {
      const response = await api.post('/password_reset/validate_token/', {
        uid,
        token,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { detail: 'Token validation failed' });
    }
  }
);

// Initial state
const initialState = {
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  passwordResetRequested: false,
  passwordResetConfirmed: false,
  tokenValidationStatus: null,
};

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetPasswordResetStatus: (state) => {
      state.passwordResetRequested = false;
      state.passwordResetConfirmed = false;
      state.tokenValidationStatus = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.accessToken = action.payload.access;
        state.refreshToken = action.payload.refresh;
        state.isAuthenticated = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Logout
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
        // Even if the logout fails on the server, clear the tokens
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
      })
      
      // Refresh token
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.accessToken = action.payload.access;
        state.isAuthenticated = true;
      })
      .addCase(refreshToken.rejected, (state) => {
        state.accessToken = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
      })
      
      // Verify token
      .addCase(verifyToken.rejected, (state) => {
        state.isAuthenticated = false;
      })
      
      // Register
      .addCase(register.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Password reset request
      .addCase(requestPasswordReset.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.passwordResetRequested = false;
      })
      .addCase(requestPasswordReset.fulfilled, (state) => {
        state.isLoading = false;
        state.passwordResetRequested = true;
      })
      .addCase(requestPasswordReset.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Password reset confirmation
      .addCase(confirmPasswordReset.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.passwordResetConfirmed = false;
      })
      .addCase(confirmPasswordReset.fulfilled, (state) => {
        state.isLoading = false;
        state.passwordResetConfirmed = true;
      })
      .addCase(confirmPasswordReset.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Validate reset token
      .addCase(validateResetToken.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.tokenValidationStatus = null;
      })
      .addCase(validateResetToken.fulfilled, (state) => {
        state.isLoading = false;
        state.tokenValidationStatus = 'valid';
      })
      .addCase(validateResetToken.rejected, (state) => {
        state.isLoading = false;
        state.tokenValidationStatus = 'invalid';
      });
  },
});

export const { clearError, resetPasswordResetStatus } = authSlice.actions;
export default authSlice.reducer;