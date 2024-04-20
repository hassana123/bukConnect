import React, { useEffect, useState } from "react";
import { db, auth } from "../../firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import requireAuthAdmin from "../components/requireAuthAdmin";
import AdminNav from "../components/AdminNav";
const AllUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all users from Firestore
    const fetchUsers = async () => {
      try {
        const usersSnapshot = collection(db, "users");
        const queryUsersData = await getDocs(usersSnapshot);
        const userData = queryUsersData.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(userData);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      const userAuth = auth.currentUser;
      if(userAuth){
        await userAuth.delete();
      }
      await deleteDoc(doc(db, "users", userId));
      
      setUsers(users.filter((user) => user.id !== userId));
      console.log("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      <AdminNav />
      {loading ? (
        <p>Loading..</p>
      ) : (
        <>
          <div className="container mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">All Users</h2>
            {/* Display list of users */}
            <ul>
              {users.map((user) => (
                <li key={user.id} className="py-3 border-b border-gray-300">
                  <div className="flex justify-between items-center">
                    <div>
                      <h1>user Info</h1>
                      <p className="font-semibold">
                        {user.firtName} {user.lastName}
                      </p>
                      <p>{user.email}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default requireAuthAdmin(AllUsers);
