import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/Button";
import useAuth from "../hooks/useAuth";

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/dashboard/overview");
  }, [navigate, user]);

  return (
    <div className="lg:h-[calc(100vh-4rem)] flex lg:flex-row items-center flex-col ">
      <div className="lg:w-[50%] order-last lg:order-first ">
        <h1 className="text-8xl font-bold text-green-600 mb-4">
          Learn Grow Achieve Succeed
        </h1>
        <Link>
          <Button type="button">Login now</Button>
        </Link>
      </div>
      <div className="lg:w-[50%] h-full shrink-0">
        <img
          src="https://cdn.dribbble.com/users/1894420/screenshots/14032021/media/142e780eef301d479b4305dc876f75a9.gif"
          alt="banner"
          loading="lazy"
        />
      </div>
    </div>
  );
};

export default Home;
