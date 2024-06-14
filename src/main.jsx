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
import PrivateRoute from "./privateRoutes/PrivateRoutes.jsx";
import Home from "./pages/Home.jsx";

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
        path: "/",
        element: <Home />,
      },
      {
        path: "course/:id",
        element: <CourseDetail />,
      },
      {
        path: "allcourse",
        element: <Courses />,
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
        <PrivateRoute>
          <Dashboard />
        </PrivateRoute>
      </DataProvider>
    ),
    children: [
      {
        path: "overview",
        element: (
          <PrivateRoute>
            <Overview />
          </PrivateRoute>
        ),
      },
      {
        path: "courses",
        element: (
          <PrivateRoute>
            <Courses />
          </PrivateRoute>
        ),
      },
      {
        path: "myCourses",
        element: (
          <PrivateRoute>
            <MyCourses />
          </PrivateRoute>
        ),
      },
      {
        path: "savedCourses",
        element: (
          <PrivateRoute>
            <SavedCourses />
          </PrivateRoute>
        ),
      },
      {
        path: "enrolledCourses",
        element: (
          <PrivateRoute>
            <EnrolledCourses />
          </PrivateRoute>
        ),
      },
      {
        path: "paymentHistory",
        element: (
          <PrivateRoute>
            <PaymentHistory />
          </PrivateRoute>
        ),
      },
      {
        path: "createCourse",
        element: (
          <PrivateRoute>
            <CreateCourse />
          </PrivateRoute>
        ),
      },

      {
        path: "editCourse/:id",
        element: (
          <PrivateRoute>
            <CreateCourse />
          </PrivateRoute>
        ),
      },
      {
        path: "checkout/:id",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
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
