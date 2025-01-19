import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const StoreContext = createContext();

const StoreContextProvider = ({ children }) => {
  const [profiles, setProfiles] = useState([]);
  const [filteredProfiles, setFilteredProfiles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/users/get-user`
        );
        setProfiles(response.data.users);
        setFilteredProfiles(response.data.users);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const getUserById = (userId) => {
    return profiles.find((profile) => profile._id === userId);
  };

  const searchProfiles = (query, filterType) => {
    if (!query) {
      setFilteredProfiles(profiles);
    } else {
      if (filterType === "name") {
        setFilteredProfiles(
          profiles.filter((profile) =>
            profile.name.toLowerCase().includes(query.toLowerCase())
          )
        );
      } else if (filterType === "location") {
        setFilteredProfiles(
          profiles.filter(
            (profile) =>
              profile.contactInformation.address.city
                .toLowerCase()
                .includes(query.toLowerCase()) ||
              profile.contactInformation.address.country
                .toLowerCase()
                .includes(query.toLowerCase())
          )
        );
      }
    }
  };

  return (
    <StoreContext.Provider
      value={{
        profiles,
        filteredProfiles,
        loading,
        getUserById,
        searchProfiles,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;