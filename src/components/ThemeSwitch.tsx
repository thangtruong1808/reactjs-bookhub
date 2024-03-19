import { useState, useEffect } from "react";
// import Sun from "../assets/Sun.svg";
// import Moon from "../assets/Moon.svg";

const ThemeSwitch = () => {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    if (selectedTheme === "dark") {
      setDarkMode();
      setTheme("dark");
    }
  }, [theme]);

  const setDarkMode = () => {
    document.querySelector("body")?.setAttribute("data-theme", "dark");
    localStorage.setItem("selectedTheme", "dark");
  };

  const setLightMode = () => {
    document.querySelector("body")?.setAttribute("data-theme", "light");
    localStorage.setItem("selectedTheme", "light");
  };

  const selectedTheme = localStorage.getItem("selectedTheme");

  const toggleTheme = (e: { target: { checked: unknown } }) => {
    if (e.target.checked) {
      setDarkMode();
      setTheme("dark");
    } else {
      setLightMode();
      setTheme("light");
    }
  };

  return (
    <>
      {/* <div className="form-check form-switch mx-2 position-absolute bottom-0 start-0 mb-2"> */}
      <div className="form-check form-switch cursor-pointer">
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="darkmode-toggle"
          // checked={darkMode}
          onChange={toggleTheme}
          defaultChecked={selectedTheme === "dark"}
        />
        <label className="form-check-label" htmlFor="darkmode-toggle">
          {theme === "dark" ? "Dark Mode" : "Light Mode"}
        </label>
      </div>
    </>
  );
};

export default ThemeSwitch;
