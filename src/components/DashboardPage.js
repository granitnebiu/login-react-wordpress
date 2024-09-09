import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const DashboardPage = () => {
   const [role, setRole] = useState(null);
   const [profileImage, setProfileImage] = useState(""); // State for profile image
   const navigate = useNavigate();

   useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
         // Redirect to login if token is missing
         navigate("/login");
         return;
      }

      const storedRole = localStorage.getItem("role");
      if (storedRole) {
         setRole(storedRole);
      }

      const storedImage =
         localStorage.getItem("profileImage") ||
         "https://via.placeholder.com/150";
      setProfileImage(storedImage); // Fetch image from localStorage or use default
   }, [navigate]);

   const handleLogout = () => {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      navigate("/login");
   };

   // Sample user data for the table
   const users = [
      { name: "John Doe", role: "Administrator", lastLogin: "2024-09-01" },
      { name: "Jane Smith", role: "Editor", lastLogin: "2024-09-03" },
      { name: "Sarah Connor", role: "Subscriber", lastLogin: "2024-09-04" },
   ];

   return (
      <div className="min-h-screen bg-gray-100">
         {/* Navigation Bar */}
         <nav className="bg-blue-500 text-white py-4">
            <div className="container mx-auto flex justify-between items-center">
               <h1 className="text-xl font-bold">Dashboard</h1>
               <ul className="flex space-x-4">
                  <li>
                     <Link to="/about" className="hover:text-gray-200">
                        About Us
                     </Link>
                  </li>
                  <li>
                     <Link to="/blog" className="hover:text-gray-200">
                        Blog
                     </Link>
                  </li>
                  <li>
                     <Link to="/contact" className="hover:text-gray-200">
                        Contact Us
                     </Link>
                  </li>
                  <li>
                     <button
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                     >
                        Logout
                     </button>
                  </li>
               </ul>
            </div>
         </nav>

         {/* Dashboard Content */}
         <div className="container mx-auto px-4 py-8">
            {/* Profile Section */}
            <div className="flex items-center justify-center mb-8">
               <img
                  src={profileImage}
                  alt="User profile"
                  className="w-24 h-24 rounded-full shadow-lg"
               />
               <div className="ml-6">
                  <h2 className="text-xl font-semibold text-gray-800">
                     Welcome, {role ? role : "User"}!
                  </h2>
                  {role && role.includes("administrator") && (
                     <p className="text-blue-500">You are an Administrator</p>
                  )}
                  {role && role.includes("editor") && (
                     <p className="text-green-500">You are an Editor</p>
                  )}
                  {role && role.includes("subscriber") && (
                     <p className="text-yellow-500">You are a Subscriber</p>
                  )}
                  {role && role.includes("contributor") && (
                     <p className="text-purple-500">You are a Contributor</p>
                  )}
               </div>
            </div>

            {/* Statistics Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
               <div className="bg-blue-100 p-6 rounded-lg text-center">
                  <h3 className="text-lg font-semibold text-blue-600">
                     Total Users
                  </h3>
                  <p className="text-3xl font-bold text-gray-700">123</p>
               </div>
               <div className="bg-green-100 p-6 rounded-lg text-center">
                  <h3 className="text-lg font-semibold text-green-600">
                     Active Users
                  </h3>
                  <p className="text-3xl font-bold text-gray-700">58</p>
               </div>
               <div className="bg-yellow-100 p-6 rounded-lg text-center">
                  <h3 className="text-lg font-semibold text-yellow-600">
                     New Signups
                  </h3>
                  <p className="text-3xl font-bold text-gray-700">12</p>
               </div>
            </div>

            {/* Recent Activity Section */}
            <div className="mb-8">
               <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  Recent Activity
               </h3>
               <ul className="space-y-2">
                  <li className="bg-gray-100 p-4 rounded-lg">
                     John Doe updated his profile on 2024-09-01
                  </li>
                  <li className="bg-gray-100 p-4 rounded-lg">
                     Jane Smith edited a post on 2024-09-03
                  </li>
                  <li className="bg-gray-100 p-4 rounded-lg">
                     Sarah Connor subscribed to the newsletter on 2024-09-04
                  </li>
               </ul>
            </div>

            {/* User List Section */}
            <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
               <h3 className="text-xl font-semibold text-gray-800 mb-4">
                  User List
               </h3>
               <table className="w-full text-left">
                  <thead>
                     <tr>
                        <th className="py-2 px-4 border-b-2 border-gray-300">
                           Name
                        </th>
                        <th className="py-2 px-4 border-b-2 border-gray-300">
                           Role
                        </th>
                        <th className="py-2 px-4 border-b-2 border-gray-300">
                           Last Login
                        </th>
                     </tr>
                  </thead>
                  <tbody>
                     {users.map((user, index) => (
                        <tr key={index}>
                           <td className="py-2 px-4 border-b border-gray-300">
                              {user.name}
                           </td>
                           <td className="py-2 px-4 border-b border-gray-300">
                              {user.role}
                           </td>
                           <td className="py-2 px-4 border-b border-gray-300">
                              {user.lastLogin}
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
      </div>
   );
};

export default DashboardPage;
