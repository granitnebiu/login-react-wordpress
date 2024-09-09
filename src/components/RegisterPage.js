import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const RegisterPage = () => {
   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const handleRegister = async (e) => {
      e.preventDefault();
      try {
         await axios.post(
            "https://gcms.codaton.com/wp-json/wp/v2/users/register",
            {
               username,
               email,
               password,
            }
         );
         alert("Registration successful");
      } catch (error) {
         alert("Error registering user");
      }
   };

   return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
         <div className="w-full max-w-md bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h1 className="text-2xl font-bold mb-6 text-center">Register</h1>
            <form onSubmit={handleRegister}>
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
               <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2">
                     Email
                  </label>
                  <input
                     type="email"
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
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
                     className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  >
                     Register
                  </button>
                  {/* Link to the Register page */}
                  <p>
                     You have an account? <Link to="/login">Login here</Link>
                  </p>
               </div>
            </form>
         </div>
      </div>
   );
};

export default RegisterPage;
