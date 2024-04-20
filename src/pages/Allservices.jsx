import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import requireAuthAdmin from "../components/requireAuthAdmin";
import AdminNav from "../components/AdminNav";
const Allservices = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all users from Firestore
    const fetchServices = async () => {
      try {
        const serviceSnapshot = collection(db, "services");
        const queryServiceData = await getDocs(serviceSnapshot);
        const serviceData = queryServiceData.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setServices(serviceData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
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

  return (
    <>
      <AdminNav />
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="container mx-auto mt-10">
          <h2 className="text-2xl font-bold mb-4">All Services</h2>
          {/* Display list of services */}
          <ul>
            {services.map((service) => (
              <li key={service.id} className="py-3 border-b border-gray-300">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{service.serviceTitle}</p>
                    <p>{service.service}</p>
                    <p>{service.serviceDescription}</p>
                    <p className="text-gray-500">
                      Time Posted:{" "}
                      {service.timePosted.toDate().toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteService(service.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none"
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default requireAuthAdmin(Allservices);
