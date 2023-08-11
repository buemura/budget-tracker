interface ExpensePaymentStatusProps {
  isPaid: boolean;
}

export default function ExpensePaymentStatus({
  isPaid,
}: ExpensePaymentStatusProps) {
  if (isPaid) {
    return (
      <span className="text-sm text-green-600 font-semibold py-1">Paid</span>
    );
  }

  return (
    <span className="text-sm text-red-600 font-semibold py-1">Not Paid</span>
  );
}
