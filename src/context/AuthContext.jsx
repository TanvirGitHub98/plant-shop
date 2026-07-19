import {
  createContext,
  useEffect,
  useState,
} from "react";

import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import app from "../firebase/firebase.config";

export const AuthContext = createContext(null);

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create user using email and password
  const createUser = (email, password) => {
    setLoading(true);

    return createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
  };

  // Sign in using email and password
  const signIn = (email, password) => {
    setLoading(true);

    return signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
  };

  // Sign in using Google
  const googleSignIn = () => {
    setLoading(true);

    const googleProvider =
      new GoogleAuthProvider();

    return signInWithPopup(
      auth,
      googleProvider,
    );
  };

  // Sign out current user
  const logOut = () => {
    setLoading(true);

    return signOut(auth);
  };

  // Send password reset email
  const resetPassword = (email) => {
    return sendPasswordResetEmail(
      auth,
      email,
    );
  };

  // Update user's name and photo
  const updateUserProfile = (
    name,
    photoURL,
  ) => {
    if (!auth.currentUser) {
      return Promise.reject(
        new Error("No authenticated user found."),
      );
    }

    return updateProfile(
      auth.currentUser,
      {
        displayName: name,
        photoURL: photoURL,
      },
    );
  };

  // Observe Firebase authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
        setLoading(false);
      },
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const authData = {
    user,
    setUser,
    loading,
    setLoading,
    createUser,
    signIn,
    googleSignIn,
    logOut,
    resetPassword,
    updateUserProfile,
  };

  return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;