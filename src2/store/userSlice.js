import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api';

// Async thunks for user operations
export const getUserProfile = createAsyncThunk(
  'user/getUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/users/me/');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { detail: 'Failed to fetch user profile' });
    }
  }
);

export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await api.patch('/users/me/', userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { detail: 'Failed to update user profile' });
    }
  }
);

export const uploadAvatar = createAsyncThunk(
  'user/uploadAvatar',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post('/users/me/avatar/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { detail: 'Failed to upload avatar' });
    }
  }
);

export const deleteAvatar = createAsyncThunk(
  'user/deleteAvatar',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.delete('/users/me/avatar/');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { detail: 'Failed to delete avatar' });
    }
  }
);

export const updateEmail = createAsyncThunk(
  'user/updateEmail',
  async (emailData, { rejectWithValue }) => {
    try {
      const response = await api.patch('/users/me/email/', emailData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { detail: 'Failed to update email' });
    }
  }
);

export const updatePassword = createAsyncThunk(
  'user/updatePassword',
  async (passwordData, { rejectWithValue }) => {
    try {
      const response = await api.post('/users/me/password/', passwordData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { detail: 'Failed to update password' });
    }
  }
);

export const updatePhone = createAsyncThunk(
  'user/updatePhone',
  async (phoneData, { rejectWithValue }) => {
    try {
      const response = await api.patch('/users/me/phone/', phoneData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { detail: 'Failed to update phone number' });
    }
  }
);

// Initial state
const initialState = {
  userData: null,
  isLoading: false,
  error: null,
  successMessage: null,
};

// User slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearUserError: (state) => {
      state.error = null;
    },
    clearSuccessMessage: (state) => {
      state.successMessage = null;
    },
    resetUserState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Get user profile
      .addCase(getUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Update user profile
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
        state.successMessage = 'Profile updated successfully';
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Upload avatar
      .addCase(uploadAvatar.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(uploadAvatar.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.userData) {
          state.userData.profile_picture = action.payload.profile_picture;
        }
        state.successMessage = 'Avatar uploaded successfully';
      })
      .addCase(uploadAvatar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Delete avatar
      .addCase(deleteAvatar.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(deleteAvatar.fulfilled, (state) => {
        state.isLoading = false;
        if (state.userData) {
          state.userData.profile_picture = null;
        }
        state.successMessage = 'Avatar deleted successfully';
      })
      .addCase(deleteAvatar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Update email
      .addCase(updateEmail.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updateEmail.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.userData) {
          state.userData.email = action.payload.email;
          state.userData.is_email_verified = action.payload.is_email_verified;
        }
        state.successMessage = 'Email updated successfully';
      })
      .addCase(updateEmail.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Update password
      .addCase(updatePassword.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.isLoading = false;
        state.successMessage = 'Password updated successfully';
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Update phone
      .addCase(updatePhone.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updatePhone.fulfilled, (state, action) => {
        state.isLoading = false;
        if (state.userData) {
          state.userData.phone_number = action.payload.phone_number;
        }
        state.successMessage = 'Phone number updated successfully';
      })
      .addCase(updatePhone.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUserError, clearSuccessMessage, resetUserState } = userSlice.actions;
export default userSlice.reducer;