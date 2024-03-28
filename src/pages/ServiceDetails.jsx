import React, { useState, useEffect } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";
import { FaPhone } from "react-icons/fa";
import requireAuth from "../components/requireAuth";
import { db } from "../../firebase";
import DashNav from "../components/DashNav";
import { getDoc, doc } from "firebase/firestore";
import vector from "../assets/vector.svg";
import { BsArrowLeft } from "react-icons/bs";
import Footer from "../components/Footer";
const ServiceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [service, setService] = useState([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(false);
  const [errmsg, setErrMsg] = useState("");
  console.log(id);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const serviceDoc = doc(db, "services", id);
        const serviceSnapshot = await getDoc(serviceDoc);
        if (serviceSnapshot.exists()) {
          setService({ id: serviceSnapshot.id, ...serviceSnapshot.data() });
          setLoading(false);
          console.log(serviceSnapshot.data());
        } else {
          console.error("Service not found");
          setLoading(false);
          setErr(true);
          setErrMsg("Service Not Found: \n Please try again");
        }
      } catch (error) {
        console.error("Error fetching service:", error);
        setLoading(false);
        setErr(true);
        setErrMsg(
          "Error fetching service: \n make sure you are connected too the internet"
        );
      }
    };
    fetchService();
  }, [id]);
  console.log(service);
  const handleCall = () => {
    // Implement call functionality
    window.location.href = `tel:${service.servicePhone}`;
  };
  const handleWhatsApp = () => {
    const countryCode = "+234";
    const phoneNumberWithoutZero = service.contactPhoneNumber.substring(1); // Remove leading zero
    //const fullPhoneNumber = countryCode + phoneNumberWithoutZero;

    const message = encodeURIComponent(
      "Hi, I saw your service listing and I'm interested. Can we discuss further?"
    );
    window.location.href = `https://wa.me/${phoneNumberWithoutZero}?text=${message}`;
  };

  const handleSMS = () => {
    const message = encodeURIComponent(
      "Hi, I saw your service listing and I'm interested. Can we discuss further?"
    );
    window.location.href = `sms:${service.servicePhone}?body=${message}`;
  };

  if (loading) {
    return <p className="font-bold text-[35px] mx-5 my-8">Loading...</p>;
  }

  return (
    <>
      <DashNav />
      <BsArrowLeft
        className="cursor-pointer text-[35px] font-bold mx-5"
        onClick={() => navigate("/services")}
      />
      {err ? (
        <p className="font-bold text-[35px] mx-5 my-8">{errmsg}</p>
      ) : (
        <div className="my-10">
          <h1 className="text-[48px] font-bold mx-3">{service.serviceTitle}</h1>
          <div className="md:w-[95%] w-[98%] mx-auto my-10">
            <div className="bg-[#100F0F] py-5 px-2 border-[2px]">
              <div className="grid md:grid-cols-2  items-center mb-8">
                <img
                  className="rounded-sm w-[90%]"
                  src={service.serviceImage}
                  alt="service"
                />
                <div>
                  <h2 className="text-[25px] font-bold ">
                    {service.serviceTitle}
                  </h2>
                  <p className="mt-3">{service.serviceDescription}</p>
                  <p className="my-3">{service.additionalInfo}</p>
                  <p className="my-3">{service.contactDetails}</p>
                  <hr />
                  <div className="grid grid-cols-2 my-5 items-center gap-5">
                    <div className="flex gap-1 items-center">
                      <img className="rounded-[50%]" src={vector} alt="" />
                      <div>
                        <h1 className="text-[16px]">
                          {service.postedBy.firstName}{" "}
                          {service.postedBy.lastName}
                        </h1>
                        <p className="text-[10px] my-2 bg-[#D9D9D9] p-2 rounded-xl font-bold text-black">
                          Typically replies within a day
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={handleCall}
                      className="bg-[#1976D2] w-[60%]  mx-auto py-3 rounded-lg mt-5"
                    >
                      Contact <FaPhone className="inline mx-2" />
                    </button>
                  </div>
                  <hr />
                  <ul className="list-disc my-8 text-[12px]">
                    <li> Remember, don't send any pre-payments </li>
                    <li>
                      Meet the sevice provider at a safe public place i.e inside
                      the school premises
                    </li>
                    <li>
                      If theres any uncertainty, do not hesitate to report
                      below.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <button
                    className="bg-blue-500 rounded-md py-3 px-6 text-white mr-4"
                    onClick={handleCall}
                  >
                    Call <FaPhone className="inline mx-1" />
                  </button>
                  <button
                    className="bg-green-500 py-3 px-6 text-white mr-4 rounded-md"
                    onClick={handleWhatsApp}
                  >
                    WhatsApp
                  </button>
                  <button
                    className="bg-yellow-500 py-3 px-6 text-white rounded-md"
                    onClick={handleSMS}
                  >
                    SMS
                  </button>
                </div>
                <NavLink
                  className="bg-[#D20B0B] rounded-md py-3 px-10 text-white"
                  to={`/report-service/${id}`}
                >
                  Report
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default requireAuth(ServiceDetails);
