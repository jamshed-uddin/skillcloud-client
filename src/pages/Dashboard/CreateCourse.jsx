import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import DashboardTitle from "../../components/dashboard/DashboardTitle";
import Button from "../../components/Button";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast, { Toaster } from "react-hot-toast";

const categories = [
  "Web Development",
  "Programming",
  "Front-End Development",
  "Back-End Development",
  "Full Stack Development",
  "Database Management",
  "Mobile App Development",
  "DevOps",
  "Cybersecurity",
  "Cloud Computing",
];
const CreateCourse = () => {
  const { id: editingCourseId } = useParams();

  const [editMode, setEditMode] = useState(false);
  const [courseData, setCourseData] = useState({
    title: "",
    thumbnail: "",
    duration: "",
    contents: [""],
    description: "",
    price: "",
    language: "",
    category: "",
  });
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const [error, setError] = useState("");

  // using add product form for editing product by filling the product state with the product that need to be edited.
  useEffect(() => {
    if (editingCourseId) {
      setEditMode(true);
    }

    const loadCourse = async () => {
      const data = await axios.get(
        `${import.meta.env.VITE_baseUrl}/courses/${editingCourseId}`
      );

      setCourseData(data?.data?.data);
    };

    loadCourse();
  }, [editingCourseId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setError("");

    setCourseData((prev) => ({ ...prev, [name]: value }));
  };

  const handleContentsInputChange = (e, inputIndex) => {
    const value = e.target.value;
    setCourseData((prev) => ({
      ...prev,
      contents: courseData.contents.map((item, index) =>
        index === inputIndex ? value : item
      ),
    }));
  };
  console.log(courseData);
  const handleAddContentsInput = () => {
    setCourseData((prev) => ({
      ...prev,
      contents: [...courseData.contents, ""],
    }));
  };

  const handleRemoveContentInput = (inputIndex) => {
    if (courseData.contents.length === 1) return;

    const filteredInput = courseData.contents.filter(
      (item, index) => index !== inputIndex
    );

    setCourseData((prev) => ({
      ...prev,
      contents: filteredInput,
    }));
  };

  const submitAuction = async (e) => {
    e.preventDefault();

    try {
      // if the form being used for editing product;
      if (editMode && editingCourseId) {
        setLoading(true);

        const updatedCourse = await axiosSecure.patch(
          `/courses/${editingCourseId}`,
          courseData
        );
        toast.success("Course updated successfully");
        navigate(`/course/${updatedCourse?.data?.data?._id}`, {
          replace: true,
        });
        setLoading(false);
        return;
      } else {
        // if the form is being used for adding product;
        setLoading(true);
        const addedCourse = await axiosSecure.post("/listings", courseData);
        // navigate(`/auctions/${addedCourse?.data?.data._id}`, {
        //   replace: true,
        // });

        toast.success("Course created successfully");
        setLoading(false);
      }
    } catch (error) {
      toast.error("Something went wrong!");
      setLoading(false);
    }
  };

  const inputStyle =
    "border border-black rounded-xl p-2 w-full  focus:outline-none bg-white";

  return (
    <div className="pb-7">
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{ duration: 5000 }}
      />
      <DashboardTitle>
        {editingCourseId && editMode ? "Edit course" : "Create course"}
      </DashboardTitle>
      <div className="mt-2 lg:w-3/4">
        <form onSubmit={submitAuction} className="md:space-y-4 mt-5">
          <div className="md:flex  gap-4">
            <div className="w-full">
              <label htmlFor="" className="block text-lg font-semibold ">
                title
              </label>
              <input
                type="text"
                placeholder="Title"
                className={inputStyle}
                name="title"
                value={courseData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="w-full">
              <label htmlFor="" className="block text-lg font-semibold ">
                Price
              </label>
              <input
                type="number"
                placeholder="Price"
                className={inputStyle}
                name="price"
                value={courseData.price && parseInt(Number(courseData.price))}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="md:flex  gap-4 ">
            <div className="w-full">
              <label htmlFor="" className="block text-lg font-semibold ">
                Thumbnail
              </label>
              <input
                type="text"
                placeholder="Thumbnail photo url"
                className={inputStyle}
                name="thumbnail"
                value={courseData.thumbnail}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="w-full">
              <label htmlFor="" className="block text-lg font-semibold ">
                Language
              </label>
              <input
                type="text"
                placeholder="Language"
                className={inputStyle}
                name="language"
                value={courseData.language}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>

          {/* contents input */}
          <div>
            <label htmlFor="" className="block text-lg font-semibold ">
              Contents
            </label>
            {courseData?.contents?.map((content, index) => (
              <div key={index} className="w-full mb-2 relative">
                <input
                  type="text"
                  placeholder="Content title"
                  className={inputStyle}
                  name="contents"
                  value={content}
                  onChange={(e) => handleContentsInputChange(e, index)}
                  required
                />
                <span
                  onClick={() => handleRemoveContentInput(index)}
                  className="absolute right-1 top-1/2 -translate-y-1/2 cursor-pointer px-3"
                >
                  X
                </span>
              </div>
            ))}

            <div onClick={handleAddContentsInput} className="mt-2 w-fit">
              <Button type={"button"}>Add more</Button>
            </div>
          </div>
          <div className="md:flex  gap-4 ">
            <div className="w-full">
              <label htmlFor="" className="block text-lg font-semibold ">
                Duration <span className="text-sm">(Minutes)</span>
              </label>
              <input
                type="number"
                placeholder="Couse duration"
                className={inputStyle}
                name="duration"
                value={
                  courseData.duration && parseInt(Number(courseData.duration))
                }
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="w-full">
              <label htmlFor="" className="block text-lg font-semibold ">
                Category
              </label>

              <select
                className="rounded-xl p-2 border border-black focus:outline-none w-full bg-white"
                name="category"
                id=""
                onChange={handleInputChange}
                value={courseData.category}
                required
              >
                <option value="">Choose category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="" className="block text-lg font-semibold ">
              Description
            </label>
            <textarea
              type="text"
              placeholder="Product description"
              className="rounded-xl p-2 border border-black w-full  focus:outline-none min-h-20 max-h-40  bg-white"
              name="description"
              value={courseData.description}
              onChange={handleInputChange}
            />
          </div>

          <div className="mt-2 text-center md:text-end ">
            <Button disabled={loading} isLoading={loading} type={"submit"}>
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
