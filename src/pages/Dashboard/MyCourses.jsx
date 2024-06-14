import CardSkeleton from "../../components/CardSkeleton";
import CourseGrid from "../../components/CourseGrid";
import DashboardTitle from "../../components/dashboard/DashboardTitle";
import useData from "../../hooks/useData";

const MyCourses = () => {
  const { myCourses } = useData();
  const { data, isLoading, error } = myCourses || {};

  if (isLoading) {
    return <CardSkeleton />;
  }

  return (
    <div>
      <DashboardTitle>My courses</DashboardTitle>

      <CourseGrid items={data} placedIn={"dashboard"} />
    </div>
  );
};

export default MyCourses;
