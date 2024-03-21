"use client";

import Loading from "@/common/Loading";
import { useGetUser } from "@/hooks/useAuth";
import PaymentTable from "./PaymentTable";

function Payments() {
  const { data, isPending } = useGetUser();
  const { user, payments } = data || {};

  if (isPending) return <Loading />;

  return (
    <div>
      <h1>سفارشات کاربر :</h1>
      <PaymentTable payments={payments} />
    </div>
  );
}

export default Payments;
