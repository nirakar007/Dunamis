import { ChevronDown, CircleUserRound } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };
  return (
    <nav className="flex justify-between items-center h-16 px-6 md:h-16 lg:h-20 bg-gradient-to-b from-white to-transparent">
      <button
        onClick={() => handleNavigation("/")}
        className="font-semibold text-3xl hover:text-custom-blue transition duration-200 ease-in-out"
      >
        Dunamis
      </button>

      {/* --- MODIFIED LINE --- */}
      {/* Added 'items-center' to vertically align all children */}
      <div className="flex justify-evenly items-center space-x-8 mx-10">
        {/* Media Dropdown */}
        <MediaDropdown />

        <button
          onClick={() => handleNavigation("/about")}
          className="transition duration-300 ease-in-out hover:underline hover:underline-offset-4"
        >
          About
        </button>

        <button
          onClick={() => handleNavigation("/contact")}
          className="transition duration-300 ease-in-out hover:underline hover:underline-offset-4"
        >
          Contact
        </button>

        <button
          onClick={() => handleNavigation("/donate")}
          className="hover:text-green-600 transition duration-200 ease-in-out hover:underline hover:underline-offset-4"
        >
          Give
        </button>

        {/* --- MODIFIED LINE --- */}
        {/* Removed the span and the '-mt-3' class */}
        <RoleDropdown />
      </div>
    </nav>
  );
}

// New MediaDropdown component (no changes needed here)
function MediaDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false); // Close dropdown after navigation
  };

  return (
    <div className="relative inline-block text-center">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-1 transition duration-300 ease-in-out hover:underline hover:underline-offset-4"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)} // Added onMouseLeave for better UX
      >
        <span>Media</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div
          className="absolute left-0 mt-2 w-64 bg-white border border-gray-300 rounded-lg shadow-lg z-50"
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="py-1">
            <button
              onClick={() => handleNavigation("/media/teaching-word")}
              className="w-full text-left px-4 py-2 hover:bg-blue-50 transition duration-300 ease-in-out"
            >
              Teaching the Word
            </button>
            <button
              onClick={() => handleNavigation("/media/awakening-nations")}
              className="w-full text-left px-4 py-2 hover:bg-blue-50 transition duration-300 ease-in-out"
            >
              Awakening the Nations
            </button>
            <button
              onClick={() => handleNavigation("/media/reaching-unreached")}
              className="w-full text-left px-4 py-2 hover:bg-blue-50 transition duration-300 ease-in-out"
            >
              Reaching the Unreached
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function RoleDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
    setIsOpen(false); // Close dropdown
  };

  return (
    // --- MODIFIED LINE ---
    // Removed 'mt-2' from the container
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onBlur={() => setIsOpen(false)} // Close when clicking away
        className="text-gray-500 w-8 h-8 rounded-full flex items-center justify-center focus:outline-none"
      >
        <CircleUserRound />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 p-1 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
          <div className="bg-blue-500 text-white font-semibold px-4 py-2 rounded-t">
            Log in as
          </div>
          <button
            onClick={() => handleNavigation("/auth")}
            className="w-full text-left px-4 py-2 hover:bg-slate-200 font-medium rounded-b-lg transition duration-300 ease-in-out"
          >
            Teacher
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
