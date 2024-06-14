import CardSkeleton from "../../components/CardSkeleton";
import CourseGrid from "../../components/CourseGrid";
import DashboardTitle from "../../components/dashboard/DashboardTitle";
import useData from "../../hooks/useData";

const Courses = () => {
  const { courses } = useData();
  const { data, isLoading, error } = courses || {};
  console.log(data);

  if (isLoading) {
    return <CardSkeleton />;
  }

  return (
    <div>
      <DashboardTitle>Courses</DashboardTitle>

      <CourseGrid items={data} placedIn={"myCourses"} />
    </div>
  );
};

export default Courses;
