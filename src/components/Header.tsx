import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() =>
    JSON.parse(localStorage.getItem("darkMode") ?? "true")
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("darkMode", isDarkMode.toString());
  }, [isDarkMode]);

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/")}
      >
        Social Feed
      </h1>
      <div className="flex justify-start items-center gap-2">
        <button
          onClick={() => navigate("/saved-posts")}
          className="px-4 py-2 rounded-md"
        >
          Saved Posts
        </button>
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="bg-gray-700 px-4 py-2 rounded-md"
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </header>
  );
};

export default Header;
