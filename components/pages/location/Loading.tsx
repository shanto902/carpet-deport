import { FaLocationArrow } from "react-icons/fa";

const Loading = () => {
  return (
    <div className="py-24 h-screen flex flex-col items-center justify-center text-center">
      <div className="relative mb-4">
        <div className="animate-ping absolute inline-flex h-16 w-16 rounded-full bg-blue-400 opacity-75"></div>
        <div className="relative inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-500 text-white text-3xl">
          <FaLocationArrow />
        </div>
      </div>
      <p className="text-lg text-gray-700 font-medium">
        Finding nearby stores...
      </p>
      <p className="text-sm text-gray-500 mt-1">
        Hang tight while we load your closest location
      </p>
    </div>
  );
};

export default Loading;
