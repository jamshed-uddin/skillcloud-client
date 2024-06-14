import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Button from "../Button";
import useSingleUser from "../../hooks/useSingleUser";

const CardPayInfo = ({ course, price }) => {
  const navigate = useNavigate();
  const { singleUser } = useSingleUser();
  const [cardError, setCardError] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transectionId, setTransectionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const clientSecret = "";

  // const {data: clientSecret }= useQuery({
  //   queryKey:     ["paymentIntend", price],
  //   queryFn: async () => {
  //     const result = await axios.post(
  //       `${import.meta.env.VITE_SERVER_URL}/create-payment-intent`,
  //       {
  //         price,
  //       }
  //     );
  //     return result.data.clientSecret;
  //   },
  //   enabled: !!price,
  // })

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
      setTransectionId(paymentIntent.id);

      const paymentInfo = {
        transactionId: paymentIntent?.id,
        course: course?._id,
        amount: parseFloat(paymentIntent?.amount / 100),
        status: paymentIntent?.status,
      };

      await axios
        .post(`${import.meta.env.VITE_baseUrl}/payment`, paymentInfo)
        .then((result) => {
          if (result.ok) {
            setTimeout(() => {
              navigate("/dashboard/enrolledCourses");
            }, 4000);
          }
        });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
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
