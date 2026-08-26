import "./HeaderBar.css";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useState, useEffect } from "react";
export default function HeaderBar() {
  
  const [theme, setTheme] = useState(false);
  const toggleTheme = () => {
    setTheme((prev) => !prev);
  };
  useEffect(() => {
    const root = document.documentElement;
    if (theme) {
      root.classList.remove("dark-theme");
      root.classList.add("light-theme");
    } else {
      root.classList.remove("light-theme");
      root.classList.add("dark-theme");
    }
  }, [theme]);

  return (
    <div className="header-bar">
      <div className="theme-toggle-handle" onClick={toggleTheme}>
        {theme ? <LightModeIcon /> : <DarkModeIcon />}
      </div>
      <div className="logo">CV Builder</div>
      <div className="headerButtons">
        <button className="sampleCV">Sample Cv</button>
        <button className="pdfDownload">PDF</button>
      </div>
    </div>
  );
}
