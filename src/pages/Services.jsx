import React, { useState, useEffect } from "react";
import DashNav from "../components/DashNav";
import DashSideNav from "../components/DashSideNav";
import DashHero from "../components/DashHero";
import AllServices from "../components/AllServices";
import requireAuth from "../components/requireAuth";
import { db } from "../../firebase";
import { BsArrowLeft } from "react-icons/bs";
import { collection, doc, getDocs, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  console.log(currentUser);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const servicesRef = collection(db, "services");
        const querySnapshot = await getDocs(servicesRef);
        const servicesData = [];

        // Iterate over each service
        for (const docu of querySnapshot.docs) {
          const serviceData = {
            id: docu.id,
            ...docu.data(),
          };

          // Check if the service is favorited by the current user
          const userFavoritesRef = doc(
            db,
            "users",
            currentUser,
            "favorites",
            docu.id
          );
          const favoriteDoc = await getDoc(userFavoritesRef);
          serviceData.isFave = favoriteDoc.exists();

          servicesData.push(serviceData);
        }

        setServices(servicesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching services:", error);
        setLoading(false);
      }
    };
    fetchServices();
  }, [services]);
  return (
    <main className="bg-[#100F0F] py-5 px-1 ">
      <DashNav />
      <BsArrowLeft
        className="cursor-pointer text-[35px] font-bold mx-5"
        onClick={() => navigate("/dashboard")}
      />
      <AllServices services={services} loading={loading} />
    </main>
  );
};

export default requireAuth(Services);
