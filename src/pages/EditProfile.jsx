import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { auth, db, storage } from '../../firebase';
import Navbar from '../components/Navbar';

const EditProfile = () => {
  const [userData, setUserData] = useState([])
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [level, setLevel] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const currentUser = JSON.parse(localStorage.getItem("currentUser")) || JSON.parse(sessionStorage.getItem("currentUser")) ;
      
        
        if (currentUser) {
          const userDoc = await getDoc(doc(db, 'users', currentUser));
          if (userDoc.exists()) {
            setUserData({ ...userDoc.data(), id: userDoc.id });
            setFirstName(userData?.firstName);
          setLastName(userData?.lastName);
          setEmail(userData?.email);
          setUserName(userData?.userName);
          setLevel(userData?.level); 
          }
        }
        setLoading(false)
      } catch (error) {
        setLoading(false)
        setError(error)
        console.error('Error fetching current user:', error);
      }
    };

    fetchCurrentUser();
  }, []);

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    setProfilePicture(file);
  };

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        await updateDoc(doc(db, 'users', currentUser),{
            firstName,
            lastName,
            email,
            userName,
            level,
        })
      
      // Handle profile picture upload to Firebase Storage
      if (profilePicture) {
        const storageRef = ref(storage, `profilePictures/${currentUser}/${profilePicture.name}` );
        await uploadBytes(storageRef, profilePicture);
        const imageUrl = await getDownloadURL(storageRef);

        // Update user profile with display picture URL
        await updateDoc(doc(db, 'users', currentUser), {
          profilePicture: imageUrl,
        }); 
      }

      alert('Profile updated successfully');
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="py-10 w-full flex items-center bg-[#100F0F] justify-center">
        <div className="md:w-[40%] w-[98%] text-black mx-auto bg-white rounded-lg py-10 px-3">
          <h1 className="text-3xl font-bold mb-2">Edit Profile</h1>
          {loading?"":<form className="text-center text-[20px]" onSubmit={handleSaveProfile}>
            <label htmlFor="" className="text-left font-bold block">
              First Name
            </label>
            <input
              type="text"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="mb-2 p-2 block rounded-md w-[90%] border-[2px] border-gray-300 bg-transparent focus:outline-none focus:border-blue-500"
              required
            />
            <label htmlFor="" className="text-left font-bold block">
              Last Name
            </label>
            <input
              type="text"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="mb-2 p-2 block rounded-md w-[90%] border-[2px] border-gray-300 bg-transparent focus:outline-none focus:border-blue-500"
              required
            />
            <label htmlFor="" className="text-left font-bold block">
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-2 p-2 block rounded-md w-[90%] border-[2px] border-gray-300 bg-transparent focus:outline-none focus:border-blue-500"
              required
            />
            <label htmlFor="" className="text-left font-bold block">
              Username
            </label>
            <input
              type="text"
              placeholder="Enter your username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="mb-2 p-2 block rounded-md w-[90%] border-[2px] border-gray-300 bg-transparent focus:outline-none focus:border-blue-500"
              required
            />
            <label htmlFor="" className="text-left font-bold block">
              Level
            </label>
            <select
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              className="mb-2 p-2 block rounded-md border-[2px] w-[90%] border-gray-300 bg-transparent focus:outline-none focus:border-blue-500"
              required
            >
              <option value="">Select Level</option>
              {[1, 2, 3, 4, 5].map((lvl) => (
                <option key={lvl} value={lvl}>
                 {`level + ${lvl}`}
                </option>
              ))}
            </select>
            <label htmlFor="" className="text-left font-bold block">
              Profile Picture
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleProfilePictureChange}
              className="mb-2 p-2 block rounded-md border-[2px] w-[90%] border-gray-300 bg-transparent focus:outline-none focus:border-blue-500"
            />
            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              className="bg-[#0092DB] font-bold text-white mt-5 mb-6 px-20 py-3 rounded-md"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Profile'}
            </button>
          </form>}
          <div className="text-center">
            <p className="mb-2">
              <NavLink className="text-[#1F45CC] underline mx-2 " to="/dashboard">
                Back to Dashboard
              </NavLink>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default EditProfile;
