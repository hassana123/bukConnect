import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function requireAuth(Component) {
  return function AuthenticatedComponent(props) {
    const navigate = useNavigate(); // Move useNavigate inside the component
    const [loading, setLoading] = useState(true); // Add loading state

    useEffect(() => {
      const checkAuthentication = async () => {
        try {
          // Simulate loading time (remove setTimeout in production)
          setTimeout(() => {
            const userDataLocalStorage = localStorage.getItem("userData");
            const userDataSessionStorage = sessionStorage.getItem("userData");
            if (!userDataLocalStorage && !userDataSessionStorage) {
              navigate("/sign-up"); // Redirect to login page if user data is not found
            }
            setLoading(false); // Set loading to false after authentication check
          }, 1000); // Adjust loading time as needed
        } catch (error) {
          console.error("Error checking authentication:", error);
          setLoading(false); // Set loading to false if an error occurs
        }
      };

      checkAuthentication();
    }, [navigate]); // Pass navigate as a dependency to useEffect

    return loading ? (
      <div>Loading...</div> // Render loading indicator while checking authentication
    ) : (
      <Component {...props} />
    );
  };
}

export default requireAuth;
