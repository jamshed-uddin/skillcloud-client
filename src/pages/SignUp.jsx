import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import axios from "axios";

import useAuth from "../hooks/useAuth";
import Button from "../components/Button";

const Signup = () => {
  const { user, userSignup, loading, setLoading } = useAuth();
  const [userCredential, setUserCredential] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [inputError, setInputError] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPass, setShowPass] = useState({
    password: false,
    confirmPassword: false,
  });
  const [error, setError] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [from, navigate, user]);

  const handleInputChange = (e) => {
    setError("");
    setInputError({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setUserCredential((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUserSignup = async () => {
    try {
      const { name, email, password, confirmPassword } = userCredential;
      if (!name) {
        return setInputError((p) => ({ ...p, name: "Name is required" }));
      } else if (!email) {
        return setInputError((p) => ({ ...p, email: "Email is required" }));
      } else if (!password) {
        return setInputError((p) => ({
          ...p,
          password: "Password is required",
        }));
      } else if (!confirmPassword) {
        return setInputError((p) => ({
          ...p,
          confirmPassword: "Confirm password is required",
        }));
      } else if (password !== confirmPassword) {
        return setError("Password does not match");
      } else if (password.length < 6) {
        return setError("Password must be 6 character at least.");
      }

      await userSignup(email, password);
      const userBody = {
        name: userCredential.name,
        email: userCredential.email,
      };
      await axios.post(`${import.meta.env.VITE_baseUrl}/user`, userBody);
    } catch (error) {
      setLoading((p) => !p);
      if (error.message === "Firebase: Error (auth/email-already-in-use).") {
        setError("An account with this email already exists.");
      }
    }
  };
  const inputStyle = "rounded-xl p-2 w-full  focus:outline-none bg-white";

  return (
    <div className="h-screen flex justify-center items-center ">
      <div className=" lg:w-1/4 w-full lg:mx-auto mx-10">
        <Link to={"/"}>
          <h1 className="text-lg text-green-600 lg:text-2xl font-bold">
            Skillcloud
          </h1>
        </Link>
        <div className="mt-4">
          <h1 className="text-center mb-2 font-semibold text-2xl">Sign up</h1>
          <div>
            <label htmlFor="" className="text-lg font-semibold">
              Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              className={`border ${
                inputError.name ? " border-red-600" : "border-black"
              } ${inputStyle}`}
              name="name"
              value={userCredential.name}
              onChange={handleInputChange}
              autoComplete="new-password"
            />
            <span className="text-sm text-red-600">{inputError.name}</span>
          </div>
          <div>
            <label htmlFor="" className="text-lg font-semibold">
              Email
            </label>
            <input
              type="text"
              placeholder="Enter you email"
              className={`border ${
                inputError.email ? " border-red-600" : "border-black"
              } ${inputStyle}`}
              name="email"
              value={userCredential.email}
              onChange={handleInputChange}
              autoComplete="new-password"
            />
            <span className="text-sm text-red-600">{inputError.email}</span>
          </div>
          <div className="mt-2">
            <label
              htmlFor=""
              className="text-lg font-semibold flex justify-between items-end select-none"
            >
              <span> Password</span>
              <span
                onClick={() =>
                  setShowPass((p) => ({
                    ...p,
                    password: !p.password,
                  }))
                }
                className="text-sm font-normal cursor-pointer "
              >
                {showPass.password ? "Hide" : "Show"}
              </span>
            </label>
            <input
              type={showPass.password ? "text" : "password"}
              placeholder="Your password"
              className={`border ${
                inputError.password ? " border-red-600" : "border-black"
              } ${inputStyle}`}
              name="password"
              value={userCredential.password}
              onChange={handleInputChange}
              autoComplete="new-password"
            />
            <span className="text-sm text-red-600">{inputError.password}</span>
          </div>
          <div className="mt-2">
            <label
              htmlFor=""
              className="text-lg font-semibold flex justify-between items-end select-none"
            >
              <span>Confirm password</span>
              <span
                onClick={() =>
                  setShowPass((p) => ({
                    ...p,
                    confirmPassword: !p.confirmPassword,
                  }))
                }
                className="text-sm font-normal cursor-pointer "
              >
                {showPass.confirmPassword ? "Hide" : "Show"}
              </span>
            </label>
            <input
              type={showPass.confirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              className={`border ${
                inputError.confirmPassword ? " border-red-600" : "border-black"
              } ${inputStyle}`}
              name="confirmPassword"
              value={userCredential.confirmPassword}
              onChange={handleInputChange}
              autoComplete="new-password"
            />
            <span className="text-sm text-red-600">
              {inputError.confirmPassword}
            </span>
          </div>
          <span className="text-red-500">{error}</span>

          <div className="text-center mt-3">
            <Button
              disabled={loading}
              isLoading={loading}
              clickFunc={handleUserSignup}
            >
              Sign up
            </Button>
          </div>
        </div>

        <div className="mt-5">
          <h1>
            Already have an account?
            <Link to={"/login"}>
              <span className="text-green-600 underline">Login</span>
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Signup;
