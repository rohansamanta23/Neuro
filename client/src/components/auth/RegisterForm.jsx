import React, { useRef } from "react";
import InputField from "../ui/InputField";
import PasswordField from "../ui/PasswordField";
import AvatarUploader from "../ui/AvatarUploader";
import ErrorAlert from "../ui/ErrorAlert";
import { registerUser } from "../../services/authService.js"

export default function RegisterForm() {
  const [formData, setFormData] = React.useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: null,
  });
  const [error, setError] = React.useState("");

  // Refs for each input
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);

  // Handle Enter key to move to next input
  const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (nextRef && nextRef.current) {
        nextRef.current.focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fullName, email, password, confirmPassword } = formData;
    if (!fullName || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }
    try {
      const res = await registerUser(formData);
      console.log(res.message);
      // Optionally, redirect or show success message
      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        avatar: null,
      });
      setError(""); // Clear any previous errors
      nameRef.current.focus(); // Reset focus to the name field
    } catch (err) {
      setError(err.message || "Registration failed. Please try again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <section className="min-h-[calc(100vh-70px)] flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 px-2">
      <div className="relative p-[2px] rounded-xl bg-gradient-to-tr from-gray-300 via-gray-100 to-gray-400 w-full max-w-md sm:min-w-120 register-form shadow-3xl overflow-hidden">
        <div className="bg-gray-900 rounded-xl p-4 sm:py-8 sm:px-6 relative z-10">
          <h2 className="text-2xl sm:text-4xl pb-3 font-bold font-sans tracking-wide ml-1 sm:ml-2 text-transparent bg-clip-text bg-gradient-to-r from-gray-300 via-gray-100 to-gray-400 ">
            Sign Up!
          </h2>
          <hr className="mb-4 border-t-2 border-gray-400 opacity-50" />
          {error && <ErrorAlert error={error} onClose={() => setError("")} />}
          <form
            className="flex flex-col gap-4 sm:gap-5"
            onSubmit={handleSubmit}
          >
            <AvatarUploader
              avatar={formData.avatar}
              setAvatar={(file) =>
                setFormData((prevData) => ({ ...prevData, avatar: file }))
              }
            />
            <InputField
              ref={nameRef}
              type="text"
              name="fullName"
              placeholder="Name"
              value={formData.fullName}
              onChange={handleChange}
              autoComplete="name"
              onKeyDown={(e) => handleKeyDown(e, emailRef)}
            />
            <InputField
              ref={emailRef}
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              onKeyDown={(e) => handleKeyDown(e, passwordRef)}
            />
            <PasswordField
              ref={passwordRef}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, confirmPasswordRef)}
            />
            <PasswordField
              ref={confirmPasswordRef}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyDown(e, null)}
            />
            <button
              type="submit"
              className="mt-2 py-2 rounded-sm bg-gradient-to-r from-gray-400 via-gray-300 to-gray-500 text-gray-900 font-semibold hover:from-gray-300 hover:to-gray-400 transition"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
