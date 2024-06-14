import CourseCard from "./CourseCard";

const CourseGrid = ({ items, placedIn }) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
      {items?.map((item) => (
        <CourseCard key={item._id} course={item} placedIn={placedIn} />
      ))}
    </div>
  );
};

export default CourseGrid;
