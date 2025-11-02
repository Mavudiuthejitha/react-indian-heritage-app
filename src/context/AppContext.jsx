import React, { createContext, useContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [user, setUser] = useLocalStorage("ihe_user", null); // {name, role}
  const [favorites, setFavorites] = useLocalStorage("ihe_favorites", []);
  const [theme, setTheme] = useLocalStorage("ihe_theme", "light");

  function toggleFavorite(item) {
    setFavorites(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) return prev.filter(i => i.id !== item.id);
      return [...prev, item];
    });
  }

  return (
    <AppContext.Provider value={{
      user, setUser,
      favorites, setFavorites,
      toggleFavorite,
      theme, setTheme
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
