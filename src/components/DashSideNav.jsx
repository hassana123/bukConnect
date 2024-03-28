import React, { useState } from "react";
import icon1 from "../assets/icon1.svg";
import icon2 from "../assets/icon2.svg";
import icon3 from "../assets/icon3.svg";
import icon4 from "../assets/icon4.svg";
import icon5 from "../assets/icon5.svg";
import arrow from "../assets/arrow.svg";

import { NavLink } from "react-router-dom";
const DashSideNav = () => {
  const [showNav, setShowNav] = useState(false);
  return (
    <>
      <nav className="hidden md:block mt-10 text-white w-[20%] ">
        <h1 className="font-bold text-[25px]  my-5">Explore</h1>
        <ul className="mb-20">
          <li className="  grid grid-cols-2 my-5 items-center gap-5">
            <div className="flex gap-3 items-center">
              <img className="" src={icon1} alt="" />
              <NavLink to="/services">Services</NavLink>
            </div>
            <img className="mx-auto hidden lg:block" src={arrow} alt="" />
          </li>
          <li className="grid grid-cols-2 my-5 items-center gap-5">
            <div className="flex gap-3 items-center">
              <img className=" h-[5vh]" src={icon2} alt="" />
              <NavLink to="/favourites">Favourites</NavLink>
            </div>
            <img className="mx-auto hidden lg:block" src={arrow} alt="" />
          </li>
          <li className="grid grid-cols-2 my-5 items-center gap-5">
            <div className="flex gap-3 items-center">
              <img className=" h-[5vh]" src={icon1} alt="" />
              <NavLink to="/my-services">My services</NavLink>
            </div>
            <img className="mx-auto hidden lg:block" src={arrow} alt="" />
          </li>
        </ul>
        <hr className="w-[50%]" />
        <ul>
          <li className="flex gap-3 my-5">
            <img src={icon3} alt="" />
            <NavLink to="">Faqs</NavLink>
          </li>
          <li className="flex gap-3 my-5">
            <img src={icon5} alt="" />
            <NavLink to="">Help</NavLink>
          </li>
          <li className="flex gap-3 my-5">
            <img src={icon4} alt="" />
            <NavLink to="">Support</NavLink>
          </li>
        </ul>
      </nav>
      {/* * mobile screen*/}
      <img
        onClick={() => setShowNav(true)}
        className="cursor-pointer mx-5 md:hidden"
        src={arrow}
        alt=""
      />
      {showNav ? (
        <nav className="md:hidden block absolute px-5 h-screen top-20 bg-white text-black mt-10  w-[85%] ">
          <p
            className="cursor-pointer md:hidden float-right"
            onClick={() => setShowNav(false)}
          >
            close side Nav
          </p>
          <h1 className="font-bold text-[25px]  my-5">Explore</h1>
          <ul className="mb-20">
            <li className="  grid grid-cols-2 my-5 items-center">
              <div className="flex gap-3 items-center">
                {/* <img className="" src={icon1} alt="" /> */}
                <NavLink to="/services">Services</NavLink>
              </div>
              {/* <img className="mx-auto" src={arrow} alt="" /> */}
            </li>
            <li className="grid grid-cols-2 my-5 items-center">
              <div className="flex gap-3 items-center">
                {/* <img className="  h-[5vh]" src={icon2} alt="" /> */}
                <NavLink to="/favourites">Favourites</NavLink>
              </div>
              {/* <img className="mx-auto" src={arrow} alt="" /> */}
            </li>
            <li className="grid grid-cols-2 my-5 items-center">
              <div className="flex gap-3 items-center">
                {/* <img className=" h-[5vh]" src={icon2} alt="" /> */}
                <NavLink to="/my-services">My services</NavLink>
              </div>
              {/* <img className="mx-auto" src={arrow} alt="" /> */}
            </li>
          </ul>
          <hr className="w-[50%]" />
          <input
            type="text"
            className="bg-white  md:w-full h-[6vh] p-3   border-[2px] rounded-lg py-1"
            placeholder="search"
          />
          <ul>
            <li className="flex gap-3 my-5">
              {/* <img src={icon3} alt="" /> */}
              <NavLink to="">Faqs</NavLink>
            </li>
            <li className="flex gap-3 my-5">
              {/* <img src={icon5} alt="" /> */}
              <NavLink to="">Help</NavLink>
            </li>
            <li className="flex gap-3 my-5">
              {/* <img src={icon4} alt="" /> */}
              <NavLink to="">Support</NavLink>
            </li>
          </ul>
        </nav>
      ) : (
        ""
      )}
    </>
  );
};

export default DashSideNav;
