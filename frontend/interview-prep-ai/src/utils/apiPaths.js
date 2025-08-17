export const BASE_URL = "http://localhost:8000";

export const API_PATHS = {
  AUTH: {
    REGISTER: "/api/auth/register", // Endpoint for user registration
    LOGIN: "/api/auth/login", // Endpoint for user login
    GET_PROFILE: "/api/auth/profile", // Endpoint for getting user profile
  },

  IMAGE: {
    UPLOAD_IMAGE: "/api/auth/upload-image", // Endpoint for uploading profile images
  },

  AI: {
    GENERATE_QUESTIONS: "/api/ai/generate-questions", // Endpoint for generating interview questions
    GENERATE_EXPLANATION: "/api/ai/generate-explanation", // Endpoint for generating concept explanations
  },

  SESSION: {
    CREATE: "/api/sessions/create", // Endpoint for creating a new interview session
    GET_ALL: "/api/sessions/my-sessions", // Endpoint for getting all interview sessions
    GET_ONE: (id) => `/api/sessions/${id}`, // Endpoint for getting a specific interview session by ID
    DELETE: (id) => `/api/sessions/${id}`, // Endpoint for deleting a specific interview session by ID
  },

  QUESTION: {
    ADD_TO_SESSION: "/api/questions/add", // Endpoint for adding questions to an interview session
    PIN: (id) => `/api/questions/${id}/pin`, // Endpoint for pinning a question in an interview session
    UPDATE_NOTE: (id) => `/api/questions/${id}/note`, // Endpoint for updating a question's note
  },
};
