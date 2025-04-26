// app/components/ThemeToggle.tsx
import React, { useContext } from "react";
import { Switch } from "@headlessui/react";
import { ThemeContext } from "./Theme";

function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <Switch
      checked={theme === "dark"}
      onChange={toggleTheme}
      className={`relative inline-flex items-center h-10 rounded-full w-16 transition-colors ease-in-out duration-200 ${
        theme === "dark" ? "bg-secondary shadow-inner shadow-black" : "bg-white shadow-inner"
      }`}
    >
      <span
        className={`w-8 h-8 transform rounded-full bg-tertiary shadow-lg transition-transform flex justify-center items-center ease-in-out duration-200 ${
          theme === "dark" ? "translate-x-8" : "translate-x-1"
        }`}
      >
        {theme === "dark" ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 24 24"
            className="text-text"
          >
            <path
              fill="currentColor"
              d="M11.5 5.423V2.039h1v3.384zm5.496 2.289l-.682-.683l2.357-2.452l.727.733zm1.581 4.788v-1h3.385v1zM11.5 21.962v-3.366h1v3.366zM7.042 7.68L4.577 5.329l.752-.708L7.73 7.004zm11.624 11.742l-2.352-2.452l.677-.657l2.388 2.346zM2.039 12.5v-1h3.384v1zm3.27 6.923l-.688-.752l2.358-2.357l.36.348l.378.354zM12.006 17q-2.082 0-3.544-1.457T7 12.005T8.457 8.46T11.995 7t3.544 1.457T17 11.995t-1.457 3.544T12.005 17"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="1.5em"
            height="1.5em"
            viewBox="0 0 24 24"
            className="text-text"
          >
            <path
              fill="currentColor"
              d="M12.1 22q-2.1 0-3.937-.8t-3.2-2.162t-2.163-3.2T2 11.9q0-3.65 2.325-6.437T10.25 2q-.45 2.475.275 4.838t2.5 4.137t4.138 2.5T22 13.75q-.65 3.6-3.45 5.925T12.1 22"
            />
          </svg>
        )}
      </span>
    </Switch>
  );
}

export default ThemeToggle;
