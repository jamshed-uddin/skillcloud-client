import { createContext } from "react";
import { AuthContext } from "./AuthProviders";
import useGetData from "../hooks/useGetData";

export const DataContext = createContext(null);
const DataProvider = ({ children }) => {
  // all courses
  const courses = useGetData("/courses");

  // my courses

  // saved courses

  // enrolled courses

  // payment history

  const isSaved = (courseId) => {
    const mySavedCourseIds = myCourse?.map((course) => course._id);

    if (mySavedCourseIds?.includes(courseId)) {
      return true;
    }

    return false;
  };

  const isEnrolled = (courseId) => {
    const enrolledCourseIds = enrolledCourse?.map((course) => course._id);

    if (enrolledCourseIds?.includes(courseId)) {
      return true;
    }

    return false;
  };

  const data = { courses, isSaved, isEnrolled };
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export default DataProvider;
