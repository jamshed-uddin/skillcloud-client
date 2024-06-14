import { useContext } from "react";
import { AuthContext } from "../providers/AuthProviders";

const useAuth = () => {
  const authContext = useContext(AuthContext);

  return authContext;
};

export default useAuth;
