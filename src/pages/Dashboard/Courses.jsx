import CardSkeleton from "../../components/CardSkeleton";
import CourseGrid from "../../components/CourseGrid";
import DashboardTitle from "../../components/dashboard/DashboardTitle";
import useData from "../../hooks/useData";

const Courses = () => {
  const { courses } = useData();
  const { data, isLoading, error } = courses || {};

  if (error) {
    return (
      <div className="  text-2xl">
        <h1>Something went wrong</h1>
      </div>
    );
  }

  if (isLoading && !data) {
    return <CardSkeleton />;
  }

  if (!data?.length) {
    return (
      <div className="  text-2xl">
        <h1>No course here</h1>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <DashboardTitle>Courses</DashboardTitle>

      <CourseGrid items={data} placedIn={"dashboard"} />
    </div>
  );
};

export default Courses;
