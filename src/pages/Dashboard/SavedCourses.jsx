import CardSkeleton from "../../components/CardSkeleton";
import CourseGrid from "../../components/CourseGrid";
import DashboardTitle from "../../components/dashboard/DashboardTitle";
import useData from "../../hooks/useData";

const SavedCourses = () => {
  const { savedCourses } = useData();
  const { data, isLoading, error } = savedCourses || {};
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
    <div>
      <DashboardTitle>Saved courses</DashboardTitle>

      <CourseGrid items={data} />
    </div>
  );
};

export default SavedCourses;
