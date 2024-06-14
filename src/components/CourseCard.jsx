import React from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";

const CourseCard = ({ course, placedIn }) => {
  return (
    <div className="h-fit relative">
      <Link to={`/course/${course?._id}`}>
        <div className="rounded-xl shadow-md h-60 lg:min-h-[26rem]  w-full p-2 overflow-hidden">
          <div className="h-[50%] lg:h-[70%] ">
            <img
              className="h-full w-full object-cover"
              src={course?.thumbnail}
              alt={`Thumbnail of ${course?.title}`}
            />
          </div>
          <div className="flex flex-col  h-[50%] lg:h-[30%]">
            <div className="flex-grow ">
              <h1 className="lg:text-xl font-semibold ">{course?.title}</h1>
              <h3 className="lg:text-lg ">{course?.instructor?.name}</h3>
            </div>
            <div className=" leading-3">
              <h3>
                $<span className="text-xl font-medium">{course?.price}</span>
              </h3>
            </div>
          </div>
        </div>
      </Link>
      <div className="absolute bottom-0 right-0 leading-3">
        {placedIn === "myCourses" && (
          <div className="">
            <div className="flex items-center gap-2 ">
              <Link to={`/dashboard/editCourse/${course?._id}`} replace>
                <span className=" p-2  cursor-pointer active:scale-95 ">
                  <FiEdit size={20} />
                </span>
              </Link>
              <span
                //   onClick={openModal}
                className="  text-red-600  p-2   cursor-pointer active:scale-95 "
              >
                <FaRegTrashCan size={20} />
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseCard;
