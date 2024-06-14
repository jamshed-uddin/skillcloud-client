import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Button from "../Button";
import useSingleUser from "../../hooks/useSingleUser";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useAuth from "../../hooks/useAuth";
import toast, { Toaster } from "react-hot-toast";

const CardPayInfo = ({ course, price }) => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const { singleUser } = useSingleUser();
  const axiosSecure = useAxiosSecure();
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transectionId, setTransectionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();

  const { data: clientSecret, isLoading } = useQuery({
    queryKey: ["paymentIntend", price],
    queryFn: async () => {
      const result = await axiosSecure.post(`/payments/paymentIntent`, {
        price,
      });
      return result?.data?.data?.clientSecret;
    },
    enabled: !!price && !!user && !loading,
  });
  console.log(isLoading);
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card === null) {
      return;
    }

    const { error } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });
    if (error) {
      setCardError(error.message);
      console.log("error", error);
    } else {
      setCardError("");
    }

    setProcessing(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: singleUser?.name || "anonymous",
            email: singleUser?.email,
          },
        },
      });
    if (confirmError) {
      console.log(confirmError);
    }

    // console.log(paymentIntent);
    setProcessing(false);

    if (paymentIntent.status === "succeeded") {
      console.log(paymentIntent);
      setTransectionId(paymentIntent.id);

      const paymentInfo = {
        transactionId: paymentIntent?.id,
        course: course?._id,
        amount: parseFloat(paymentIntent?.amount / 100),
        status: paymentIntent?.status,
      };

      await axiosSecure.post(`/payments`, paymentInfo).then((result) => {
        if (result) {
          console.log(result);
          toast.success("Payment success.Redirecting to enrolled courses");
          setTimeout(() => {
            navigate("/dashboard/enrolledCourses");
          }, 4000);
        }
      });

      await axiosSecure.post(`/enrolledCourses`, { course: course._id });
    }
  };

  return (
    <div>
      <Toaster toastOptions={{ duration: 4000 }} />
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",

                color: "#424770",
                "::placeholder": {
                  color: "#475569",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <div className="flex  gap-2 items-center mt-4">
          <Button
            type="submit"
            disabled={!stripe || !clientSecret || processing}
            isLoading={processing}
          >
            Pay
          </Button>
        </div>
      </form>
      {cardError && <p className="text-sm text-red-500 mt-3">{cardError}</p>}
      {transectionId && (
        <p className="text-sm text-green-400 mt-3">Payment completed.</p>
      )}
    </div>
  );
};

export default CardPayInfo;
