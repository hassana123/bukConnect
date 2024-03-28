import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state

  const handleResetPassword = async (e) => {
    e.preventDefault();

    setLoading(true); // Set loading to true when sending the email

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage(
        "An email has been sent with instructions to reset your password."
      );
      setLoading(false); // Set loading to false after successful sending
    } catch (err) {
      console.log(err);
      setError(err.message);
      setLoading(false); // Set loading to false if there's an error
    }
  };

  // Render message and redirect if email sent successfully
  if (message) {
    setTimeout(() => {
      window.location.href = "https://mail.google.com"; // Redirect to email
    }, 5000); // Redirect after 5 seconds

    return (
      <div className="py-20 w-[100%] flex text-black h-screen items-center bg-[#100F0F]">
        <div className="md:w-[35%] w-[95%] rounded-md mx-auto bg-white items-center py-10 px-8">
          <p className="text-green-500">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-20 w-[100%] flex text-black h-screen items-center bg-[#100F0F]">
      <div className="md:w-[35%] w-[95%] rounded-md mx-auto bg-white items-center py-10 px-8">
        <h1 className="text-3xl font-bold mb-4">Password Reset</h1>
        <p className="mb-4">Please enter your email</p>
        <form className="w-full mx-auto" onSubmit={handleResetPassword}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 block w-[90%] bg-transparent p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            required
          />
          <button
            type="submit"
            className="mb-5 mt-2 bg-blue-500 text-white px-4 py-2 rounded"
            disabled={loading} // Disable button when loading
          >
            {loading ? "Sending..." : "Send"}
            {/* Change button text based on loading state */}
          </button>
        </form>
        {error && <p className="text-red-500">{error}</p>}
        <div className="text-center">
          <p className="mb-2">
            <span className="font-bold"> Remembered your password?</span>{" "}
            <NavLink className="text-[#1F45CC] underline mx-1" to="/login">
              Login
            </NavLink>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ForgotPasswordPage;
