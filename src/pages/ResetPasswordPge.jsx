// import React, { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom"; // Assuming you're using React Router for navigation
// import { auth } from "../../firebase";
// const ResetPasswordPage = () => {
//   //   const navigate = useNavigate();
//   //   const { token } = useParams();

//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [error, setError] = useState(null);

//   const handleResetPassword = async (e) => {
//     e.preventDefault();

//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       return;
//     }

//     // try {
//     //   await auth.confirmPasswordReset(token, password);
//     //   history.push("/login"); // Redirect to login page after password reset
//     // } catch (err) {
//     //   setError(err.message);
//     // }
//   };

//   return (
//     <div className="flex flex-col items-center mt-10">
//       <h1 className="text-3xl font-bold mb-4">Reset Password</h1>
//       <form className="w-1/3" onSubmit={handleResetPassword}>
//         <input
//           type="password"
//           placeholder="New Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="mb-4 p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
//           required
//         />
//         <input
//           type="password"
//           placeholder="Confirm New Password"
//           value={confirmPassword}
//           onChange={(e) => setConfirmPassword(e.target.value)}
//           className="mb-4 p-2 rounded border border-gray-300 focus:outline-none focus:border-blue-500"
//           required
//         />
//         {error && <p className="text-red-500">{error}</p>}
//         <button
//           type="submit"
//           className="bg-blue-500 text-white px-4 py-2 rounded"
//         >
//           Reset Password
//         </button>
//       </form>
//     </div>
//   );
// };

// export default ResetPasswordPage;
