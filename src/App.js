import React from "react";
import {
   BrowserRouter as Router,
   Route,
   Routes,
   Navigate,
} from "react-router-dom";
import LoginPage from "./components/LoginPage";
import DashboardPage from "./components/DashboardPage";
import RegisterPage from "./components/RegisterPage"; // Import RegisterPage
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute
import AboutPage from "./components/pages/AboutPage";
import BlogPage from "./components/pages/BlogPage";
import ContactPage from "./components/pages/ContactPage";

function App() {
   const token = localStorage.getItem("token");

   return (
      <Router>
         <Routes>
            {/* Redirect root ("/") to login */}
            <Route
               path="/"
               element={
                  token ? (
                     <Navigate to="/dashboard" />
                  ) : (
                     <Navigate to="/login" />
                  )
               }
            />

            {/* Public Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/contact" element={<ContactPage />} />

            {/* Protected Route for the dashboard, only accessible to specific roles */}
            <Route
               path="/dashboard"
               element={
                  <ProtectedRoute
                     element={DashboardPage}
                     allowedRoles={["administrator", "editor"]}
                  />
               }
            />

            {/* Catch any undefined routes and redirect to login */}
            <Route path="*" element={<Navigate to="/login" />} />
         </Routes>
      </Router>
   );
}

export default App;
