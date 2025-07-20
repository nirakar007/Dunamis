import { Outlet, useLocation, useNavigate } from "react-router-dom";

const MediaLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Media Navigation */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <NavButton
              path="/media/teaching-word"
              isActive={location.pathname.includes("teaching-word")}
              text="Teaching the Word"
            />
            <NavButton
              path="/media/awakening-nations"
              isActive={location.pathname.includes("awakening-nations")}
              text="Awakening the Nations"
            />
            <NavButton
              path="/media/reaching-unreached"
              isActive={location.pathname.includes("reaching-unreached")}
              text="Reaching the Unreached"
            />
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </div>
    </div>
  );
};

const NavButton = ({ path, isActive, text }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(path)}
      className={`py-4 px-3 text-sm font-medium border-b-2 transition-colors ${
        isActive
          ? "border-custom-blue text-custom-blue"
          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
      }`}
    >
      {text}
    </button>
  );
};

export default MediaLayout;
