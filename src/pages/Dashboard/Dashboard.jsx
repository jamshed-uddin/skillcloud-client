import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { HiBars3BottomLeft, HiOutlineXMark } from "react-icons/hi2";

const Dashboard = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { userLogout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleUserLogout = async () => {
    await userLogout();
    navigate("/");
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <div className="md:flex  m-2 md:m-0 max-h-screen overflow-y-auto">
      <div
        className={`bg-gray-100 shrink-0 w-fit   h-screen  fixed  top-0 bottom-0 z-50 transition-all duration-500 md:sticky md:top-0 md:left-0 md:bottom-0 shadow-xl ${
          menuOpen ? "left-0" : "-left-60"
        }  `}
      >
        <div className=" lg:mb-2  flex flex-col   h-full mx-10 border ">
          <div className="text-end text-xl md:hidden font-bold ">
            <button className="pt-2" onClick={() => setMenuOpen(false)}>
              <HiOutlineXMark className="w-7 h-7" />
            </button>
          </div>
          <div className="text-xl  font-normal  pt-3 md:pt-10 flex-grow  ">
            <div
              className={`${
                pathname.includes("overview") ? "bg-gray-200 rounded-lg" : ""
              }  p-1 cursor-pointer`}
            >
              <Link to={"/dashboard/overview"}>Overview</Link>
            </div>
            <div
              className={`${
                pathname.includes("courses") ? "bg-gray-200 rounded-lg" : ""
              }  p-1 cursor-pointer`}
            >
              <Link to={"/dashboard/courses"}>Courses</Link>
            </div>
            <div
              className={`${
                pathname.includes("myCourses") ? "bg-gray-200 rounded-lg" : ""
              }  p-1 cursor-pointer`}
            >
              <Link to={"/dashboard/myCourses"}>My courses</Link>
            </div>
            <div
              className={`${
                pathname.includes("createCourse")
                  ? "bg-gray-200 rounded-lg"
                  : ""
              }  p-1 cursor-pointer`}
            >
              <Link to={"/dashboard/createCourse"}>Create course</Link>
            </div>
            <div
              className={`${
                pathname.includes("savedCourses")
                  ? "bg-gray-200 rounded-lg"
                  : ""
              }  p-1 cursor-pointer`}
            >
              <Link to={"/dashboard/savedCourses"}>Saved courses</Link>
            </div>
            <div
              className={`${
                pathname.includes("enrolledCourses")
                  ? "bg-gray-200 rounded-lg"
                  : ""
              }  p-1 cursor-pointer`}
            >
              <Link to={"/dashboard/enrolledCourses"}>Enrolled courses</Link>
            </div>
            <div
              className={`${
                pathname.includes("paymentHistory")
                  ? "bg-gray-200 rounded-lg"
                  : ""
              }  p-1 cursor-pointer`}
            >
              <Link to={"/dashboard/paymentHistory"}>Payments</Link>
            </div>
          </div>

          <ul className="text-xl   space-y-2 mb-6 pl-1">
            <li>
              <Link to={"/"}>Home</Link>
            </li>
            <li className="cursor-pointer" onClick={handleUserLogout}>
              Logout
            </li>
          </ul>
        </div>
      </div>

      {/* outlet */}
      <div className="flex-grow px-3">
        <div className=" flex gap-2 items-center">
          <button className="md:hidden" onClick={() => setMenuOpen(true)}>
            <HiBars3BottomLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl text-green-600 font-bold">Dashboard</h1>
          </div>
        </div>
        <div className="mt-3">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
