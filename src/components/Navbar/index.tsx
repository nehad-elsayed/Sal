import { AuthContext } from "../Contexts/AuthContext";
import { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Bell, HelpCircle, User, LogOut, ChevronDown } from "lucide-react";
// import defaultAvatarImg from "../../assets/images/avatar.avif";
import useLogout from "@/hooks/useLogout";
import useNotifications from "@/hooks/useNotifications";
import useProfile from "@/hooks/useProfile";
import useMarkNotificationAsRead from "@/hooks/useMarkNotificationAsRead";
import type { Notifications } from "@/types/backend";

export default function Navbar() {
  const { isAuth } = useContext(AuthContext) as { isAuth: boolean };
  const navigate = useNavigate();
  // const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const { data: profileData } = useProfile();
  const { mutate: logoutData } = useLogout();
  const { data: notificationsData } = useNotifications();
  const { mutate: markAsRead } = useMarkNotificationAsRead();
  // const handleSearch = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   // Add search functionality here
  //   console.log("Searching for:", searchQuery);
  // };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
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

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };
  function checkNotificationDetails(notification: Notifications) {
    // mark notification as read if it's not already read
    if (!notification.is_read) {
      markAsRead(notification.id);
    }

    // extract question id from url
    const url = notification.url || "";
    // handle different url formats: /question/123, /api/question/123, or just 123
    let questionId = "";
    if (url.includes("/question/")) {
      questionId = url.split("/question/")[1]?.split("/")[0] || "";
    } else if (url.includes("/api/question/")) {
      questionId = url.split("/api/question/")[1]?.split("/")[0] || "";
    } else if (/^\d+$/.test(url)) {
      // if url is just a question id
      questionId = url;
    } else {
      // try to extract question id number from the URL
      const match = url.match(/\/(\d+)/);
      questionId = match ? match[1] : "";
    }

    if (questionId) {
      navigate(`/question/${questionId}`);
      setIsNotificationsOpen(false);
    }
  }

  return (
    <nav className="bg-primary px-4 sm:px-6 py-4 shadow-lg">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo Section */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-serif">Sal</h1>
          <span className="text-sm sm:text-lg text-white font-light hidden sm:block">
            any question
          </span>
        </div>

        {/* Search Bar - Hidden on mobile, visible on larger screens */}
        {isAuth && (
          <>
            {/* search bar */}

            {/* Navigation Icons and User Section */}
            <div className="flex items-center space-x-2 sm:space-x-4 lg:space-x-6">
              {/* Navigation Icons */}
              <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4">
                <button
                  onClick={() => navigate("/")}
                  className="p-2 text-white hover:bg-[hsl(var(--primary-foreground))] hover:text-white rounded-lg transition-colors duration-200"
                  title="Home"
                >
                  <Home className="w-5 h-5 sm:w-6 sm:h-6" />
                </button>

                <div className="relative" ref={notificationsRef}>
                  <button
                    className="p-2 text-white hover:bg-[hsl(var(--primary-foreground))] hover:text-white rounded-lg transition-colors duration-200 relative"
                    title="Notifications"
                    onClick={toggleNotifications}
                  >
                    <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
                    {/* Notification badge */}
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center ">
                      {notificationsData?.data?.length || 0}
                    </span>
                  </button>

                  {/* Notifications Dropdown */}
                  {isNotificationsOpen && (
                    <div className="absolute  left-[40%] transform -translate-x-1/2 sm:right-0 sm:left-auto sm:transform-none mt-2 w-72 sm:w-80 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 max-h-80 overflow-y-auto">
                      <div className="px-3 sm:px-4 py-2 border-b border-gray-100">
                        <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                          Notifications
                        </h3>
                      </div>
                      <div className="py-2">
                        {notificationsData && notificationsData.data.length > 0 ? (
                          notificationsData.data.map(
                            (notification: {
                              id: number;
                              content?: string;
                              created_at?: string;
                              is_read?: boolean;
                              url?: string;
                            }) => (
                              <div
                                key={notification.id}
                                className="px-3 sm:px-4 py-2 sm:py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0"
                              >
                                <div className="flex items-start space-x-2 sm:space-x-3">
                                  <div className="flex-shrink-0">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-1.5 sm:mt-2"></div>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                                      {notification.content || "New Notification"}
                                    </p>
                                    <p className="text-xs sm:text-sm text-gray-500 mt-1 line-clamp-2">
                                      {notification.created_at || "You have a new notification"}
                                    </p>
                                    <button
                                      onClick={() =>
                                        checkNotificationDetails(notification as Notifications)
                                      }
                                      className="text-blue-500 hover:text-blue-600 underline text-xs sm:text-sm mt-1"
                                    >
                                      go to question
                                    </button>
                                    <span
                                      className={`${
                                        notification.is_read ? "text-green-500" : "text-red-500"
                                      } text-xs sm:text-sm`}
                                    >
                                      {" "}
                                      {notification.is_read ? "Read" : "Unread"}{" "}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            )
                          )
                        ) : (
                          <div className="px-3 sm:px-4 py-6 sm:py-8 text-center text-gray-500">
                            <Bell className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-gray-300" />
                            <p className="text-sm sm:text-base">No notifications yet</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                <button
                  className="p-2 text-white hover:bg-[hsl(var(--primary-foreground))] hover:text-white rounded-lg transition-colors duration-200"
                  title="open app on github"
                >
                  <HelpCircle
                    className="w-5 h-5 sm:w-6 sm:h-6"
                    onClick={() => window.open("https://github.com/nehad-elsayed/Sal", "_blank")}
                  />
                </button>
              </div>

              {/* User Profile Section */}
              {isAuth && (
                <div className="relative" ref={dropdownRef}>
                  {/* User Avatar with Dropdown Toggle */}
                  <button
                    onClick={toggleDropdown}
                    className="flex items-center space-x-2 p-1 rounded-lg hover:bg-[hsl(var(--primary-foreground))] hover:text-white transition-colors duration-200"
                  >
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-400 to-blue-500 hover:bg-[hsl(var(--primary))] hover:text-white transition-colors duration-200 rounded-full flex items-center justify-center overflow-hidden">
                      {profileData?.avatar ? (
                        <img
                          key={profileData.avatar}
                          src={`${profileData.avatar}?t=${Date.now()}`}
                          alt={profileData?.full_name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback to initials if image fails to load
                            e.currentTarget.style.display = "none";
                            const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                            if (nextElement) {
                              nextElement.style.display = "flex";
                            }
                          }}
                        />
                      ) : null}
                      <div
                        className={`w-full h-full flex items-center justify-center text-white text-xs sm:text-sm font-bold ${
                          profileData?.avatar ? "hidden" : "flex"
                        }`}
                        style={{
                          display: profileData?.avatar ? "none" : "flex",
                        }}
                      >
                        {profileData?.full_name
                          ? profileData.full_name.substring(0, 2).toUpperCase()
                          : "U"}
                      </div>
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
                            logoutData();
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
      {/* <div className="md:hidden mt-4">
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
      </div> */}
    </nav>
  );
}
