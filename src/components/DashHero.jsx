import React from "react";
import image from "../assets/image.png";
import plus from "../assets/plus.svg";
import { NavLink } from "react-router-dom";
const DashHero = () => {
  return (
    <section className=" mt-10 md:flex gap-5 w-[100%]">
      <div className="md:flex py-2 px-2 gap-3  h-auto text-black  bg-[#0092DB]">
        <div className="inline-block mx-5">
          <h1 className="md:text-[38px] my-5 font-bold">
            Connecting Talented Students....
          </h1>
          <p className="text-[20px] mb-10">
            Discover, Explore within your campus ....
          </p>
          <NavLink
            className="bg-black text-white px-10 py-3 rounded-md"
            to="/services"
          >
            Explore
          </NavLink>
        </div>
        <img
          className="inline-block md:w-[50%] my-10 md:my-0 "
          src={image}
          alt=""
        />
      </div>
      <NavLink
        to="/post-service"
        className="bg-[#0092DB] md:w-1/3 inline-block md:my-20 my-5 py-10  px-4 mx-auto text-center rounded-lg "
      >
        <p>Got Services to render</p>
        <img className="mx-auto my-5 " src={plus} alt="" />
        <p>Post Here</p>
      </NavLink>
    </section>
  );
};

export default DashHero;
