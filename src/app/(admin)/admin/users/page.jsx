"use client";

import Loading from "@/common/Loading";
import { useGetUsers } from "@/hooks/useAuth";
import UsersTable from "./UsersTable";

function UsersPage() {
  const { data, isPending } = useGetUsers();
  const { users } = data || {};

  console.log(data);
  if (isPending) return <Loading />;

  return (
    <div>
      <h1>اطلاعات کاربران</h1>
      <UsersTable users={users} />
    </div>
  );
}

export default UsersPage;
