import React, { useEffect, useState } from "react";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import requireAuthAdmin from "../components/requireAuthAdmin";
const AllReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all reports from Firestore
    const fetchReports = async () => {
      try {
        const reportsSnapshot = collection(db, "reports");
        const queryReportData = await getDocs(reportsSnapshot);
        const reportsData = queryReportData.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setReports(reportsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reports:", error);
        setLoading(false);
      }
    };

    fetchReports();
  }, []);
  console.log(reports);
  const handleDeleteReport = async (reportId) => {
    try {
      const reportRef = collection(db, "reports");
      // Delete user document from Firestore
      await deleteDoc(doc(reportRef, reportId));

      // Remove the deleted user from the state
      setReports(reports.filter((report) => report.id !== reportId));
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
      <div className="my-10">
        <div className="md:flex justify-between items-center"></div>
        {reports.length == 0 ? (
          <p className="mx-10  text-[25px] font-bold">No Reports Made</p>
        ) : (
          <ul className="md:w-95% w-98% mx-auto my-10 grid lg:grid-cols-4 gap-4 md:grid-cols-3">
            {reports.map((report) => (
              <li
                className="bg-black py-5 px-2 border-2 border-gray-600"
                key={report.id}
              >
                <p className="text-white">Service Name: {report.serviceName}</p>
                <p className="text-white">
                  Service Provider Name: {report.serviceProviderName}
                </p>
                <p className="text-white">
                  Service Provider Phone: {report.serviceProviderPhone}
                </p>
                <p className="text-white">
                  Report Description: {report.reportDescription}
                </p>
                <p className="text-white">Reported By: {report.reportedBy}</p>
                <p className="text-white">
                  Timestamp: {report.timestamp.toDate().toLocaleString()}
                </p>
                {/* Optionally add a button to delete the report */}
                <button
                  onClick={() => {
                    handleDeleteReport(report.id);
                  }}
                  className="bg-red-600 hover:bg-red-800 float-right rounded-lg py-3 my-5 px-5"
                >
                  Delete Report
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default requireAuthAdmin(AllReports);
