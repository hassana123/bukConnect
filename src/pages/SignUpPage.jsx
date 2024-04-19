import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { auth, db } from "../../firebase";
import { sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import departments from "../components/Department";
import Navbar from "../components/Navbar";
const SignUpPage = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [regNo, setRegNo] = useState("");
  const [department, setDepartment] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const validateEmail = (input) => {
    // Basic email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
  };
  const validateRegNo = (input) => {
    // Regex pattern for Buk registration number format
    const regNoRegex = /^[A-Z]{3}\/\d{2}\/[A-Z]{3}\/\d{5}$/;
    return regNoRegex.test(input);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(null);
    }, 180000); // 3 minutes
    return () => clearTimeout(timer);
  }, [error]);

  const handleSignUp = async (e) => {
    e.preventDefault();


    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim() ||
      !regNo.trim() ||
      !department.trim()
    ) {
      setError("All fields are required");
      return;
    }

    if (!validateEmail(email)) {
      setError("Invalid email address");
      return;
    }

    if (!validateRegNo(regNo)) {
      setError("Invalid registration number format");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userDetails = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        regNo: regNo,
        department: department,
      };

      await setDoc(doc(db, "users", userCredential.user.uid), userDetails);

      console.log("User signed up successfully:", userCredential.user);

      // Send email verification
      await sendEmailVerification(userCredential.user);
      console.log("User signed up successfully:", userCredential.user);
      alert("Check You Mail for verification you can only log in after verification");
      window.location.href = "https://mail.google.com";
      //navigate("/dashboard");
    } catch (err) {
      console.log(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar/>
    <section className="py-10 w-[100%] flex items-center bg-[#100F0F]">
      <div className="md:w-[40%] w-[98%] text-black mx-auto  bg-white rounded-lg py-10 px-3">
        <h1 className="text-3xl font-bold mb-2">SignUp</h1>
        <p className="mb-3 text-[#5F5D5D] text-[24px]">
          Create a buk-connect account
        </p>
        <form className="text-center text-[20px]" onSubmit={handleSignUp}>
          <label htmlFor="" className="text-left font-bold block">
            First Name
          </label>
          <input
            type="text"
            placeholder="Hassana "
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="mb-2 p-2 block rounded-md w-[90%] border-[2px] border-gray-300 bg-transparent focus:outline-none focus:border-blue-500"
            required
          />
          <label htmlFor="" className="text-left font-bold block">
            Last Name
          </label>
          <input
            type="text"
            placeholder="Abdullahi"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="mb-2 p-2 block rounded-md border-[2px]  w-[90%] border-gray-300 bg-transparent focus:outline-none focus:border-blue-500"
            required
          />
          <label htmlFor="" className="text-left  font-bold block">
            Email
          </label>
          <input
            type="email"
            placeholder="hassanaabdll@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-2 p-2 rounded-md block border-[2px]  w-[90%] border-gray-300 bg-transparent focus:outline-none focus:border-blue-500"
            required
          />
           <label htmlFor="" className="text-left font-bold block">
            Registration Number
          </label>
          <input
            type="text"
            placeholder="e.g. CST/18/COM/00008"
            value={regNo}
            onChange={(e) => setRegNo(e.target.value)}
            className="mb-2 p-2 block rounded-md border-[2px]  w-[90%] border-gray-300 bg-transparent focus:outline-none focus:border-blue-500"
            required
          />
          <label htmlFor="" className="text-left font-bold block">
            Department
          </label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="mb-2 p-2 block rounded-md border-[2px]  w-[90%] border-gray-300 bg-transparent focus:outline-none focus:border-blue-500"
            required
          >
            <option value="">Select Department</option>
            {departments.map((department, index) => (
              <option key={index} value={department}>
                {department}
              </option>
            ))}
          </select>
          <label htmlFor="" className="text-left font-bold block">
            Password
          </label>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-2 p-2 rounded-md block border-[2px]  w-[90%] border-gray-300 bg-transparent focus:outline-none focus:border-blue-500"
            required
          />
          <label htmlFor="" className="text-left font-bold block">
            Confirm Password
          </label>
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mb-2 p-2 rounded-md block border-[2px]  w-[90%] border-gray-300 bg-transparent focus:outline-none focus:border-blue-500"
            required
          />
          {error && <p className="text-red-500">{error}</p>}

          <button
            type="submit"
            className="bg-[#0092DB] font-bold text-white mt-5 mb-6 px-20 py-3 rounded-md"
            disabled={loading}
          >
            {loading ? "Registering user..." : "Sign Up"}
          </button>
        </form>
        <div className="text-center">
          <p className="mb-2">
            <span className="font-bold"> Have an account?</span>
            <NavLink className="text-[#1F45CC] underline mx-2 " to="/login">
              Login
            </NavLink>
          </p>
          <span className="text-[#5F5D5D]">
            By signing up you agree to our
            <NavLink className="mx-2  underline" to="terms">
              Terms and conditions and privacy policy
            </NavLink>
          </span>
        </div>
      </div>
    </section>

    </>  );
};

export default SignUpPage;
