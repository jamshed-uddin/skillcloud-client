import DashboardTitle from "../../components/dashboard/DashboardTitle";
import PaymentTable from "../../components/dashboard/PaymentTable";
import useData from "../../hooks/useData";

const PaymentHistory = () => {
  const { paymentHistory } = useData();
  const { data, isLoading, error } = paymentHistory || {};

  return (
    <div>
      <DashboardTitle>Payment history</DashboardTitle>

      <PaymentTable transactions={data} />
    </div>
  );
};

export default PaymentHistory;
