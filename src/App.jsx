import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
//import ResetPasswordPage from "./pages/ResetPasswordPge";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import Dashboard from "./pages/Dashboard";
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
import PostServicePage from "./pages/PostServicePage";
import EditProfile from "./pages/EditProfile";
function App() {
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
        <Route path="/post-service" element={<PostServicePage />} />
        <Route path="/report-service/:id" element={<ReportPage />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        {/*** Admin interface*/}
        <Route path="/admin/" element={<AdminDashboard />} />
        <Route path="/admin/login" element={<AdminLoginPage />} />
        <Route path="/admin/allServices" element={<Allservices />} />
        <Route path="/admin/allReports" element={<AllReports />} />
        <Route path="/admin/allUsers" element={<AllUsers />} />
      </Routes>
    </main>
  );
}

export default App;
