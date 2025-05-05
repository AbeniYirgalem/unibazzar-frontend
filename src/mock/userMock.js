/**
 * Mock data for testing user authentication and profiles
 */

export const mockUsers = [
  {
    id: 1,
    email: "student@test.com",
    full_name: "John Student",
    role: "student",
    is_email_verified: true,
    date_joined: "2023-01-15T10:30:00Z",
    profile_id: 101,
    student_profile: {
      university_id: 5,
      university_name: "University of California, Berkeley",
    },
  },
  {
    id: 2,
    email: "merchant@test.com",
    full_name: "Mary Merchant",
    role: "merchant",
    is_email_verified: true,
    date_joined: "2023-02-20T14:45:00Z",
    profile_id: 201,
    merchant_profile: {
      store_name: "Campus Supplies Co.",
      nearest_university: "Stanford University",
      phone_number: "+1 (555) 123-4567",
      tin_number: "123-45-6789",
    },
  },
  {
    id: 3,
    email: "tutor@test.com",
    full_name: "Terry Tutor",
    role: "tutor",
    is_email_verified: true,
    date_joined: "2023-03-10T09:15:00Z",
    profile_id: 301,
    tutor_profile: {
      department: "Computer Science",
      year: "3",
      teaching_levels: ["High School", "College"],
      subjects_scores: {
        Programming: "A+",
        Algorithms: "A",
        "Data Structures": "A+",
      },
    },
  },
];

export const mockUniversities = [
  { id: 1, name: "Harvard University" },
  { id: 2, name: "Stanford University" },
  { id: 3, name: "Massachusetts Institute of Technology" },
  { id: 4, name: "Princeton University" },
  { id: 5, name: "University of California, Berkeley" },
  { id: 6, name: "Yale University" },
  { id: 7, name: "Columbia University" },
  { id: 8, name: "California Institute of Technology" },
  { id: 9, name: "University of Chicago" },
  { id: 10, name: "University of Pennsylvania" },
];

export default {
  users: mockUsers,
  universities: mockUniversities,
};
