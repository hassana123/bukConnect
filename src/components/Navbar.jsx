import React, { useState } from "react";
import logo from "../assets/logo.png";
import vector from "../assets/vector.svg";
import { NavLink } from "react-router-dom";
import { IoEllipsisVertical } from "react-icons/io5";
const Navbar = () => {
  const [show, setShow] = useState("");
  return (
    <nav className="text-white    flex justify-between items-center py-5">
      <h1 className="text-[12px] md:text-[18px]">
        BUK{" "}
        <span className="md:mx-2 mx-1">
          C
          <img
            src={logo}
            alt=""
            className="inline  md:w-[20%] w-[30%] md:mx-[-2px]  mx-[-8px]"
          />
          NNECT
        </span>
      </h1>

      <div className="md:flex items-center hidden ">
        <NavLink className=" text-white hover:text-[#0092DB] mx-5" to="/">
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
      <IoEllipsisVertical
        onClick={() => setShow(!show)}
        size={30}
        color="#fff"
        className="text-white hover:text-blue-700  md:hidden"
      />
      {show ? (
        <div className="absolute md:hidden flex   flex-col items-center  px-8  right-5 text-black py-10  space-y-3 bg-white top-[7%]">
          <NavLink className="  hover:text-[#0092DB] mx-5" to="/">
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
      ) : (
        ""
      )}
    </nav>
  );
};

export default Navbar;
