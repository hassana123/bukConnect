import React from "react";
import logo from "../assets/logo.png";
import vector from "../assets/vector.svg";
import { NavLink } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="text-white  px-3  flex justify-between items-center py-5">
      <h1>
        BUK{" "}
        <span className="mx-2">
          C<img src={logo} alt="" className="inline w-[20%] mx-[-2px]" />
          NNECT
        </span>
      </h1>

      <div className="flex">
      <NavLink
          className=" text-white hover:text-[#0092DB] mx-5"
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className="bg-[#0092DB] hover:bg-white hover:text-black px-5 py-3 block rounded-md mx-5"
          to="/sign-up"
        >
          SignUp
        </NavLink>
        <NavLink
          className="bg-[#0092DB] hover:bg-white hover:text-black px-5 py-3 block rounded-md mx-5"
          to="/login"
        >
          Login
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
