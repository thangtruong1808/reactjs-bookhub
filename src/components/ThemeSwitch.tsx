import { useState, useEffect } from "react";
import { useThemeContext } from "../hooks/useThemeContext";
import { FaMoon, FaSun } from "react-icons/fa";
import styled from "styled-components";
import { useTheme } from "../components/context/ThemeContext";
import Sun from "../assets/Sun.svg";
import Moon from "../assets/Moon.svg";

const ThemeSwitch = () => {
  const setDarkMode = () => {
    document.querySelector("body")?.setAttribute("data-theme", "dark");
    localStorage.setItem("selectedTheme", "dark");
  };

  const setLightMode = () => {
    document.querySelector("body")?.setAttribute("data-theme", "light");
    localStorage.setItem("selectedTheme", "light");
  };

  const selectedTheme = localStorage.getItem("selectedTheme");

  if (selectedTheme === "dark") {
    setDarkMode();
  }

  const toggleTheme = (e: { target: { checked: unknown } }) => {
    if (e.target.checked) setDarkMode();
    else setLightMode();
  };
  // console.log("------- You called ThemeSwitch Component -------");

  return (
    <>
      {/* <div className="form-check form-switch mx-2 position-absolute bottom-0 start-0 mb-2"> */}
      <div className="form-check form-switch mx-2 ">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="darkmode-toggle"
          // checked={darkMode}
          onChange={toggleTheme}
          defaultChecked={selectedTheme === "dark"}
        />
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
          Switch Theme
        </label>
      </div>
    </>
    // <div id="theme-switch" className="me-5">
    //   <div className="switch-track">
    //     <div className="switch-check">
    //       <span className="switch-icon">🌙</span>
    //     </div>
    //     <div className="switch-x">
    //       <span className="switch-icon">🌞</span>
    //     </div>
    //     <div className="switch-thumb"></div>
    //   </div>
    //   <input
    //     type="checkbox"
    //     checked={darkMode}
    //     onChange={switchTheme}
    //     aria-label="Switch between dark and light mode"
    //   />
    // </div>
  );
};

export default ThemeSwitch;
