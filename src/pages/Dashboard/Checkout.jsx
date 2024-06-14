import { useEffect, useState } from "react";
import DashboardTitle from "../../components/dashboard/DashboardTitle";
import { useParams } from "react-router-dom";
import useGetData from "../../hooks/useGetData";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CardPayInfo from "../../components/dashboard/CardPayInfo";

const Checkout = () => {
  const { id: courseId } = useParams();
  const [stripe, setStripe] = useState(null);
  const { data: course, isLoading, error } = useGetData(`/courses/${courseId}`);

  useEffect(() => {
    loadStripe(import.meta.env.VITE_PAYMENT_PK).then((stripeInstance) => {
      setStripe(stripeInstance);
    });
  }, []);

  const cardStyle = `rounded-xl p-3 shadow-md `;
  return (
    <div className=" ">
      <DashboardTitle>Complete your enrollment</DashboardTitle>
      <div className="lg:flex  mt-4  gap-3">
        <div className={`flex-grow lg:w-1/2 ${cardStyle} `}>
          {/* course thumbnail */}
          <div className="w-full">
            <img
              className="w-full object-cover rounded-md"
              src={course?.thumbnail}
              alt=""
            />
          </div>

          <div className=" mt-2">
            <div className="text-xl font-semibold">{course?.title}</div>
            <h1 className="text-xl">{course?.instructor?.name}</h1>
            <h1 className="text-xl">
              <span className="text-sm">$</span>
              <span className="text-3xl ">{course?.price}</span>
            </h1>
          </div>
        </div>

        <div className={`flex-grow mt-8 lg:mt-0 lg:w-1/2 ${cardStyle}`}>
          <h1 className="text-xl font-semibold mb-5">Card detail</h1>
          <Elements stripe={stripe}>
            <CardPayInfo course={course} price={course?.price}></CardPayInfo>
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
