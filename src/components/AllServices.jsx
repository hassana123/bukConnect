import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { BsBookmarkFill, BsBookmark } from "react-icons/bs";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { NavLink } from "react-router-dom";

const AllServices = ({ services, loading }) => {
  const [searchQuery, setSearchquery] = useState("");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  // console.log(currentUser);
  // console.log(services);
  const handleSearch = (e) => {
    setSearchquery(e.target.value);
  };
  const filteredService = services.filter((service) =>
    service.serviceTitle.toLowerCase().includes(searchQuery.toLocaleLowerCase())
  );
  //console.log(filteredService);
  const toggleFavorite = async (serviceId, isFavorite, service) => {
    try {
      const serviceRef = doc(db, "services", serviceId);
      const userFavoritesRef = collection(
        db,
        "users",
        currentUser,
        "favorites"
      );

      if (isFavorite) {
        await updateDoc(serviceRef, {
          favoritesCount: service.favoritesCount - 1,
        });
        await deleteDoc(doc(userFavoritesRef, serviceId));
        console.log("deleted");
      } else {
        await updateDoc(serviceRef, {
          favoritesCount: service.favoritesCount + 1,
        });

        await setDoc(doc(userFavoritesRef, serviceId), {
          ...services.find((service) => service.id === serviceId),
          favoritesCount: service.favoritesCount + 1,
          isFave: true,
          timestamp: serverTimestamp(),
        });
        console.log("done");
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };
  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="my-10">
      <div className=" md:flex justify-between items-center">
        <h1 className="text-[48px] font-bold mx-3"> All Services</h1>
        <input
          className="w-[40%] mx-5 text-[18px] bg-white text-black md:float-left float-right md:mb-0 mb-10 rounded-md py-4 px-3  "
          type="text "
          placeholder="search..."
          value={searchQuery}
          onChange={handleSearch}
        />
      </div>
      {filteredService.length === 0 ? (
        <p className="text-[25px] mx-5 foont-bold">No Service Found</p>
      ) : (
        <ul className="md:w-[95%] w-[98%] mx-auto my-10 grid lg:grid-cols-4 gap-4 md:grid-cols-3">
          {filteredService.map((service) => (
            <li
              className="bg-[#100F0F] py-5 px-2 border-[2px]"
              key={service.id}
            >
              <div className="grid grid-cols-2 gap-10 items-center mb-8">
                <div className="flex gap-5 items-center">
                  <img
                    className="rounded-[50%] w-[50px]"
                    src={service.serviceImage}
                    alt="service"
                  />
                  <h1>{service.postedBy.firstName}</h1>
                </div>
                {service.isFave ? (
                  <BsBookmarkFill
                    className="mx-auto cursor-pointer"
                    onClick={() => toggleFavorite(service.id, true, service)}
                  />
                ) : (
                  <BsBookmark
                    className="mx-auto cursor-pointer"
                    onClick={() => toggleFavorite(service.id, false, service)}
                  />
                )}
              </div>
              <hr />

              <h2 className="text-[25px] font-bold my-10">
                {service.serviceTitle}
              </h2>
              <p className="my-10">{service.serviceDescription}</p>
              <NavLink
                to={`/service/${service.id}`}
                className="float-right bg-white text-black py-3 hover:bg-blue-800 hover:text-white rounded-lg px-10"
              >
                Contact Us
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AllServices;
