import React, { useEffect, useState } from "react";
import { FcStackOfPhotos } from "react-icons/fc";
import { FaHeart } from "react-icons/fa6";
import { FaSun, FaMoon, FaDownload } from "react-icons/fa";
import { Link } from "react-router-dom";
import NavLinks from "./NavLinks";
import { useGlobalContext } from "../hooks/useGlobalContext";
function Navbar() {
  const { likedImages, downloadImages } = useGlobalContext();
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
    <header className="bg-base-200 ">
      <div className="align-elements">
        <div className="navbar">
          <div className="navbar-start ">
            <Link to="/" className="hidden md:flex">
              <FcStackOfPhotos className="w-10 h-10" />
            </Link>
            <div className="dropdown md:hidden">
              <div tabIndex={0} role="button">
                <FcStackOfPhotos className="w-10 h-10" />
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
          <div className="navbar-end flex items-center gap-5">
            <Link to="/downloadImages" className="flex">
              <div className="indicator">
                <span className="indicator-item badge badge-xs badge-secondary">
                  0
                </span>
                <FaDownload className="w-6 h-6" />
              </div>
            </Link>
            <Link to="/likedImages" className="flex">
              <div className="indicator">
                <span className="indicator-item badge badge-xs badge-secondary">
                  {likedImages.length}
                </span>
                <FaHeart className="w-6 h-6" />
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
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
