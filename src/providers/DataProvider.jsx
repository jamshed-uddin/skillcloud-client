import { createContext } from "react";
import { AuthContext } from "./AuthProviders";
import useGetData from "../hooks/useGetData";
import useAuth from "../hooks/useAuth";

export const DataContext = createContext(null);
const DataProvider = ({ children }) => {
  const { user, loading } = useAuth();

  // all courses
  const courses = useGetData("/courses");

  // my courses
  const myCourses = useGetData("courses/myCourses", !!user && !loading);

  // saved courses

  const savedCourses = useGetData("savedCourses", !!user && !loading);

  // enrolled courses

  // payment history

  const isSaved = (courseId) => {
    console.log(courseId);
    const mySavedCourseIds = savedCourses?.data?.map((course) => course._id);
    console.log(mySavedCourseIds);
    if (mySavedCourseIds?.includes(courseId)) {
      return true;
    } else {
      return false;
    }
  };

  const isEnrolled = (courseId) => {
    const enrolledCourseIds = enrolledCourse?.map((course) => course._id);

    if (enrolledCourseIds?.includes(courseId)) {
      return true;
    }

    return false;
  };

  const data = { courses, myCourses, isSaved, isEnrolled };
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export default DataProvider;
