import React, { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { Link } from "react-router-dom";
import Modal, { closeModal, openModal } from "./Modal";
import Button from "./Button";
import toast, { Toaster } from "react-hot-toast";
import useAxiosSecure from "../hooks/useAxiosSecure";
import useData from "../hooks/useData";
import useSingleUser from "../hooks/useSingleUser";

const CourseCard = ({ course, placedIn }) => {
  const axiosSecure = useAxiosSecure();
  const { singleUser } = useSingleUser();
  const [deleting, setDeleting] = useState(false);
  const { myCourses } = useData();

  const deleteCourseHandler = async () => {
    console.log("delete");

    try {
      setDeleting(true);
      await axiosSecure.delete(`courses/${course?._id}`);
      setDeleting(false);
      closeModal();
      myCourses?.refetch();
      toast.success("Course deleted successfully");
    } catch (error) {
      setDeleting(false);
      closeModal();
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="h-fit relative">
      <Toaster
        toastOptions={{
          duration: 4000,
        }}
      />
      <Modal>
        <div>
          <h1 className="text-2xl font-semibold leading-5">
            Delete this course?
          </h1>
          <span className="text-sm text-red-600">
            Note:This action is irreversible
          </span>

          <div className="mt-6 flex justify-end gap-2">
            <Button
              clickFunc={deleteCourseHandler}
              disabled={deleting}
              isLoading={deleting}
            >
              Delete
            </Button>
            <Button clickFunc={closeModal} varient={"outlined"}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
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
        {placedIn === "dashboard" &&
          singleUser._id === course?.instructor?._id && (
            <div className="">
              <div className="flex items-center gap-2 ">
                <Link to={`/dashboard/editCourse/${course?._id}`} replace>
                  <span className=" p-2  cursor-pointer active:scale-95 ">
                    <FiEdit size={20} />
                  </span>
                </Link>
                <span
                  onClick={openModal}
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
