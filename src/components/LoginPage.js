import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory

const LoginPage = () => {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const navigate = useNavigate(); // Replace useHistory with useNavigate

   const handleLogin = async (e) => {
      e.preventDefault();
      try {
         const response = await axios.post(
            "https://gcms.codaton.com/wp-json/jwt-auth/v1/token",
            {
               username,
               password,
            }
         );

         console.log(response.data); // Log the entire response to check if role is present

         if (response.data.token) {
            localStorage.setItem("token", response.data.token);

            // Check if the role exists in the response
            if (response.data.role && response.data.role[0]) {
               localStorage.setItem("role", response.data.role[0]);
               localStorage.setItem(
                  "user_display_name",
                  response.data.user_display_name
               );
               localStorage.setItem("user_email", response.data.user_email);
            } else {
               alert("Role information is missing from the response.");
            }

            // Navigate to the dashboard
            navigate("/dashboard");
         } else {
            alert("Invalid login response.");
         }
      } catch (error) {
         console.log(error); // Log error for debugging
         if (error.response) {
            alert("Invalid credentials, please try again");
         } else {
            alert("There was an issue connecting to the server.");
         }
      }
   };

   return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
         <div className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
            <form onSubmit={handleLogin}>
               <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                     Username
                  </label>
                  <input
                     type="text"
                     value={username}
                     onChange={(e) => setUsername(e.target.value)}
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
               </div>
               <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                     Password
                  </label>
                  <input
                     type="password"
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  />
               </div>
               <div className="flex items-center justify-between">
                  <button
                     type="submit"
                     className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                     Login
                  </button>
                  {/* Link to the Register page */}
                  <p>
                     Don't have an account?{" "}
                     <Link to="/register">Register here</Link>
                  </p>
               </div>
            </form>
         </div>
      </div>
   );
};

export default LoginPage;
