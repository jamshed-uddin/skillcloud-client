import { createContext } from "react";

import useGetData from "../hooks/useGetData";
import useAuth from "../hooks/useAuth";

export const DataContext = createContext(null);
const DataProvider = ({ children }) => {
  const { user, loading } = useAuth();

  // all courses
  const courses = useGetData("/courses");

  // my courses
  const myCourses = useGetData("courses/myCourses", !!user?.email && !loading);

  // saved courses

  const savedCourses = useGetData("savedCourses", !!user?.email && !loading);

  // enrolled courses
  const enrolledCourses = useGetData(
    "enrolledCourses",
    !!user?.email && !loading
  );

  // payment history
  const paymentHistory = useGetData("payments", !!user?.email && !loading);

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
    const enrolledCourseIds = enrolledCourses?.data?.map(
      (course) => course._id
    );

    if (enrolledCourseIds?.includes(courseId)) {
      return true;
    } else {
      return false;
    }
  };

  const myEarning = (userId) => {
    const filteredTransactions = enrolledCourses?.data?.filter(
      (transaction) => transaction?.course?.instructor === userId
    );
    const totalAmount = filteredTransactions?.reduce(
      (total, transaction) => total + transaction.amount,
      0
    );

    return totalAmount;
  };

  const data = {
    courses,
    myCourses,
    savedCourses,
    enrolledCourses,
    paymentHistory,
    isSaved,
    isEnrolled,
    myEarning,
  };
  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export default DataProvider;
