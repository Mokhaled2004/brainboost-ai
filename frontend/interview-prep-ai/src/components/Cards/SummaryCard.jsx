import React from "react";
import { LuTrash2 } from "react-icons/lu";
import { getInitials } from "../../utils/helper"; // Assuming you have a helper function to get initials

const SummaryCard = ({
  colors,
  role,
  topicsToFocus,
  experience,
  questions,
  description,
  lastUpdated,
  onSelect,
  onDelete,
}) => {
  return (
    <div
      className="bg-white border border-gray-200 rounded-2xl p-3 overflow-hidden 
                 cursor-pointer hover:shadow-lg hover:border-blue-300 transition-all duration-300 
                 relative group"
      onClick={onSelect}
    >
      <div
        className="rounded-xl p-4 relative"
        style={{ background: colors.bgcolor }}
      >
        <div className="flex items-start">
          {/* Avatar/Icon */}
          <div className="flex-shrink-0 w-12 h-12 bg-white rounded-lg flex items-center justify-center mr-4 shadow-sm">
            <span className="text-lg font-bold text-gray-800">
              {getInitials(role)}
            </span>
          </div>

          {/* Role + Topics */}
          <div className="flex-grow">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-[18px] font-semibold text-gray-900 leading-tight">
                  {role}
                </h2>
                <p className="text-xs font-medium text-gray-600">
                  {topicsToFocus}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Delete Button */}
        <button
          className="hidden group-hover:flex items-center gap-1.5 text-xs text-rose-600 font-medium 
                     bg-rose-50 px-3 py-1 rounded-md border border-rose-200 
                     hover:bg-rose-100 hover:border-rose-300 transition absolute top-3 right-3"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <LuTrash2 />
        </button>
      </div>

      {/* Info Section */}
      <div className="px-4 pb-4">
        <div className="flex flex-wrap items-center gap-2 mt-4">
          <div className="text-[11px] font-medium text-gray-800 px-3 py-1 border border-gray-300 rounded-full bg-gray-50">
            Experience: {experience} {experience == 1 ? "year" : "years"}
          </div>
          <div className="text-[11px] font-medium text-gray-800 px-3 py-1 border border-gray-300 rounded-full bg-gray-50">
            {questions} Q&A
          </div>
          <div className="text-[11px] font-medium text-gray-800 px-3 py-1 border border-gray-300 rounded-full bg-gray-50">
            Last Update: {lastUpdated}
          </div>
        </div>

        <p className="text-[13px] text-gray-600 font-normal leading-snug line-clamp-2 mt-3">
          {description}
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;
