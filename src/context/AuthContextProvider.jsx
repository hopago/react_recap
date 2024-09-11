import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthContextProvider = ({ children }) => {
  const [authentication, setAuthentication] = useState({});
  const [persist, setPersist] = useState(
    JSON.parse(localStorage.getItem("persist")) || false
  );

  return (
    <AuthContext.Provider
      value={{ authentication, setAuthentication, persist, setPersist }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
