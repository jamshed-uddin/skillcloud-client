import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { FaGoogle } from "react-icons/fa";
import axios from "axios";

import useAuth from "../hooks/useAuth";
import Button from "../components/Button";

const Login = () => {
  const { test, user, userLogin, loading, loginWithGoogle } = useAuth();

  const [userCredential, setUserCredential] = useState({
    email: "",
    password: "",
  });
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [inputError, setInputError] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [from, navigate, user]);

  const handleInputChange = (e) => {
    setError("");
    setInputError({
      email: "",
      password: "",
    });
    setUserCredential((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUserLogin = async () => {
    if (!userCredential.email) {
      return setInputError((p) => ({ ...p, email: "Email is required" }));
    } else if (!userCredential.password) {
      return setInputError((p) => ({ ...p, password: "Password is required" }));
    }
    try {
      await userLogin(userCredential.email, userCredential.password);
    } catch (error) {
      if (error.message === "Firebase: Error (auth/invalid-credential).") {
        setError("Invalid credential");
      }
    }
  };

  const handleGoogleLogin = async () => {
    console.log("hello");

    try {
      const res = await loginWithGoogle();
      const userBody = { name: res?.user?.displayName, email: res.user?.email };
      await axios.post(`${import.meta.env.VITE_baseUrl}/user`, userBody);
    } catch (error) {
      console.log(error);
    }
  };

  const inputStyle = "rounded-xl p-2 w-full  focus:outline-none bg-white";

  return (
    <div className="h-screen flex justify-center items-center ">
      <div className="lg:w-1/4 w-full lg:mx-auto mx-10">
        <Link to={"/"}>
          <h1 className="text-lg lg:text-2xl text-green-600  font-bold">
            Skillswap
          </h1>
        </Link>
        <div className="mt-4">
          <h1 className="text-center mb-2 font-semibold text-2xl">Login</h1>
          <div className="w-full">
            <label htmlFor="" className="text-lg font-semibold block">
              Email
            </label>
            <input
              type="text"
              placeholder="Enter you email"
              className={`border ${
                inputError.name ? " border-red-600" : "border-black"
              } ${inputStyle}`}
              name="email"
              value={userCredential.email}
              onChange={handleInputChange}
            />
            <span className="text-sm text-red-600">{inputError.name}</span>
          </div>
          <div className="mt-2 w-full">
            <label
              htmlFor=""
              className="text-lg font-semibold flex justify-between items-end select-none "
            >
              <span> Password</span>
              <span
                onClick={() => setShowPass((p) => !p)}
                className="text-sm font-normal cursor-pointer "
              >
                {showPass ? "Hide" : "Show"}
              </span>
            </label>
            <input
              type={showPass ? "text" : "password"}
              placeholder="Your password"
              className={`border ${
                inputError.password ? " border-red-600" : "border-black"
              } ${inputStyle}`}
              name="password"
              value={userCredential.password}
              onChange={handleInputChange}
            />
            <span className="text-sm text-red-600">{inputError.password}</span>
          </div>
          <span className="text-red-500">{error}</span>

          <div className="text-center mt-3">
            <Button
              disabled={loading}
              isLoading={loading}
              clickFunc={handleUserLogin}
            >
              Login
            </Button>
          </div>
        </div>
        {/* social login */}
        <div className="text-center mt-3">
          <div className="divider">Or</div>
          <h2 className="text-xl font-semibold">Continue with</h2>
          <div className=" mt-2">
            <button onClick={handleGoogleLogin} className="btn btn-sm ">
              <FaGoogle />
            </button>
          </div>
        </div>

        <div className="mt-5">
          <h1>
            New to Skillswap?
            <Link to={"/signup"}>
              <span className="text-green-600 underline">Sign up</span>
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Login;
