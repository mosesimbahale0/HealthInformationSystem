// app/components/Theme.tsx
import { useEffect, useState, createContext, ReactNode } from "react";

// Create ThemeContext
export const ThemeContext = createContext<{
  theme: "light" | "dark" | null;
  toggleTheme: () => void;
}>({
  theme: null,
  toggleTheme: () => {},
});

export default function Theme({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark" | null>(null);

  // Function to apply a theme by toggling 'dark' class
  function applyTheme(theme: "light" | "dark") {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }

  // Fetch theme from localStorage or detect system preference
  function fetchTheme(): "light" | "dark" {
    if (typeof window === 'undefined') {
      return 'light'; // Default to light theme on server-side
    }

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      return savedTheme;
    }
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    return systemPrefersDark ? "dark" : "light";
  }

  // Load theme on initial render
  useEffect(() => {
    const currentTheme = fetchTheme();
    setTheme(currentTheme);
    applyTheme(currentTheme);
  }, []);

  // Apply theme whenever `theme` changes
  useEffect(() => {
    if (theme) {
      applyTheme(theme);
      if (typeof window !== 'undefined') {
        localStorage.setItem("theme", theme);
      }
    }
  }, [theme]);

  // Provide the theme to child components
  const themeContextValue = {
    theme,
    toggleTheme: () => {
      setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
    },
  };

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <div className="bg-quaternary text-text min-h-screen">
        <main>{children}</main>
      </div>
    </ThemeContext.Provider>
  );
}
