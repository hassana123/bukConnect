import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";

const AdminLoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Sign in with email and password
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Fetch user document from Firestore
      const userDoc = doc(db, "users", user.uid);
      const adminData = await getDoc(userDoc);
      const admin = adminData.data();
      console.log(admin);
      localStorage.setItem("adminData", JSON.stringify(admin));

      // Check if the user is an admin
      if (admin.isAdmin) {
        // Navigate to the admin dashboard
        navigate("/admin/dashboard");
      } else {
        // User is not an admin, display error message
        setError("You are not authorized to access the admin dashboard.");
      }
    } catch (error) {
      setError(error.message);
    }

    setLoading(false);
  };

  return (
    <section className="py-20 w-[100%] flex text-black h-screen items-center bg-[#100F0F]">
      <div className="md:w-[35%] w-[98%] rounded-md mx-auto bg-white items-center py-10 px-3">
        <h1 className="text-3xl text-[25px] font-bold mb-4">Admin Login</h1>
        <p className="mb-4 text-[18px]">
          Hey! Enter your details to login to the admin dashboard.
        </p>
        <form className="text-center text-[18px]" onSubmit={handleLogin}>
          <label htmlFor="email" className="block font-bold mb-1">
            Enter Email
          </label>
          <input
            id="email"
            type="email"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 w-[95%] text-left block bg-transparent p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            required
          />
          <label htmlFor="password" className="block font-bold mb-1">
            Enter Password
          </label>
          <input
            id="password"
            type="password"
            placeholder=" "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 p-2 w-[95%] text-left block bg-transparent rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            required
          />
          <button
            type="submit"
            className="mb-5 mt-8 bg-blue-500 text-white px-20 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </section>
  );
};

export default AdminLoginPage;
