import { createContext, useContext, useState } from "react";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const [userRole, setUserRole] = useState(null);
  const [location, setLocation] = useState("Australia");

  return (
    <AppContext.Provider
      value={{ userRole, setUserRole, location, setLocation }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
