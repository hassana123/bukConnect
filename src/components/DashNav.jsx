import React, { useState } from "react";
import logo from "../assets/logo.png";
import vector from "../assets/vector.svg";
import { NavLink } from "react-router-dom";
const DashNav = ({ handleSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
    e.preventDefault();
    handleSearch(searchQuery);
  };
  return (
    <nav className="text-white md:w-[90%]  w-[97%] mx-auto flex justify-between items-center">
      <h1 className="">
        BUK{" "}
        <span className="mx-2">
          C<img src={logo} alt="" className="inline w-[20%] mx-[-2px]" />
          NNECT
        </span>
      </h1>
      <NavLink to="/edit-profile">
        <img className="" src={vector} alt="" />
      </NavLink>
    </nav>
  );
};

export default DashNav;
