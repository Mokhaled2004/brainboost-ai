import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import Spinnerloader from "../../components/Loader/Spinnerloader";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

const CreateSessionForm = () => {
  const [formData, setFormData] = useState({
    role: "",
    experience: "",
    topicsToFocus: "",
    description: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleChange = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value,
    }));
  };

  const handleCreateSession = async (e) => {
    e.preventDefault();

    const { role, experience, topicsToFocus, description } = formData;

    if (!role || !experience || !topicsToFocus) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    setIsLoading(true);

    try {
      // Call AI API to generate questions
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role,
          experience,
          topicsToFocus,
          numberOfQuestions: 10, // Example number
        }
      );

      // Should be array like [{question , answer}, ...]
      const generatedQuestions = aiResponse.data;
      const response = await axiosInstance.post(API_PATHS.SESSION.CREATE, {
        ...formData,
        questions: generatedQuestions,
      });

      if (response.data?.session?._id) {
        navigate(`/interview-prep/${response.data?.session?._id}`);
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred while creating the session.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[90vw] md:w-[35vw] p-8 flex flex-col justify-center bg-white rounded-2xl shadow-lg">
      {/* Heading */}
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        Start a New Interview Journey
      </h3>
      <p className="text-sm text-gray-600 mb-6 leading-relaxed">
        Fill out a few quick details and unlock your personalised set of
        interview questions.
      </p>

      {/* Form */}
      <form onSubmit={handleCreateSession} className="flex flex-col gap-5">
        <Input
          value={formData.role}
          onChange={({ target }) => handleChange("role", target.value)}
          label="Target Role"
          placeholder="e.g. Software Engineer, Data Scientist"
          type="text"
        />

        <Input
          value={formData.experience}
          onChange={({ target }) => handleChange("experience", target.value)}
          label="Years of Experience"
          placeholder="e.g. 1, 3, 5+"
          type="number"
        />

        <Input
          value={formData.topicsToFocus}
          onChange={({ target }) => handleChange("topicsToFocus", target.value)}
          label="Topics to Focus"
          placeholder="e.g. Data Structures, Algorithms"
          type="text"
        />

        <Input
          value={formData.description}
          onChange={({ target }) => handleChange("description", target.value)}
          label="Session Description"
          placeholder="e.g. Briefly describe your session goals"
          type="text"
        />

        {/* Error Message */}
        {error && (
          <p className="text-sm text-red-500 font-medium bg-red-50 px-3 py-2 rounded-lg border border-red-200">
            {error}
          </p>
        )}

        {/* Submit Button */}
        <button
          className="w-full mt-2 py-3 rounded-lg font-semibold text-white 
             bg-black hover:bg-gray-800
             disabled:opacity-50 disabled:cursor-not-allowed
             transition-all duration-300 shadow-md hover:shadow-lg
             flex items-center justify-center gap-2"
          type="submit"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Spinnerloader />
              <span>Creating...</span>
            </>
          ) : (
            "Create Session"
          )}
        </button>
      </form>
    </div>
  );
};

export default CreateSessionForm;
