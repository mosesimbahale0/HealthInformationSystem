// app/utils/themeUtils.ts
export const getCurrentTheme = (): "dark" | "light" => {
    if (typeof window === 'undefined') {
      return 'light'; // Default to light theme on server-side
    }
  
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      return savedTheme;
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };
  
  export const setTheme = (theme: "dark" | "light"): void => {
    if (typeof window !== 'undefined') {
      localStorage.setItem("theme", theme);
    }
    document.documentElement.classList.toggle("dark", theme === "dark");
  };
  
  export const toggleTheme = (): void => {
    const currentTheme = getCurrentTheme();
    const newTheme = currentTheme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  };
  