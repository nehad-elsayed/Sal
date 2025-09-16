import { AuthContext } from "../Contexts/AuthContext";
import { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Home,
  Bell,
  HelpCircle,
  User,
  LogOut,
  ChevronDown,
} from "lucide-react";

export default function Navbar() {
  const { isAuth, onLogout } = useContext(AuthContext) as {
    isAuth: boolean;
    onLogout: () => void;
  };
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Add search functionality here
    console.log("Searching for:", searchQuery);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="bg-primary px-4 sm:px-6 py-4 shadow-lg">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo Section */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-serif">
            Sal
          </h1>
          <span className="text-sm sm:text-lg text-white font-light hidden sm:block">
            any question
          </span>
        </div>

        {/* Search Bar - Hidden on mobile, visible on larger screens */}
        {isAuth && (
          <>
            <div className="hidden md:flex flex-1 max-w-md mx-4 lg:mx-8">
              <form onSubmit={handleSearch} className="relative w-full">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 sm:py-3  text-white placeholder-gray-600 rounded-lg border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent text-sm sm:text-base"
                  />
                </div>
              </form>
            </div>

            {/* Navigation Icons and User Section */}
            <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6">
              {/* Navigation Icons */}
              <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4">
                <button
                  onClick={() => navigate("/")}
                  className="p-2 text-white hover:bg-blue-500 rounded-lg transition-colors duration-200"
                  title="Home"
                >
                  <Home className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                <button
                  className="p-2 text-white hover:bg-blue-500 rounded-lg transition-colors duration-200 relative"
                  title="Notifications"
                >
                  <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
                  {/* Notification badge */}
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center ">
                    3
                  </span>
                </button>

                <button
                  className="p-2 text-white hover:bg-blue-500 rounded-lg transition-colors duration-200"
                  title="Help"
                >
                  <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>
              </div>

              {/* User Profile Section */}
              {isAuth && (
                <div className="relative" ref={dropdownRef}>
                  {/* User Avatar with Dropdown Toggle */}
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center space-x-2 p-1 rounded-lg hover:bg-blue-500 transition-colors duration-200"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full flex items-center justify-center overflow-hidden">
                      {/* You can replace this with an actual user image */}
                      <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
                        alt="User Avatar"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to icon if image fails to load
                          e.currentTarget.style.display = "none";
                          const nextElement = e.currentTarget
                            .nextElementSibling as HTMLElement;
                          if (nextElement) {
                            nextElement.style.display = "flex";
                          }
                        }}
                      />
                      <User className="w-4 h-4 sm:w-6 sm:h-6 text-white hidden" />
                    </div>
                    <ChevronDown
                      className={`w-4 h-4 text-white transition-transform duration-200 ${
                        isDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      {/* Menu Items */}
                      <div className="py-1">
                        <button
                          onClick={() => {
                            navigate("/profile");
                            setIsDropdownOpen(false);
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                        >
                          <User className="w-4 h-4 mr-3" />
                          Profile
                        </button>
                      </div>

                      {/* Logout Section */}
                      <div className="border-t border-gray-100 py-1">
                        <button
                          onClick={() => {
                            onLogout();
                            setIsDropdownOpen(false);
                            navigate("/login");
                          }}
                          className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                        >
                          <LogOut className="w-4 h-4 mr-3" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Mobile Search Bar - Visible only on mobile */}
      <div className="md:hidden mt-4">
        <form onSubmit={handleSearch} className="relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-300 w-5 h-5" />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-blue-500 text-white placeholder-blue-300 rounded-lg border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent"
            />
          </div>
        </form>
      </div>
    </nav>
  );
}
