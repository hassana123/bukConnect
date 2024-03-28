import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
//import ResetPasswordPage from "./pages/ResetPasswordPge";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import Dashboard from "./pages/Dashboard";
import PostServices from "./pages/PostServicePage";
import { NavLink } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Services from "./pages/Services";
import MyServices from "./pages/MyServices";
import FavouriteServices from "./pages/FavouriteServices";
import ServiceDetails from "./pages/ServiceDetails";
import ReportPage from "./pages/ReportPage";
import Allservices from "./pages/Allservices";
import AllUsers from "./pages/AllUser";
import AllReports from "./pages/AllReports";
import AdminLoginPage from "./pages/AdminLoginPage";
import AdminDashboard from "./pages/AdminDashboard";
//import admin from "firebase-admin";
import { getAuth } from "firebase/auth";
//import { customClaims } from "../firebaseAdmin";

function App() {
  const uId = "al2wRjL4geQnV97NZnY9kKP2gF82";
  // useEffect(() => {
  //   // Define the UID of the user you want to set as an admin
  //   const uid = uId;

  //   getAuth()
  //     .setCustomUserClaims(uid, { admin: true })
  //     .then(() => console.log("successful"))
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }, []);

  return (
    <main className="font-custom1 bg-[#100F0F]">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/password-reset" element={<ResetPasswordPage />} /> */}
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/services" element={<Services />} />
        <Route path="/my-services" element={<MyServices />} />
        <Route path="/favourites" element={<FavouriteServices />} />
        <Route path="/service/:id" element={<ServiceDetails />} />
        <Route path="/post-service" element={<PostServices />} />
        <Route path="/report-service/:id" element={<ReportPage />} />
        {/*** Admin interface*/}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/allServices" element={<Allservices />} />
        <Route path="/admin/allReports" element={<AllReports />} />
        <Route path="/admin/allUsers" element={<AllUsers />} />
      </Routes>
    </main>
  );
}

export default App;
