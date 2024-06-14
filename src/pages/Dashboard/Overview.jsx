import CardSkeleton from "../../components/CardSkeleton";
import CourseCard from "../../components/CourseCard";
import CourseGrid from "../../components/CourseGrid";

import OverviewSkeleton from "../../components/OverviewSkeleton";
import DashboardTitle from "../../components/dashboard/DashboardTitle";
import useData from "../../hooks/useData";
import useSingleUser from "../../hooks/useSingleUser";

const Overview = () => {
  const { singleUser } = useSingleUser();
  console.log(singleUser);

  const { myCourses, enrolledCourses, myEarning } = useData();
  console.log(enrolledCourses);
  return (
    <div className="pb-6">
      <div className="mb-3 ">
        <DashboardTitle>Overview</DashboardTitle>
      </div>
      {/* stats and profile */}
      <div className="lg:flex justify-between items-center gap-4 mb-6 space-y-4 lg:space-y-0">
        <div className="rounded-xl  shadow-md h-40 w-full bg-green-600 text-white p-2">
          <h2 className="text-3xl font-bold ">My classes</h2>
          <h2 className="text-4xl font-semibold">{myCourses?.length || "0"}</h2>
        </div>
        <div className="rounded-xl  shadow-md h-40 w-full bg-green-600 text-white p-2">
          <h2 className="text-3xl font-bold ">Total earning</h2>
          <h2 className="text-4xl font-semibold">
            {myEarning(singleUser?._id) || "0"}
          </h2>
        </div>
        <div className="rounded-xl  shadow-md h-40 w-full bg-green-600 text-white p-2  gap-3">
          <div className="w-12 h-12 rounded-full ">
            {singleUser?.photoURL ? (
              <img
                className="w-full h-full object-cover avatar"
                src={singleUser?.photoURL}
                alt={`Photo of ${singleUser?.name}`}
              />
            ) : (
              <div className="avatar placeholder">
                <div className="bg-white text-neutral-content rounded-full w-12">
                  <span className="text-black font-bold">
                    {singleUser?.name.slice(0, 1)}
                  </span>
                </div>
              </div>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-white">
              {singleUser?.name}
            </h2>
          </div>
        </div>
      </div>

      {/* continure courses */}

      <div>
        <div className="mb-3">
          <DashboardTitle>Continue learning</DashboardTitle>
        </div>

        <CourseGrid items={enrolledCourses?.data} />
      </div>
    </div>
  );
};

export default Overview;
