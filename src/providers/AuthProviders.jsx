import { createContext, useEffect, useState } from "react";

import axios from "axios";
import app from "../firebase/firebase.config";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
export const AuthContext = createContext(null);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const userSignup = async (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const userLogin = async (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const userLogout = async () => {
    setLoading(true);
    return signOut(auth);
  };

  const loginWithGoogle = async () => {
    return signInWithPopup(auth, googleProvider);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      if (currentUser) {
        axios
          .post(`${import.meta.env.VITE_baseUrl}/user/generateJwtToken`, {
            email: currentUser?.email,
          })
          .then((res) => {
            localStorage.setItem("jwt", res.data.token);
          });
      } else {
        localStorage.removeItem("jwt");
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [user]);

  const authOptions = {
    test: "hhello",
    user,
    loading,
    setLoading,
    userSignup,
    userLogin,
    userLogout,
    loginWithGoogle,
  };
  return (
    <AuthContext.Provider value={authOptions}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
