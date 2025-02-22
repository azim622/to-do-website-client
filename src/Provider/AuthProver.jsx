import React, { createContext, useState, useEffect } from "react";
import app from "../Firebase/firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword, // ✅ Fix: Added email/password login
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  onAuthStateChanged, // ✅ Fix: Tracks login state
} from "firebase/auth";

export const AuthContext = createContext();

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Track Authentication State
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // ✅ Register User
  const createNewUser = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // ✅ Login User (Email & Password)
  const signInUser = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  // ✅ Google Sign-In
  const signInWithGoogle = () => {
    return signInWithPopup(auth, googleProvider);
  };

  // ✅ Logout User
  const logOut = () => {
    return signOut(auth);
  };

  const authInfo = {
    user,
    loading,
    createNewUser,
    signInUser, // ✅ Fix: Now included
    signInWithGoogle,
    logOut, // ✅ Fix: Now included
  };

  return (
    <AuthContext.Provider value={authInfo}>
      {!loading && children} {/* Prevents flashing UI during auth check */}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
