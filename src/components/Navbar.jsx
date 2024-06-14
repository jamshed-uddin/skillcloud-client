import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useData from "../hooks/useData";
import Button from "./Button";

const Navbar = () => {
  const { user } = useAuth();
  const { test } = useData();
  console.log(test);
  return (
    <div className="flex justify-between items-center py-3">
      <div>
        <h2 className="text-2xl font-bold text-green-600 ">Skillcloud</h2>
      </div>
      <div className="flex justify-between items-center gap-6">
        <div>
          <Link>
            <span className="text-green-600 font-medium">Courses</span>
          </Link>
        </div>
        <div>
          <Link to={`${user ? "/dashboard/overview" : "/login"}`}>
            <Button> {user ? "Dahsboard" : "Login"}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
