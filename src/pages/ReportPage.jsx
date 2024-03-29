import React, { useState } from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { BsArrowLeft } from "react-icons/bs";

const ReportPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser")) || JSON.parse(sessionStorage.getItem("currentUser"));
  const user = JSON.parse(localStorage.getItem("userData")) || JSON.parse(sessionStorage.getItem("userData"));
  const [reportSent, setReportSent] = useState(false);
  const [reportDetails, setReportDetails] = useState({
    serviceName: "",
    serviceProviderName: "",
    serviceProviderPhone: "",
    reportDescription: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "reports"), {
        serviceId: id,
        serviceName: reportDetails.serviceName,
        serviceProviderName: reportDetails.serviceProviderName,
        serviceProviderPhone: reportDetails.serviceProviderPhone,
        reportDescription: reportDetails.reportDescription,
        reportedById: currentUser,
        reportedBy: user.firstName + user.lastName,
        timestamp: new Date(),
      });

      setReportSent(true);
      //navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting report:", error);
    }
  };

  return (
    <main className="">
      <BsArrowLeft
        onClick={() => window.history.back()}
        className="cursor-pointer text-[35px] my-5 font-bold mx-5"
      />
      {!reportSent ? (
        <div className="container w-[95%] mx-auto my-10">
          <h2 className="text-2xl font-semibold mb-4">
            Report Service Provider
          </h2>
          <form onSubmit={handleSubmit} className="md:w-[50%]   w-[95%]">
            <div className="my-3">
              <label htmlFor="serviceName" className="block my-1 font-medium">
                Service Name
              </label>
              <input
                type="text"
                id="serviceName"
                value={reportDetails.serviceName}
                onChange={(e) =>
                  setReportDetails({
                    ...reportDetails,
                    serviceName: e.target.value,
                  })
                }
                placeholder="enter name of the service"
                className="w-full text-black px-4 py-2 border bg-white  w-[80%]  rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="my-3">
              <label
                htmlFor="serviceProviderName"
                className="block my-1 font-medium"
              >
                Service Provider Name
              </label>
              <input
                type="text"
                id="serviceProviderName"
                value={reportDetails.serviceProviderName}
                onChange={(e) =>
                  setReportDetails({
                    ...reportDetails,
                    serviceProviderName: e.target.value,
                  })
                }
                placeholder="enter  the name of the Service Provider"
                className="w-full text-black px-4 py-2 border bg-white  w-[80%]  rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="my-3">
              <label
                htmlFor="serviceProviderPhone"
                className="block my-1 font-medium"
              >
                Service Provider Phone
              </label>
              <input
                type="tel"
                id="serviceProviderPhone"
                value={reportDetails.serviceProviderPhone}
                onChange={(e) =>
                  setReportDetails({
                    ...reportDetails,
                    serviceProviderPhone: e.target.value,
                  })
                }
                placeholder="enter service provider's phone number"
                className="w-full text-black px-4 py-2 border bg-white  w-[80%] rounded-md focus:outline-none focus:border-blue-500"
                required
              />
            </div>
            <div className="my-3">
              <label
                htmlFor="reportDescription"
                className="block my-1  font-medium"
              >
                Report Description
              </label>
              <textarea
                id="reportDescription"
                value={reportDetails.reportDescription}
                onChange={(e) =>
                  setReportDetails({
                    ...reportDetails,
                    reportDescription: e.target.value,
                  })
                }
                placeholder="state the issue you waant to report"
                className="w-full text-black px-4 py-2 bg-white border rounded-md focus:outline-none focus:border-blue-500"
                rows="4"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Submit Report
            </button>
          </form>
        </div>
      ) : (
        <div className="container mx-auto py-10 text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Report Sent Successfully!
          </h2>
          <p className="text-lg">Thank you for reporting.</p>
          <NavLink
            to="/dashboard"
            className="text-blue-500 font-semibold hover:underline mt-4 inline-block"
          >
            Go back to Dashboard
          </NavLink>
        </div>
      )}
    </main>
  );
};

export default ReportPage;
