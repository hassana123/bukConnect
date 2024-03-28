import React from "react";
import image from "../assets/image.png";
import plus from "../assets/plus.svg";
import Navbar from "../components/Navbar";
import { NavLink } from "react-router-dom";
import Footer from "../components/Footer";

const HeroSection = () => {
  return (
    <section className="mt-10 md:flex gap-5 w-[100%]">
      <div className="md:flex py-2 px-2 gap-3 h-auto text-black bg-[#0092DB]">
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
          className="inline-block md:w-[50%] my-10 md:my-0"
          src={image}
          alt=""
        />
      </div>
      <NavLink
        to="/post-service"
        className="bg-[#0092DB] md:w-1/3 inline-block md:my-20 my-5 py-10 px-4 mx-auto text-center rounded-lg"
      >
        <p>Got Services to offer?</p>
        <img className="mx-auto my-5" src={plus} alt="" />
        <p>Post Them Here</p>
      </NavLink>
    </section>
  );
};

const AboutSection = () => {
  return (
    <section className="my-10 w-[80%] mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-5">About Us</h2>
        <p className="text-lg">
          We are dedicated to facilitating connections between talented students
          and service providers within the campus community. Our platform aims
          to empower students to showcase their skills and talents while
          providing valuable services to fellow students and faculty members.
          Join us in building a vibrant community of collaboration and
          opportunity!
        </p>
      </div>
    </section>
  );
};

const ServicesSection = () => {
  return (
    <section className="my-10 w-[80%] mx-auto">
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-5">Our Services</h2>
        <p className="text-lg">
          Explore a wide range of services offered by talented students on our
          platform. From tutoring and academic assistance to creative services
          and technical expertise, there's something for everyone. Join our
          community and take advantage of these services to enhance your campus
          experience.
        </p>
      </div>
    </section>
  );
};

const LandingPage = () => {
  return (
    <main className="bg-[#100F0F] py-5">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <Footer />
    </main>
  );
};

export default LandingPage;
