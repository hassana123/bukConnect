import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { BsBookmarkFill, BsArrowLeft } from "react-icons/bs";
import DashNav from "../components/DashNav";
import { collection, getDocs, doc } from "firebase/firestore";
import { NavLink, useNavigate } from "react-router-dom";
import requireAuth from "../components/requireAuth";

const FavouriteServices = () => {
  const [favoriteServices, setFavoriteServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [errmsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  useEffect(() => {
    const fetchFavoriteServices = async () => {
      try {
        const favoritesRef = collection(db, "users", currentUser, "favorites");
        const querySnapshot = await getDocs(favoritesRef);
        const favoriteServicesData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setFavoriteServices(favoriteServicesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching favorite services:", error);
        setLoading(false);
        setErr(true);
        setErrMsg(
          "Error fetching service: \n \n make sure you are connected too the internet"
        );
      }
    };
    fetchFavoriteServices();
  }, []);

  if (loading) {
    return <p className="text-[35px] font-bold m-8">Loading...</p>;
  }

  return (
    <>
      <DashNav />
      <BsArrowLeft
        className="cursor-pointer text-[35px] font-bold mx-5"
        onClick={() => navigate("/dashboard")}
      />
      {err ? (
        <p className="font-bold text-[25px] mx-5 my-8">{errmsg}</p>
      ) : (
        <div className="my-10">
          <h1 className="text-[48px] font-bold mx-3">Favorite Services</h1>
          {favoriteServices.length === 0 ? (
            <p className="font-bold text-[25px] mx-5 my-8">
              {errmsg}
              <br /> No services Found
            </p>
          ) : (
            <ul className="md:w-[95%] w-[98%] mx-auto my-10 grid lg:grid-cols-4 gap-4 md:grid-cols-3">
              {favoriteServices.map((service) => (
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
                    <BsBookmarkFill className="mx-auto " />
                  </div>
                  <hr />
                  <h2 className="text-[25px] font-bold my-10">
                    {service.serviceTitle}
                  </h2>
                  <p className="my-10">{service.serviceDescription}</p>
                  <NavLink className="float-right bg-blue-500 py-3 px-10">
                    Contact Us
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default requireAuth(FavouriteServices);
