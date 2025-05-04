import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/api';

// Fetch universities
export const fetchUniversities = createAsyncThunk(
  'profiles/fetchUniversities',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/users/universities/');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { detail: 'Failed to fetch universities' });
    }
  }
);

// Student profile operations
export const fetchStudentProfiles = createAsyncThunk(
  'profiles/fetchStudentProfiles',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/users/student-profiles/');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { detail: 'Failed to fetch student profiles' });
    }
  }
);

export const fetchStudentProfile = createAsyncThunk(
  'profiles/fetchStudentProfile',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users/student-profiles/${id}/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { detail: 'Failed to fetch student profile' });
    }
  }
);

export const createStudentProfile = createAsyncThunk(
  'profiles/createStudentProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await api.post('/users/student-profiles/', profileData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { detail: 'Failed to create student profile' });
    }
  }
);

export const updateStudentProfile = createAsyncThunk(
  'profiles/updateStudentProfile',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/users/student-profiles/${id}/`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { detail: 'Failed to update student profile' });
    }
  }
);

export const deleteStudentProfile = createAsyncThunk(
  'profiles/deleteStudentProfile',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/users/student-profiles/${id}/`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || { detail: 'Failed to delete student profile' });
    }
  }
);

// Merchant profile operations
export const fetchMerchantProfiles = createAsyncThunk(
  'profiles/fetchMerchantProfiles',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/users/merchant-profiles/');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { detail: 'Failed to fetch merchant profiles' });
    }
  }
);

export const fetchMerchantProfile = createAsyncThunk(
  'profiles/fetchMerchantProfile',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users/merchant-profiles/${id}/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { detail: 'Failed to fetch merchant profile' });
    }
  }
);

export const createMerchantProfile = createAsyncThunk(
  'profiles/createMerchantProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await api.post('/users/merchant-profiles/', profileData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { detail: 'Failed to create merchant profile' });
    }
  }
);

export const updateMerchantProfile = createAsyncThunk(
  'profiles/updateMerchantProfile',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/users/merchant-profiles/${id}/`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { detail: 'Failed to update merchant profile' });
    }
  }
);

export const deleteMerchantProfile = createAsyncThunk(
  'profiles/deleteMerchantProfile',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/users/merchant-profiles/${id}/`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || { detail: 'Failed to delete merchant profile' });
    }
  }
);

// Tutor profile operations
export const fetchTutorProfiles = createAsyncThunk(
  'profiles/fetchTutorProfiles',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/users/tutor-profiles/');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { detail: 'Failed to fetch tutor profiles' });
    }
  }
);

export const fetchTutorProfile = createAsyncThunk(
  'profiles/fetchTutorProfile',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users/tutor-profiles/${id}/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { detail: 'Failed to fetch tutor profile' });
    }
  }
);

export const createTutorProfile = createAsyncThunk(
  'profiles/createTutorProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await api.post('/users/tutor-profiles/', profileData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { detail: 'Failed to create tutor profile' });
    }
  }
);

export const updateTutorProfile = createAsyncThunk(
  'profiles/updateTutorProfile',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/users/tutor-profiles/${id}/`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { detail: 'Failed to update tutor profile' });
    }
  }
);

export const deleteTutorProfile = createAsyncThunk(
  'profiles/deleteTutorProfile',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/users/tutor-profiles/${id}/`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || { detail: 'Failed to delete tutor profile' });
    }
  }
);

// Campus admin profile operations
export const fetchCampusAdminProfiles = createAsyncThunk(
  'profiles/fetchCampusAdminProfiles',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/users/campus-admin-profiles/');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { detail: 'Failed to fetch campus admin profiles' });
    }
  }
);

export const fetchCampusAdminProfile = createAsyncThunk(
  'profiles/fetchCampusAdminProfile',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/users/campus-admin-profiles/${id}/`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { detail: 'Failed to fetch campus admin profile' });
    }
  }
);

export const createCampusAdminProfile = createAsyncThunk(
  'profiles/createCampusAdminProfile',
  async (profileData, { rejectWithValue }) => {
    try {
      const response = await api.post('/users/campus-admin-profiles/', profileData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { detail: 'Failed to create campus admin profile' });
    }
  }
);

export const updateCampusAdminProfile = createAsyncThunk(
  'profiles/updateCampusAdminProfile',
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/users/campus-admin-profiles/${id}/`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { detail: 'Failed to update campus admin profile' });
    }
  }
);

