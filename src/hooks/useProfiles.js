import { useState } from "react";
import api from "../redux/api/uniBazzarApi";
import universities from "../data/universities";
import { useSelector } from "react-redux";
import { useStore } from "react-redux";

/**
 * Custom hook for managing user profiles
 * @param {string} profileType - The type of profile (student, merchant, tutor, campus_admin)
 * @returns {Object} Profile management functions and state
 */
const useProfiles = (profileType) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentProfile, setCurrentProfile] = useState(null);
  const [universityList, setUniversityList] = useState(universities || []);
  const { user } = useSelector((state) => state.auth);
  const storeInstance = useStore();

  /**
   * Clear any errors
   */
  const clearError = () => {
    setError(null);
  };

  /**
   * Get universities list
   */
  const getUniversities = async () => {
    // We're using the static list for now
    // In a real implementation, you might fetch this from an API
    setUniversityList(universities);
    return universities;
  };

  /**
   * Create a new profile
   * @param {Object} profileData - The profile data to submit
   */
  const createProfile = async (profileData) => {
    setIsLoading(true);
    setError(null);

    try {
      let url;

      // Try to get user ID from the Redux state first, then localStorage if needed
      const userId = user?.id;

      if (!userId) {
        console.error("No user ID available for profile creation");
        throw new Error("Authentication error: User ID not found");
      }

      console.log("Profile creation - Using user ID:", userId);

      // Create a copy of profileData to avoid mutating the original
      const profileDataToSubmit = { ...profileData };

      // If university_id is provided but university_name is missing, add it
      if (
        profileDataToSubmit.university_id &&
        !profileDataToSubmit.university_name
      ) {
        // Find the university name from the universities list
        const selectedUniversity = universityList.find(
          (uni) =>
            uni.id.toString() === profileDataToSubmit.university_id.toString()
        );

        if (selectedUniversity) {
          profileDataToSubmit.university_name = selectedUniversity.name;
          console.log(
            `Added university_name: ${selectedUniversity.name} based on university_id: ${profileDataToSubmit.university_id}`
          );
        } else {
          console.warn(
            `Could not find university name for ID: ${profileDataToSubmit.university_id}`
          );
        }
      }

      // If using FormData, we need to append the user ID and university_name
      if (profileData instanceof FormData) {
        // Convert userId to number to ensure proper format for backend
        const userIdNumber = parseInt(userId, 10);
        profileData.append("user", userIdNumber);
        console.log(`Adding user ID ${userIdNumber} to FormData`);

        // Also add university_name if it's not already there
        if (
          profileData.get("university_id") &&
          !profileData.get("university_name")
        ) {
          const uniId = profileData.get("university_id");
          const selectedUniversity = universityList.find(
            (uni) => uni.id.toString() === uniId.toString()
          );

          if (selectedUniversity) {
            profileData.append("university_name", selectedUniversity.name);
            console.log(
              `Added university_name: ${selectedUniversity.name} to FormData`
            );
          }
        }
      } else if (typeof profileData === "object") {
        // If regular object, add user ID to the object
        profileDataToSubmit.user = parseInt(userId, 10);
        console.log("Submitting profile data:", profileDataToSubmit);
      }

      switch (profileType) {
        case "student":
          url = "/api/users/student-profiles/";
          break;
        case "merchant":
          url = "/api/users/merchant-profiles/";
          break;
        case "tutor":
          url = "/api/users/tutor-profiles/";
          break;
        case "campus_admin":
          url = "/api/users/campus-admin-profiles/";
          break;
        default:
          throw new Error(`Unsupported profile type: ${profileType}`);
      }

      // Log the request data for debugging
      console.log(
        `Creating ${profileType} profile with data:`,
        profileData instanceof FormData
          ? "FormData (contents not printable)"
          : profileDataToSubmit
      );

      // Check if store has auth tokens before proceeding
      const authState = storeInstance.getState().auth;
      if (!authState.token) {
        console.error("No auth token available for profile creation");
        throw new Error("Authentication error: Please log in again");
      }

      // Use profileDataToSubmit instead of profileData for object data
      const dataToSend =
        profileData instanceof FormData ? profileData : profileDataToSubmit;
      const response = await api.post(url, dataToSend);

      // On successful profile creation, update the user profile in the state
      if (response.data) {
        console.log(`Profile created successfully:`, response.data);

        // Update the current profile
        setCurrentProfile(response.data);

        // Now fetch the updated user profile to ensure we have the profile_id
        if (storeInstance) {
          console.log(
            "Dispatching user profile refresh to update state with new profile_id"
          );
          try {
            const userResponse = await api.get("/api/users/me/");
            storeInstance.dispatch({
              type: "auth/fetchUserProfile/fulfilled",
              payload: userResponse.data,
            });
          } catch (error) {
            console.error("Failed to refresh user profile:", error);
          }
        }
      }

      return response.data;
    } catch (err) {
      console.error(`Profile creation error:`, err);

      // Authentication errors
      if (err.response?.status === 401) {
        setError(
          "Authentication error: Your session may have expired. Please log in again."
        );
        // Dispatch logout action to clean up auth state
        if (storeInstance) {
          storeInstance.dispatch({ type: "auth/logoutUser/fulfilled" });
        }
        throw err;
      }

      // Check if this is a "profile already exists" error
      if (
        err.response?.data?.user &&
        Array.isArray(err.response.data.user) &&
        err.response.data.user.includes(
          "merchant profile with this user already exists."
        )
      ) {
        console.log("User already has a profile, redirecting to dashboard");
        // Use window.location for a hard redirect to dashboard
        window.location.href = `/${profileType.split("_")[0]}-dashboard`;
        return null;
      }

      setError(err.response?.data || err.message || "Failed to create profile");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Update an existing profile
   * @param {string|number} profileId - The ID of the profile to update
   * @param {Object} profileData - The updated profile data
   */
  const updateProfile = async (profileId, profileData) => {
    setIsLoading(true);
    setError(null);

    try {
      let url;
      switch (profileType) {
        case "student":
          url = `/api/users/student-profiles/${profileId}/`;
          break;
        case "merchant":
          url = `/api/users/merchant-profiles/${profileId}/`;
          break;
        case "tutor":
          url = `/api/users/tutor-profiles/${profileId}/`;
          break;
        case "campus_admin":
          url = `/api/users/campus-admin-profiles/${profileId}/`;
          break;
        default:
          throw new Error(`Unsupported profile type: ${profileType}`);
      }

      const response = await api.patch(url, profileData);
      setCurrentProfile(response.data);
      return response.data;
    } catch (err) {
      console.error(`Profile update error:`, err);
      setError(err.response?.data || err.message || "Failed to update profile");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Get a profile by ID
   * @param {string|number} profileId - The ID of the profile to fetch
   */
  const getProfile = async (profileId) => {
    setIsLoading(true);
    setError(null);

    try {
      let url;
      switch (profileType) {
        case "student":
          url = `/api/users/student-profiles/${profileId}/`;
          break;
        case "merchant":
          url = `/api/users/merchant-profiles/${profileId}/`;
          break;
        case "tutor":
          url = `/api/users/tutor-profiles/${profileId}/`;
          break;
        case "campus_admin":
          url = `/api/users/campus-admin-profiles/${profileId}/`;
          break;
        default:
          throw new Error(`Unsupported profile type: ${profileType}`);
      }

      const response = await api.get(url);
      setCurrentProfile(response.data);
      return response.data;
    } catch (err) {
      console.error(`Profile fetch error:`, err);
      setError(err.response?.data || err.message || "Failed to fetch profile");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    currentProfile,
    universities: universityList,
    clearError,
    createProfile,
    updateProfile,
    getProfile,
    getUniversities,
  };
};

export default useProfiles;
