"use client";

import Loading from "@/common/Loading";
import TextField from "@/common/TextField";
import { useGetUser } from "@/hooks/useAuth";
import { updateProfile } from "@/services/authServices";
import { includeObj } from "@/utils/objectUtils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

function Me() {
  const queryClient = useQueryClient();
  const { data, isPending } = useGetUser();
  const { isPending: isUpdating, mutateAsync } = useMutation({
    mutationFn: updateProfile,
  });
  const [formData, setFormData] = useState({});
  const { user } = data || {};
  const includesKey = ["name", "email", "phoneNumber", "biography"];

  useEffect(() => {
    if (user) setFormData(includeObj(user, includesKey));
  }, [user]);

  if (isPending) return <Loading />;

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { message, user } = await mutateAsync(formData);
      toast.success(message);
      queryClient.invalidateQueries({ queryKey: ["get-user"] });
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="max-w-sm">
      <h1 className="text-xl font-bold mb-4">اطلاعات کاربری</h1>
      <form onSubmit={submitHandler} className="space-y-5">
        {Object.keys(includeObj(user, includesKey)).map((key) => {
          return (
            <TextField
              label={key}
              name={key}
              key={key}
              value={formData[key] || ""}
              onChange={(e) =>
                setFormData({ ...formData, [e.target.name]: e.target.value })
              }
            />
          );
        })}
        <div>
          {isUpdating ? (
            <Loading />
          ) : (
            <button type="submit" className="btn btn--primary w-full">
              ویرایش
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default Me;
