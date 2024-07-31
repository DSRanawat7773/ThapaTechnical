import { createContext, useContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const [services, setServices] = useState("");

  // Function to check if the user is authenticated or not
  const userAuthentication = async () => {
    if (!token) return; // Exit if no token

    try {
      const response = await fetch("http://localhost:5000/api/auth/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.userData);
      } else {
        console.error("Error fetching user data:", await response.text());
        setUser(null); // Clear user if data fetch fails
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setUser(null); // Clear user if there's an error
    }
  };

  //To fetch the services

  const getServices = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/data/service", {
        method: "GET",
      });

      if(response.ok){
        const data = await response.json();
        console.log(data.services);
        setServices(data.services);
      }
      
    } catch (error) {
      console.log(`services frontend error: ${error}`);
    }
  }

  useEffect(() => { 
    getServices();
    userAuthentication();

  }, []);

  useEffect(() => {
    userAuthentication();
  }, [token]);

  // Function to store the token in localStorage
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken);
    localStorage.setItem("token", serverToken);
  };

  // Check if the user is logged in
  const isLoggedIn = !!token;

  // Function to log out the user
  const LogoutUser = () => {
    setToken("");
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, storeTokenInLS, LogoutUser, user, services}}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContextValue;
};
