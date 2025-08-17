import React from "react";

const RoleInfoHeader = ({
  role,
  topicsToFocus,
  experience,
  description,
  questions,
  lastUpdated,
}) => {
  return (
    <div className="relative bg-white rounded-xl overflow-hidden">
      <div className="container mx-auto px-6 md:px-10">
        <div className="h-[200px] flex flex-col justify-center relative z-10">
          {/* Role + Topics */}
          <div className="flex items-start">
            <div className="flex-grow">
              <h2 className="text-3xl font-bold text-gray-900">{role}</h2>
              <p className="text-sm text-gray-600 mt-2">{topicsToFocus}</p>
            </div>
          </div>

          {/* Info Badges */}
          <div className="flex flex-wrap items-center gap-3 mt-6">
            <div className="text-[11px] font-medium text-white bg-black px-4 py-1.5 rounded-full shadow-sm">
              Experience: {experience} {experience == 1 ? "year" : "years"}
            </div>
            <div className="text-[11px] font-medium text-white bg-black px-4 py-1.5 rounded-full shadow-sm">
              {questions} Q&A
            </div>
            <div className="text-[11px] font-medium text-white bg-black px-4 py-1.5 rounded-full shadow-sm">
              Last Updated: {lastUpdated}
            </div>
          </div>
        </div>

        {/* Floating Blobs */}
        <div className="absolute top-0 right-0 w-[40vw] md:w-[30vw] h-[200px] flex items-center justify-center bg-white/50 overflow-hidden">
          <div className="w-20 h-20 bg-lime-400 blur-[70px] animate-pulse" />
          <div className="w-20 h-20 bg-teal-400 blur-[70px] animate-pulse delay-200" />
          <div className="w-20 h-20 bg-cyan-400 blur-[70px] animate-pulse delay-500" />
          <div className="w-20 h-20 bg-fuchsia-400 blur-[70px] animate-pulse delay-700" />
        </div>
      </div>
    </div>
  );
};

export default RoleInfoHeader;