export const deleteCampusAdminProfile = createAsyncThunk(
  'profiles/deleteCampusAdminProfile',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/users/campus-admin-profiles/${id}/`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || { detail: 'Failed to delete campus admin profile' });
    }
  }
);

// Initial state
const initialState = {
  universities: [],
  studentProfiles: [],
  merchantProfiles: [],
  tutorProfiles: [],
  campusAdminProfiles: [],
  currentProfile: null,
  isLoading: false,
  error: null,
  successMessage: null,
};

// Profiles slice
const profilesSlice = createSlice({
  name: 'profiles',
  initialState,
  reducers: {
    clearProfilesError: (state) => {
      state.error = null;
    },
    clearProfilesSuccessMessage: (state) => {
      state.successMessage = null;
    },
    setCurrentProfile: (state, action) => {
      state.currentProfile = action.payload;
    },
    resetProfilesState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      // Universities
      .addCase(fetchUniversities.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUniversities.fulfilled, (state, action) => {
        state.isLoading = false;
        state.universities = action.payload;
      })
      .addCase(fetchUniversities.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Student profiles
      .addCase(fetchStudentProfiles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStudentProfiles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.studentProfiles = action.payload;
      })
      .addCase(fetchStudentProfiles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      .addCase(fetchStudentProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchStudentProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentProfile = action.payload;
      })
      .addCase(fetchStudentProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      .addCase(createStudentProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(createStudentProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.studentProfiles.push(action.payload);
        state.currentProfile = action.payload;
        state.successMessage = 'Student profile created successfully';
      })
      .addCase(createStudentProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      .addCase(updateStudentProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(updateStudentProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.studentProfiles = state.studentProfiles.map(profile => 
          profile.id === action.payload.id ? action.payload : profile
        );
        state.currentProfile = action.payload;
        state.successMessage = 'Student profile updated successfully';
      })
      .addCase(updateStudentProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      .addCase(deleteStudentProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.successMessage = null;
      })
      .addCase(deleteStudentProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.studentProfiles = state.studentProfiles.filter(profile => profile.id !== action.payload);
        if (state.currentProfile && state.currentProfile.id === action.payload) {
          state.currentProfile = null;
        }
        state.successMessage = 'Student profile deleted successfully';
      })
      .addCase(deleteStudentProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })

      // Merchant profiles - similar pattern for other profile types
      .addCase(fetchMerchantProfiles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMerchantProfiles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.merchantProfiles = action.payload;
      })
      .addCase(fetchMerchantProfiles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      .addCase(fetchMerchantProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentProfile = action.payload;
      })
      
      .addCase(createMerchantProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.merchantProfiles.push(action.payload);
        state.currentProfile = action.payload;
        state.successMessage = 'Merchant profile created successfully';
      })
      
      .addCase(updateMerchantProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.merchantProfiles = state.merchantProfiles.map(profile => 
          profile.id === action.payload.id ? action.payload : profile
        );
        state.currentProfile = action.payload;
        state.successMessage = 'Merchant profile updated successfully';
      })
      
      .addCase(deleteMerchantProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.merchantProfiles = state.merchantProfiles.filter(profile => profile.id !== action.payload);
        if (state.currentProfile && state.currentProfile.id === action.payload) {
          state.currentProfile = null;
        }
        state.successMessage = 'Merchant profile deleted successfully';
      })
      
      // Tutor profiles
      .addCase(fetchTutorProfiles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tutorProfiles = action.payload;
      })
      
      .addCase(fetchTutorProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentProfile = action.payload;
      })
      
      .addCase(createTutorProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tutorProfiles.push(action.payload);
        state.currentProfile = action.payload;
        state.successMessage = 'Tutor profile created successfully';
      })
      
      .addCase(updateTutorProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tutorProfiles = state.tutorProfiles.map(profile => 
          profile.id === action.payload.id ? action.payload : profile
        );
        state.currentProfile = action.payload;
        state.successMessage = 'Tutor profile updated successfully';
      })
      
      .addCase(deleteTutorProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.tutorProfiles = state.tutorProfiles.filter(profile => profile.id !== action.payload);
        if (state.currentProfile && state.currentProfile.id === action.payload) {
          state.currentProfile = null;
        }
        state.successMessage = 'Tutor profile deleted successfully';
      })
      
      // Campus admin profiles
      .addCase(fetchCampusAdminProfiles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.campusAdminProfiles = action.payload;
      })
      
      .addCase(fetchCampusAdminProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentProfile = action.payload;
      })
      
      .addCase(createCampusAdminProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.campusAdminProfiles.push(action.payload);
        state.currentProfile = action.payload;
        state.successMessage = 'Campus admin profile created successfully';
      })
      
      .addCase(updateCampusAdminProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.campusAdminProfiles = state.campusAdminProfiles.map(profile => 
          profile.id === action.payload.id ? action.payload : profile
        );
        state.currentProfile = action.payload;
        state.successMessage = 'Campus admin profile updated successfully';
      })
      
      .addCase(deleteCampusAdminProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.campusAdminProfiles = state.campusAdminProfiles.filter(profile => profile.id !== action.payload);
        if (state.currentProfile && state.currentProfile.id === action.payload) {
          state.currentProfile = null;
        }
        state.successMessage = 'Campus admin profile deleted successfully';
      });
  },
});

export const { 
  clearProfilesError, 
  clearProfilesSuccessMessage, 
  setCurrentProfile, 
  resetProfilesState 
} = profilesSlice.actions;

export default profilesSlice.reducer;