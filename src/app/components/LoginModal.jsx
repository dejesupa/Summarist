"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AiOutlineClose } from "react-icons/ai";
import { FaUser } from "react-icons/fa";
import Image from "next/image";
import { useAuth } from "../context/AuthContext";

export default function LoginModal({ isOpen, onClose }) {
  const router = useRouter();
  const { setIsLoggedIn, setUser, redirectPath, setRedirectPath } = useAuth();

  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const guestEmail = "guest@gmail.com";
    const guestPass = "guest123";

    if (!email.includes("@")) {
      setError("Invalid email address");
    } else if (password.length < 6) {
      setError("Password must be at least 6 characters");
    } else if (email === guestEmail && password === guestPass) {
      alert("Login successful!");
      setIsLoggedIn(true);

      //  Save user info
      setUser({
        email,
        plan: "basic",
      });

      // Close modal first
      onClose();

      //  Redirect user after modal closes
      setTimeout(() => {
        if (redirectPath) {
          router.push(redirectPath);
          setRedirectPath(null);
        } else {
          router.push("/for-you"); 
        }
      }, 300);
    } else {
      setError("User not found or wrong credentials");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-40 z-50">
      <div className="bg-white w-[340px] rounded-md p-6 relative shadow-lg text-center">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-black"
        >
          <AiOutlineClose size={18} />
        </button>

        <h2 className="font-semibold text-[15px] text-[#032b41] mb-5">
          {isRegister ? "Sign up to Summarist" : "Log in to Summarist"}
        </h2>

        {/* Login as Guest */}
        {!isRegister && (
          <button
            onClick={() => {
              alert("Guest login successful!");
              setIsLoggedIn(true);
              setUser({
                email: "guest@gmail.com",
                plan: "basic",
              });

              onClose();

              setTimeout(() => {
                if (redirectPath) {
                  router.push(redirectPath);
                  setRedirectPath(null);
                } else {
                  router.push("/for-you");
                }
              }, 300);
            }}
            className="flex items-center justify-center gap-2 w-full bg-[#3b5998] hover:bg-[#334f88] text-white font-semibold py-2 rounded text-[13px] mb-3 transition-all duration-200"
          >
            <FaUser className="text-white text-[14px]" />
            Login as a Guest
          </button>
        )}

        {/* Divider */}
        <div className="relative w-full flex items-center justify-center my-2">
          <div className="w-full border-t border-gray-300" />
          <span className="absolute bg-white text-gray-500 text-xs px-2">or</span>
        </div>

        {/*  Google Login */}
        <button
          type="button"
          className="flex items-center justify-center gap-2 w-full bg-[#4285F4] hover:bg-[#357ae8] text-white font-semibold py-2 rounded text-[13px] mb-3 transition-all duration-200"
        >
          <Image
            src="/assets/google-icon.png"
            alt="Google"
            width={16}
            height={16}
          />
          {isRegister ? "Sign up with Google" : "Login with Google"}
        </button>

        {/* Divider */}
        <div className="relative w-full flex items-center justify-center my-2">
          <div className="w-full border-t border-gray-300" />
          <span className="absolute bg-white text-gray-500 text-xs px-2">or</span>
        </div>

        {/*  Email + Password Inputs */}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email Address"
            className="w-full border border-gray-300 rounded-[4px] py-2 px-3 text-[13.5px] mb-2 focus:outline-none focus:ring-1 focus:ring-[#0365F2]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 rounded-[4px] py-2 px-3 text-[13.5px] mb-3 focus:outline-none focus:ring-1 focus:ring-[#0365F2]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="text-red-500 text-[12px] mb-2">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-[#2BD97C] hover:bg-[#20ba68] text-[#032b41] font-semibold text-[13.5px] py-2.5 rounded mb-3 transition-all duration-200"
          >
            {isRegister ? "Sign up" : "Login"}
          </button>
        </form>

        {!isRegister && (
          <p className="text-[12px] text-[#0365f2] mb-2 cursor-pointer hover:underline">
            Forgot your password?
          </p>
        )}

        <p className="text-[12.5px] text-gray-600">
          {isRegister ? (
            <>
              Already have an account?{" "}
              <span
                className="text-[#0365f2] cursor-pointer hover:underline"
                onClick={() => setIsRegister(false)}
              >
                Login
              </span>
            </>
          ) : (
            <>
              Don’t have an account?{" "}
              <span
                className="text-[#0365f2] cursor-pointer hover:underline"
                onClick={() => setIsRegister(true)}
              >
                Sign up
              </span>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
