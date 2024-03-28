import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // Assuming you're using React Router for navigation
import { auth, db } from "../../firebase";
import { collection, getDoc, doc, orderBy } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";

const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      // Log in the user with email and password
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Check if the user is verified
      const user = userCredential.user;
      if (!user.emailVerified) {
        setError(
          "Please verify your email before logging in. \n A verification link Has been sent to your email \n click on it to be verfied "
        );
        setLoading(false);
        return;
      }

      const userDocRef = doc(db, "users", user.uid);
      const userDocSnapshot = await getDoc(userDocRef);

      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();

        // Store user data in local storage or cookies
        if (rememberMe) {
          localStorage.setItem("userData", JSON.stringify(userData));
          localStorage.setItem("currentUser", JSON.stringify(user.uid));
        } else {
          sessionStorage.setItem("userData", JSON.stringify(userData));
          localStorage.setItem("currentUser", JSON.stringify(user.uid));
        }
      }

      // Redirect user to dashboard or wherever after login
      navigate("/dashboard");
      console.log(user);
    } catch (err) {
      console.log(err);
      setError(err.message);
      setLoading(false);

      setTimeout(() => {
        setError(null);
      }, 5000);
    }
  };

  return (
    <section className="py-20 w-[100%] flex text-black  h-screen items-center bg-[#100F0F]">
      <div className="md:w-[35%] w-[98%] rounded-md mx-auto bg-white items-center py-10 px-3">
        <h1 className="text-3xl text-[25px] font-bold mb-4">Login</h1>
        <p className="mb-4 text-[18px]">
          Hey! Enter your details to login to your account.
        </p>
        <form className="text-center text-[18px]" onSubmit={handleLogin}>
          <label htmlFor="" className="text-left block font-bold mb-1">
            Enter Email
          </label>
          <input
            type="email"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 w-[95%] text-left block bg-transparent p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            required
          />
          <label htmlFor="" className="text-left block font-bold mb-1">
            Enter Password
          </label>
          <input
            type="password"
            placeholder=" "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 p-2 w-[95%] text-left block bg-transparent rounded border border-gray-300 focus:outline-none focus:border-blue-500"
            required
          />
          <div className="grid grid-cols-2">
            <div className="flex items-center mb-4">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="mr-2"
              />
              <span className="text-[15px]">Remember me</span>
            </div>
            <NavLink
              to="/forgot-password"
              className="text-blue-500 mb-4 block text-[15px]"
            >
              Forgot password?
            </NavLink>
          </div>
          <button
            type="submit"
            className="mb-5 mt-8 bg-blue-500 text-white px-20 py-2 rounded"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
        {error && <p className="text-red-500">{error}</p>}
        <div className="text-center">
          <p className="mb-2">
            <span className="font-bold">New user?</span>{" "}
            <NavLink className="mx-1 text-[#1F45CC]" to="/sign-up">
              Sign up
            </NavLink>
          </p>
          <span>
            By logging in you agree to our
            <br />
            <NavLink className="underline " to="">
              Terms and conditions and privacy policy
            </NavLink>
          </span>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
