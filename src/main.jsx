import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import DataProvider from "./providers/DataProvider.jsx";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import ScrollToTop from "./ScrollToTop.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/SignUp.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AuthProvider from "./providers/AuthProviders.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Overview from "./pages/Dashboard/Overview.jsx";
import Courses from "./pages/Dashboard/Courses.jsx";
import MyCourses from "./pages/Dashboard/MyCourses.jsx";
import SavedCourses from "./pages/Dashboard/SavedCourses.jsx";
import EnrolledCourses from "./pages/Dashboard/EnrolledCourses.jsx";
import PaymentHistory from "./pages/Dashboard/PaymentHistory.jsx";
import CreateCourse from "./pages/Dashboard/CreateCourse.jsx";
import CourseDetail from "./pages/CourseDetail.jsx";
import Checkout from "./pages/Dashboard/Checkout.jsx";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollToTop />
        <DataProvider>
          <App />
        </DataProvider>
      </>
    ),
    children: [
      {
        path: "course/:id",
        element: <CourseDetail />,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "dashboard",
    element: (
      <DataProvider>
        <Dashboard />
      </DataProvider>
    ),
    children: [
      {
        path: "overview",
        element: <Overview />,
      },
      {
        path: "courses",
        element: <Courses />,
      },
      {
        path: "myCourses",
        element: <MyCourses />,
      },
      {
        path: "savedCourses",
        element: <SavedCourses />,
      },
      {
        path: "enrolledCourses",
        element: <EnrolledCourses />,
      },
      {
        path: "paymentHistory",
        element: <PaymentHistory />,
      },
      {
        path: "createCourse",
        element: <CreateCourse />,
      },

      {
        path: "editCourse/:id",
        element: <CreateCourse />,
      },
      {
        path: "checkout/:id",
        element: <Checkout />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
