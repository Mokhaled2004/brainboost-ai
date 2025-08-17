import { useRef, useState } from "react";
import { LuUser, LuUpload, LuTrash } from "react-icons/lu";

/**
 * ProfilePhotoSelector Component
 * --------------------------------
 * Handles:
 *  - File selection via hidden <input type="file">
 *  - Preview image rendering
 *  - Removing selected image
 *
 * Props:
 *  - image (File | null) -> Current image file from parent
 *  - setImage (function) -> Setter to update image in parent
 *  - preview (string | null) -> Optional existing image URL from parent
 *  - setPreview (function) -> Optional setter to update preview URL in parent
 */
const ProfilePhotoSelector = ({ image, setImage, preview, setPreview }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      //Update the image state
      setImage(file);
      //Generate preview URL from the file

      const preview = URL.createObjectURL(file);
      if (setPreview) {
        setPreview(preview);
      }
      setPreviewUrl(preview);
    }
  };

  const handleRemoveImage = () => {
    setImage(null);
    setPreviewUrl(null);
    if (setPreview) {
      setPreview(null);
    }
  };

  const onChooseFile = () => {
    inputRef.current.click();
  };

  return (
    <div className="flex justify-center mb-6">
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleImageChange}
        className="hidden"
      />
      {!image ? (
        <div className="w-24 h-24 flex items-center justify-center bg-cyan-50 rounded-full relative cursor-pointer hover:shadow-lg transition-shadow duration-300">
          <LuUser className="text-5xl text-cyan-500" />

          <button
            type="button"
            onClick={onChooseFile}
            className="w-8 h-8 flex items-center justify-center bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-full absolute bottom-0 right-0 shadow-md hover:scale-110 transition-transform duration-300"
          >
            <LuUpload />
          </button>
        </div>
      ) : (
        <div className="relative">
          <img
            src={preview || previewUrl}
            alt="Profile Preview"
            className="w-20 h-20 rounded-full object-cover"
          />
          <button
            className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute bottom-1 right-1 cursor-pointer "
            type="button"
            onClick={handleRemoveImage}
          >
            <LuTrash />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
