import React, { createContext, useState, useContext, useEffect } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme")|| (window.matchMedia("(prefers-color-scheme: dark)").matches&&"dark")|| "light");

  useEffect(() => {
    document.body.className = theme; // theme is either 'light' or 'dark'
    localStorage.setItem("theme", theme); // Store the theme in local storage
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
