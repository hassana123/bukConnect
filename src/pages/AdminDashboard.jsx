import React from "react";
import requireAuthAdmin from "../components/requireAuthAdmin";
import AdminNav from "../components/AdminNav";
const AdminDashboard = () => {
  return (
    <>
      <AdminNav />
    </>
  );
};

export default requireAuthAdmin(AdminDashboard);
