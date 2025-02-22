import React, { useState, useContext } from "react";
import { AuthContext } from "../Provider/AuthProver"; // Ensure correct file path
import { useNavigate } from "react-router-dom";
import { updateProfile } from "firebase/auth"; // ✅ Import updateProfile from Firebase

const Registration = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { createNewUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();

  // ✅ Handle Email & Password Registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await createNewUser(email, password);
      const user = userCredential.user;

      // ✅ Correct usage of updateProfile
      await updateProfile(user, { displayName: name });

      navigate("/dashboard"); // Redirect to Dashboard after successful registration
    } catch (err) {
      setError(err.message);
    }
  };

  // ✅ Handle Google Registration/Login
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
      navigate("/dashboard"); // Redirect to Dashboard after successful Google login
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-semibold text-center mb-4">Register</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}

        {/* ✅ Registration Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="Full Name"
            className="w-full px-4 py-2 border rounded-md"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full px-4 py-2 border rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600"
          >
            Register
          </button>
        </form>

        {/* ✅ Google Sign-In Button */}
        <div className="mt-4">
          <button
            onClick={handleGoogleSignIn}
            className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600"
          >
            Sign in with Google
          </button>
        </div>

        <div className="mt-4 text-center">
          <p className="text-sm">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
