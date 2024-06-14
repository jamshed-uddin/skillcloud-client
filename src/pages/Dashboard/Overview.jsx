import CardSkeleton from "../../components/CardSkeleton";
import CourseCard from "../../components/CourseCard";

import OverviewSkeleton from "../../components/OverviewSkeleton";
import DashboardTitle from "../../components/dashboard/DashboardTitle";
import useSingleUser from "../../hooks/useSingleUser";

const Overview = () => {
  const { singleUser } = useSingleUser();
  console.log(singleUser);

  return (
    <div className="pb-6">
      <div className="mb-3">
        <DashboardTitle>Overview</DashboardTitle>
      </div>
      {/* stats and profile */}
      <OverviewSkeleton />

      {/* continure courses */}

      <div>
        <div className="mb-3">
          <DashboardTitle>Continue learning</DashboardTitle>
        </div>

        <CardSkeleton />
      </div>
    </div>
  );
};

export default Overview;
