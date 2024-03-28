import React, { useState, useEffect } from "react";
import { db, auth } from "../../firebase"; // Assuming you have imported Firebase firestore and authentication
import {
  collection,
  where,
  query,
  orderBy,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { NavLink, useNavigate } from "react-router-dom";
import requireAuth from "../components/requireAuth";
import DashNav from "../components/DashNav";
import { BsArrowLeft } from "react-icons/bs";

const MyServices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [errmsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        console.log(currentUser);
        const servicesRef = collection(db, "services");
        const q = query(
          servicesRef,
          where("posterid", "==", currentUser),
          orderBy("timePosted", "desc")
        );
        const snapShot = await getDocs(q);
        const servicesData = snapShot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setServices(servicesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching services:", error);
        setLoading(false);
        setErr(true);
        setErrMsg(
          "Error fetching service: \n \n make sure you are connected too the internet"
        );
      }
    };

    fetchServices();
  }, []);
  const handleDeleteService = async (serviceId) => {
    try {
      const serviceRef = collection(db, "services");
      // Delete user document from Firestore
      await deleteDoc(doc(serviceRef, serviceId));

      // Remove the deleted user from the state
      setServices(services.filter((service) => service.id !== serviceId));
      console.log("service deleted successfully!");
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };
  if (loading) {
    return <p className="text-[35px] font-bold m-8"> Loading...</p>;
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
          <h1 className="mx-4 text-[35px] font-bold">My Services</h1>
          {services.length === 0 ? (
            <p className="font-bold text-[25px] mx-5 my-8">
              You haven't posted any services yet.
            </p>
          ) : (
            <ul className="md:w-[90%] w-[98%] mx-auto my-10 grid lg:grid-cols-4 gap-4 md:grid-cols-3">
              {services.map((service) => (
                <li
                  className="bg-[#100F0F] py-5 px-2 border-[2px]"
                  key={service.id}
                >
                  <div className="flex gap-5 items-center mb-8">
                    <img
                      className="rounded-[50%] w-[50px]"
                      src={service.serviceImage}
                      alt="service"
                    />
                    <h1>{service.postedBy.firstName}</h1>
                  </div>
                  <hr />
                  <h2 className="text-[25px] font-bold my-10">
                    {service.serviceTitle}
                  </h2>
                  <p className="my-10">{service.serviceDescription}</p>
                  <button
                    onClick={() => {
                      handleDeleteService(service.id);
                    }}
                    className="bg-red-600 hover:bg-red-800 float-right rounded-lg py-3 my-5 px-5"
                  >
                    Delete service
                  </button>
                  {/* <NavLink className="float-right  bg-blue-500 py-3 px-10">
                    Edit Services
                  </NavLink> */}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </>
  );
};

export default requireAuth(MyServices);
