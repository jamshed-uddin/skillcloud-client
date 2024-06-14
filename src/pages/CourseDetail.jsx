import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useGetData from "../hooks/useGetData";
import Button from "../components/Button";
import { VscGlobe } from "react-icons/vsc";
import { FiBookmark, FiClock } from "react-icons/fi";
import { IoPlayCircleOutline } from "react-icons/io5";
import { CgLock } from "react-icons/cg";
import toast, { Toaster } from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useData from "../hooks/useData";
import useAuth from "../hooks/useAuth";

function convertTime(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  } else {
    return `${minutes}m`;
  }
}

const CourseDetail = () => {
  const { id: courseId } = useParams();
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { isSaved } = useData();
  const navigate = useNavigate();
  console.log(courseId);

  const [courseSaved, setCourseSaved] = useState(
    isSaved(courseId) ? "true" : "false"
  );

  const { data: course, isLoading, error } = useGetData(`/courses/${courseId}`);

  const saveCourseHandler = async () => {
    try {
      if (courseSaved) {
        await axiosSecure.delete(`/savedCourses/${course._id}`);
        setCourseSaved((p) => !p);
        toast.success("Course unsaved");
      } else {
        await axiosSecure.post(`/savedCourses`, { course: course._id });
        setCourseSaved((p) => !p);
        toast.success("Course saved");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  const enrollClassHandler = async () => {
    if (!user && !loading) {
      return toast.error("Please login to enroll");
    } else {
      navigate(`/dashboard/checkout/${course?._id}`);
    }
  };

  return (
    <div className="pt-4 pb-10">
      <Toaster toastOptions={{ duration: 4000 }} />
      {/* course detail */}
      <div className="flex lg:flex-row flex-col justify-between  gap-4">
        {/* other detail */}
        <div className="lg:w-[60%] order-last lg:order-first">
          <div>
            <h1 className="text-2xl font-semibold lg:text-4xl">
              {course?.title}
            </h1>
            <h3>
              By <span>{course?.instructor?.name}</span>
            </h3>
          </div>
          {/* desc */}
          <div className="mt-4">
            <h2 className="text-xl leading-6">{course?.description}</h2>
          </div>

          {/* price save enroll */}

          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1 ">
                <VscGlobe size={20} /> {course?.language}
              </span>
              <span className="flex items-center gap-1 ">
                <FiClock size={20} />
                {convertTime(course?.duration)}
              </span>
            </div>
            <h3>
              $<span className="text-3xl">{course?.price}</span>
            </h3>
            <div className="space-x-2">
              <Button clickFunc={enrollClassHandler}>Enroll now</Button>
              <Button clickFunc={saveCourseHandler} varient={"outlined"}>
                <span className="flex items-center gap-1">
                  <FiBookmark /> {courseSaved ? "Saved" : "Save"}
                </span>
              </Button>
            </div>
          </div>
        </div>
        {/* course thumbnail */}
        <div className="lg:w-[40%] rounded-lg">
          <img
            className="w-full object-cover rounded-lg"
            src={course?.thumbnail}
            alt={`Thumbnail of ${course?.title}`}
          />
        </div>
      </div>
      {/* course content */}
      <div className="mt-5">
        <h1 className="text-3xl font-semibold flex items-center gap-2">
          <span> Contents</span>
          <span className="text-xl">
            <CgLock />
          </span>
        </h1>
        <div className="mt-2 space-y-1">
          {course?.content?.map((item, index) => (
            <div
              key={index}
              className="flex items-center lg:text-2xl text-xl gap-1 "
            >
              <span>
                <IoPlayCircleOutline />
              </span>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
