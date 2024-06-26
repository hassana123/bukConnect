import React from "react";
import { NavLink } from "react-router-dom";
const AdminNav = () => {
  const admin = JSON.parse(localStorage.getItem("adminData"));
  console.log(admin);
  return (
    <div className="container mx-auto items-center flex justify-between mt-10">
      <h1 className="md:text-4xl font-bold ">Welcome {admin.name}</h1>
      <div className="flex items-center gap-4">
        <NavLink
          to="/admin/allUsers"
          className="bg-blue-500 text-white py-3 px-6 rounded-md text-xl font-semibold hover:bg-blue-600"
        >
          Manage Users
        </NavLink>
        <NavLink
          to="/admin/allServices"
          className="bg-blue-500 text-white py-3 px-6 rounded-md text-xl font-semibold hover:bg-blue-600"
        >
          Manage Services
        </NavLink>
        <NavLink
          to="/admin/allReports"
          className="bg-blue-500 text-white py-3 px-6 rounded-md text-xl font-semibold hover:bg-blue-600"
        >
          Manage Reports
        </NavLink>
      </div>
    </div>
  );
};

export default AdminNav;
