import { useEffect, useState } from "react";

const DeveloperCredit = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show the credit after a short delay
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed bottom-4 right-4 transition-opacity duration-1000 ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-gray-100">
        <span className="text-sm text-gray-600">Developed by</span>
        <span className="text-sm font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Hemanth Kumar 🏸
        </span>
      </div>
    </div>
  );
};

export default DeveloperCredit;
