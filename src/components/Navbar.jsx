import React, { useEffect, useState } from "react";
import { FcStackOfPhotos } from "react-icons/fc";
import { FaHeart } from "react-icons/fa6";
import { FaSun, FaMoon, FaDownload } from "react-icons/fa";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import { useLogout } from "../hooks/useLogout";
import { useGlobalContext } from "../hooks/useGlobalContext";
function Navbar() {
  const { likedImages, user, downloadImages } = useGlobalContext();
  const { logout } = useLogout();

  const themeFromLocalStorage = () => {
    return localStorage.getItem("theme") || "winter";
  };

  const [theme, setTheme] = useState(themeFromLocalStorage());

  const toggleTheme = () => {
    setTheme(theme === "winter" ? "dracula" : "winter");
  };

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  return (
    <header className="bg-base-200">
      <div className="align-elements">
        <div className="navbar">
          <div className="navbar-start">
            <Link to="/" className="hidden md:flex">
              <FcStackOfPhotos className="h-10 w-10" />
            </Link>
            <div className="dropdown md:hidden">
              <div tabIndex={0} role="button">
                <FcStackOfPhotos className="h-10 w-10" />
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
              >
                <NavLinks />
              </ul>
            </div>
          </div>
          <div className="navbar-center hidden md:flex">
            <ul className="menu menu-horizontal rounded-box">
              <NavLinks />
            </ul>
          </div>
          <div className="navbar-end flex items-center gap-3 md:gap-5">
            <Link to="/downloadImages" className="flex">
              <div className="indicator">
                <span className="indicator-item badge badge-xs badge-secondary">
                  {downloadImages.length}
                </span>
                <FaDownload className="h-6 w-6" />
              </div>
            </Link>
            <Link to="/likedImages" className="flex">
              <div className="indicator">
                <span className="indicator-item badge badge-xs badge-secondary">
                  {likedImages.length}
                </span>
                <FaHeart className="h-6 w-6" />
              </div>
            </Link>

            <label className="swap swap-rotate">
              <input
                type="checkbox"
                onClick={toggleTheme}
                checked={theme === "dracula"}
                readOnly
              />
              <FaSun className="swap-on h-6 w-6 fill-current" />
              <FaMoon className="swap-off h-6 w-6 fill-current" />
            </label>
            <div className="flex items-center gap-3">
              <p className="text-sm md:text-base">
                {user?.displayName
                  ? `Hello, ${user.displayName.split(" ")[0]}`
                  : "Hello, User"}
              </p>

              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="ring-primary ring-offset-base-100 w-7 rounded-full ring ring-offset-2 md:w-9">
                    {user?.photoURL && (
                      <img
                        src={user?.photoURL || "User"}
                        alt={user?.displayName + " avatar" || "User"}
                      />
                    )}
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                >
                  <li>
                    <Link to="/profile" className="justify-between">
                      Profile
                      <span className="badge">New</span>
                    </Link>
                  </li>
                  <li>
                    <a>Settings</a>
                  </li>
                  <li>
                    <a onClick={logout}>Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
