import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/uniBazzarApi";

// Get all universities (for dropdowns)
export const fetchUniversities = createAsyncThunk(
  "user/fetchUniversities",
  async (_, thunkAPI) => {
    try {
      const response = await api.get("/users/universities/");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.detail || "Failed to fetch universities"
      );
    }
  }
);

// Update user profile data
export const updateUserProfile = createAsyncThunk(
  "user/updateUserProfile",
  async (userData, thunkAPI) => {
    try {
      const response = await api.patch("/users/me/", userData);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.detail || "Failed to update profile"
      );
    }
  }
);

// Update user avatar
export const updateUserAvatar = createAsyncThunk(
  "user/updateUserAvatar",
  async (formData, thunkAPI) => {
    try {
      const response = await api.post("/users/me/avatar/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.detail || "Failed to update avatar"
      );
    }
  }
);

// Delete user avatar
export const deleteUserAvatar = createAsyncThunk(
  "user/deleteUserAvatar",
  async (_, thunkAPI) => {
    try {
      await api.delete("/users/me/avatar/");
      return { success: true };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.detail || "Failed to delete avatar"
      );
    }
  }
);

// Change user password
export const changeUserPassword = createAsyncThunk(
  "user/changeUserPassword",
  async ({ current_password, new_password }, thunkAPI) => {
    try {
      await api.post("/users/me/password/", {
        current_password,
        new_password,
      });
      return { success: true };
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.detail ||
          error.response?.data?.current_password?.[0] ||
          error.response?.data?.new_password?.[0] ||
          "Failed to change password"
      );
    }
  }
);

// Update user email
export const updateUserEmail = createAsyncThunk(
  "user/updateUserEmail",
  async ({ email }, thunkAPI) => {
    try {
      const response = await api.patch("/users/me/email/", { email });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.detail ||
          error.response?.data?.email?.[0] ||
          "Failed to update email"
      );
    }
  }
);

// Profile operations for different roles
// Student profile
export const updateStudentProfile = createAsyncThunk(
  "user/updateStudentProfile",
  async (profileData, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const { user } = state.auth;

      if (user.student_profile) {
        // Update existing profile
        const response = await api.patch(
          `/users/student-profiles/${user.student_profile.id}/`,
          profileData
        );
        return response.data;
      } else {
        // Create new profile
        const response = await api.post(
          "/users/student-profiles/",
          profileData
        );
        return response.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.detail || "Failed to update student profile"
      );
    }
  }
);

// Merchant profile
export const updateMerchantProfile = createAsyncThunk(
  "user/updateMerchantProfile",
  async (profileData, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const { user } = state.auth;

      if (user.merchant_profile) {
        // Update existing profile
        const response = await api.patch(
          `/users/merchant-profiles/${user.merchant_profile.id}/`,
          profileData
        );
        return response.data;
      } else {
        // Create new profile
        const response = await api.post(
          "/users/merchant-profiles/",
          profileData
        );
        return response.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.detail || "Failed to update merchant profile"
      );
    }
  }
);

// Tutor profile
export const updateTutorProfile = createAsyncThunk(
  "user/updateTutorProfile",
  async (profileData, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const { user } = state.auth;

      if (user.tutor_profile) {
        // Update existing profile
        const response = await api.patch(
          `/users/tutor-profiles/${user.tutor_profile.id}/`,
          profileData
        );
        return response.data;
      } else {
        // Create new profile
        const response = await api.post("/users/tutor-profiles/", profileData);
        return response.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.detail || "Failed to update tutor profile"
      );
    }
  }
);

// Campus admin profile
export const updateCampusAdminProfile = createAsyncThunk(
  "user/updateCampusAdminProfile",
  async (profileData, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const { user } = state.auth;

      if (user.campus_admin_profile) {
        // Update existing profile
        const response = await api.patch(
          `/users/campus-admin-profiles/${user.campus_admin_profile.id}/`,
          profileData
        );
        return response.data;
      } else {
        // Create new profile
        const response = await api.post(
          "/users/campus-admin-profiles/",
          profileData
        );
        return response.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.detail || "Failed to update campus admin profile"
      );
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    universities: [],
    loading: false,
    error: null,
    passwordChangeSuccess: false,
    emailUpdateSuccess: false,
    avatarUpdateSuccess: false,
  },
  reducers: {
    clearUserError: (state) => {
      state.error = null;
    },
    resetSuccessFlags: (state) => {
      state.passwordChangeSuccess = false;
      state.emailUpdateSuccess = false;
      state.avatarUpdateSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Universities
      .addCase(fetchUniversities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUniversities.fulfilled, (state, action) => {
        state.loading = false;
        state.universities = action.payload;
      })
      .addCase(fetchUniversities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Profile
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUserProfile.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Avatar
      .addCase(updateUserAvatar.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.avatarUpdateSuccess = false;
      })
      .addCase(updateUserAvatar.fulfilled, (state) => {
        state.loading = false;
        state.avatarUpdateSuccess = true;
      })
      .addCase(updateUserAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete Avatar
      .addCase(deleteUserAvatar.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteUserAvatar.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteUserAvatar.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Change Password
      .addCase(changeUserPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.passwordChangeSuccess = false;
      })
      .addCase(changeUserPassword.fulfilled, (state) => {
        state.loading = false;
        state.passwordChangeSuccess = true;
      })
      .addCase(changeUserPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update Email
      .addCase(updateUserEmail.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.emailUpdateSuccess = false;
      })
      .addCase(updateUserEmail.fulfilled, (state) => {
        state.loading = false;
        state.emailUpdateSuccess = true;
      })
      .addCase(updateUserEmail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Role-based profile updates
      .addCase(updateStudentProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStudentProfile.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateStudentProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateMerchantProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateMerchantProfile.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateMerchantProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateTutorProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTutorProfile.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateTutorProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateCampusAdminProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCampusAdminProfile.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateCampusAdminProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUserError, resetSuccessFlags } = userSlice.actions;
export default userSlice.reducer;
