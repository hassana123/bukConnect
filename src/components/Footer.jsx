import React from "react";
import logo from "../assets/logo.png";
import { NavLink } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="grid text-center  py-3  md:grid-cols-4 items-center border-t-[3px]  mx-auto">
      <h1 className="">
        BUK{" "}
        <span className="mx-2">
          C<img src={logo} alt="" className="inline w-[20%] mx-[-10px]" />
          NNECT
        </span>
      </h1>

      <div className="mx-auto">
        <p>Visit</p>
        <span>3011, Bayero University, Kano PMB, Kano</span>
      </div>
      <div className="mx-auto">
        <p>Follow</p>
        <div className="md:flex">
          <a className="mx-5 block" href="#">
            IG
          </a>
          <a className="mx-5 block" href="#">
            LinkedIn
          </a>
          <a className="mx-5 block" href="#">
            X
          </a>
        </div>
      </div>
      <p className="mx-auto">All rights reserved 2024</p>
    </footer>
  );
};

export default Footer;
