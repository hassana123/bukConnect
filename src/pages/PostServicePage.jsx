import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import requireAuth from "../components/requireAuth";
import { db, auth, storage } from "../../firebase"; // Assuming you have imported Firebase storage
import {
  collection,
  setDoc,
  doc,
  addDoc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const PostServicePage = () => {
  const navigate = useNavigate();

  const [serviceTitle, setServiceTitle] = useState("");
  const [serviceImage, setServiceImage] = useState(null);
  const [serviceDescription, setServiceDescription] = useState("");
  const [contactDetails, setContactDetails] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [phone, SetPhone] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState([]);
  const currentUser = auth.currentUser;
  useEffect(() => {
    const fetchUser = async () => {
      const userDoc = doc(db, "users", currentUser.uid);
      const user = await getDoc(userDoc);

      if (user.exists()) {
        console.log(user.data());
        setUser(user.data());
      }
    };
    fetchUser();
  }, [currentUser]);
  console.log(user);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setServiceImage(file);

    // Display uploaded image
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handlePostService = async (e) => {
    e.preventDefault();

    if (!serviceTitle.trim() || !serviceDescription.trim()) {
      setError("Service title and description are required");
      setTimeout(() => setError(null), 5000); // Clear error message after 5 seconds
      return;
    }
 const phoneRegex = /^0[7-9][0-1]\d{8}$/; // Nigerian phone number regex pattern
 if (!phoneRegex.test(phone)) {
   setError("Please enter a valid Nigerian phone number");
   setTimeout(() => setError(null), 5000); // Clear error message after 5 seconds
   return;
 }
    setLoading(true);

    try {
      // Upload image to Firebase Storage
      let imageUrl = "";
      if (serviceImage) {
        const storageRef = ref(storage, `serviceImages/${serviceImage.name}`);
        await uploadBytes(storageRef, serviceImage);
        imageUrl = await getDownloadURL(storageRef);
      }

      // Add service data to Firestore
      const currentUser = auth.currentUser;
      const serviceData = {
        serviceTitle: serviceTitle,
        serviceImage: imageUrl,
        serviceDescription: serviceDescription,
        contactDetails: contactDetails,
        servicePhone: phone,
        additionalInfo: additionalInfo,
        postedBy: user,
        posterid: currentUser.uid,
        favoritesCount: 0,
        timePosted: serverTimestamp(),
      };

      await addDoc(collection(db, "services"), serviceData);
      setSuccess("Service posted successfully!");
      setServiceTitle("");
      setServiceDescription("");
      setAdditionalInfo("");
      SetPhone("");
      setContactDetails("");
      setImageUrl("");
      setTimeout(() => {
        setSuccess(null);
        navigate("/dashboard");
      }, 5000); // Clear success message and navigate after 5 seconds
    } catch (err) {
      console.error("Error posting service:", err);
      setError("Failed to post service. Please try again later.");
      setTimeout(() => setError(null), 5000); // Clear error message after 5 seconds
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="py-10 w-[100%] flex items-center bg-[#100F0F]">
      <div className="md:w-[40%] w-[95%] text-[16px] text-black mx-auto bg-white rounded-lg py-10 px-3">
        <h1 className="text-2xl font-bold mb-2">Post Your Service</h1>
        <form
          className="text-center text-[20px] w-full"
          onSubmit={handlePostService}
        >
          <label htmlFor="" className="text-left font-bold block">
            Service Title
          </label>
          <input
            type="text"
            placeholder="Tailoring Service"
            value={serviceTitle}
            onChange={(e) => setServiceTitle(e.target.value)}
            className="mb-4 p-2 block rounded-md w-[100%] border-[2px] border-gray-300 bg-transparent focus:outline-none focus:border-blue-500"
            required
          />
          <label htmlFor="" className="text-left font-bold block">
            {imageUrl ? "Change Image" : " Service Image (Click to upload)"}
          </label>
          <div
            className="mb-4 p-2 border-[2px] w-[60%] flex items-center bg-gray-300 h-[20vh] border-gray-300  focus:outline-none focus:border-blue-500 cursor-pointer"
            onClick={() => document.getElementById("imageUpload").click()}
          >
            {imageUrl ? (
              <img
                src={imageUrl}
                alt="Uploaded service"
                className="max-h-full max-w-full mx-auto"
              />
            ) : (
              "Click to upload image"
            )}
          </div>
          <input
            type="file"
            id="imageUpload"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: "none" }}
          />
          <label htmlFor="" className="text-left font-bold block">
            Service Description
          </label>
          <textarea
            placeholder="Enter service description"
            value={serviceDescription}
            onChange={(e) => setServiceDescription(e.target.value)}
            className="mb-4 p-2 rounded-md block border-[2px] w-[99%]  border-gray-300 bg-transparent focus:outline-none focus:border-blue-500"
            required
          ></textarea>
          <label htmlFor="" className="text-left font-bold block">
            Servces hotline
          </label>
          <input
            type="tel"
            placeholder="080201982"
            value={phone}
            onChange={(e) => SetPhone(e.target.value)}
            className="mb-4 p-2 rounded-md block border-[2px] w-[100%] border-gray-300 bg-transparent focus:outline-none focus:border-blue-500"
          />
          <label htmlFor="" className="text-left font-bold block">
            Contact Details
          </label>
          <input
            type="text"
            placeholder="Address, Email or social media handles"
            value={contactDetails}
            onChange={(e) => setContactDetails(e.target.value)}
            className="mb-4 p-2 rounded-md block border-[2px] w-[100%] border-gray-300 bg-transparent focus:outline-none focus:border-blue-500"
          />
          <label htmlFor="" className="text-left font-bold block">
            Additional Info (optional)
          </label>
          <textarea
            placeholder="Enter additional info about the services"
            value={additionalInfo}
            onChange={(e) => setAdditionalInfo(e.target.value)}
            className="mb-4 p-2 rounded-md block border-[2px] w-[100%] border-gray-300 bg-transparent focus:outline-none focus:border-blue-500"
          ></textarea>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
          <button
            type="submit"
            className="bg-[#0092DB] font-bold text-white mt-5 mb-6 px-20 py-3 rounded-md"
            disabled={loading}
          >
            {loading ? "Posting service..." : "Post Service"}
          </button>
        </form>
        <div className="text-center">
          <p className="mb-2">
            <span className="font-bold">Back to dashboard?</span>
            <NavLink className="text-[#1F45CC] underline mx-2 " to="/dashboard">
              Dashboard
            </NavLink>
          </p>
        </div>
      </div>
    </section>
  );
};

export default requireAuth(PostServicePage);
