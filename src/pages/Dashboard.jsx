import React, { useState, useEffect } from "react";
import DashNav from "../components/DashNav";
import Footer from "../components/Footer";
import DashSideNav from "../components/DashSideNav";
import DashHero from "../components/DashHero";
import { db } from "../../firebase";
import AllServices from "../components/AllServices";
import requireAuth from "../components/requireAuth";
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
const Dashboard = () => {
  const [services, setServices] = useState([]);

  const [loading, setLoading] = useState(true);
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
          //console.log(serviceData);
        }
        const filteredServices = servicesData.filter(
          (service) => service.favoritesCount > 0
        );
        setServices(filteredServices);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching services:", error);
        setLoading(false);
      }
    };
    fetchServices();
  }, [services]);
  
  return (
    <main className="bg-[#100F0F] py-5 ">
      <DashNav  />
      <section className="md:flex">
        <DashSideNav />
        <DashHero />
      </section>
      <AllServices services={services} loading={loading} />
      {/* <Footer /> */}
    </main>
  );
};

export default requireAuth(Dashboard);
