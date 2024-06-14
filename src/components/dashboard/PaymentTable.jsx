const PaymentTable = ({ transactions }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="w-full bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
            <th className="py-3 px-6 text-left">Title</th>
            <th className="py-3 px-6 text-left">Transaction ID</th>
            <th className="py-3 px-6 text-left">Amount</th>
            <th className="py-3 px-6 text-left">Date</th>
          </tr>
        </thead>
        <tbody className="text-gray-600 text-sm font-light">
          {transactions?.map((transaction) => (
            <tr
              key={transaction._id}
              className="border-b border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-6 text-left whitespace-nowrap">
                {transaction.course.title}
              </td>
              <td className="py-3 px-6 text-left">
                {transaction.transactionId}
              </td>
              <td className="py-3 px-6 text-left">${transaction.amount}</td>
              <td className="py-3 px-6 text-left">
                {new Date(transaction.createdAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentTable;
