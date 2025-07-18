import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext.jsx";
extension;

const useAuth = () => {
  const context = useContext(AuthContext);
  console.log("useAuth hook: context value is:", context);
  if (!context) {
    console.error(
      "ERROR: useAuth must be used within an AuthProvider - context is null/undefined."
    );
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default useAuth;
