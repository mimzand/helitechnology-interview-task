import React from "react";
import Header from "./components/Header";
import { ToastProvider } from "./components/Toast/Provider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Feed from "./pages/Feed";
import Saved from "./pages/Saved";

const App: React.FC = () => {
  return (
    <ToastProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Feed />} />
              <Route path="/saved-posts" element={<Saved />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ToastProvider>
  );
};

export default App;
