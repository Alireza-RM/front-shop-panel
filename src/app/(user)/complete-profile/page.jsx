"use client";

import TextField from "@/common/TextField";
import { completeProfile } from "@/services/authServices";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-hot-toast";

function CompleteProfile() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  const { data, isPending, mutateAsync } = useMutation({
    mutationFn: completeProfile,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { message } = await mutateAsync({ name, email });
      toast.success(message);
      router.push("/");
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="flex justify-center ">
      <div className="w-full sm:max-w-sm">
        <form className="space-y-8" onSubmit={submitHandler}>
          <TextField
            name="name"
            label="نام و نام خوانوادگی"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            name="email"
            label="ایمیل"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div>
            {isPending ? (
              <h1>LOADING ...</h1>
            ) : (
              <button type="submit" className="btn btn--primary w-full">
                تایید
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CompleteProfile;
