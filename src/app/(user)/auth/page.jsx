"use client";
import { checkOtp, getOtp } from "@/services/authServices";
import http from "@/services/httpService";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import CheckOtpForm from "./CheckOtpForm";
import SendOtpForm from "./SendOtpForm";

const RESEND_TIME = 90;

function AuthPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState();
  const [time, setTime] = useState(RESEND_TIME);
  const router = useRouter();

  const {
    data: otpResponse,
    isPending,
    mutateAsync: mutateGetOtp,
  } = useMutation({
    mutationFn: getOtp,
  });
  const { isPending: isCheckingOtp, mutateAsync: mutateCheckOtp } = useMutation(
    {
      mutationFn: checkOtp,
    }
  );

  const phoneNumberHandler = (e) => {
    setPhoneNumber(e.target.value);
  };

  // console.log({ data, error, isPending });
  const sendOtpHandler = async (e) => {
    e.preventDefault();
    try {
      const data = await mutateGetOtp({ phoneNumber });
      toast.success(data.message);
      setStep(2);
      setTime(RESEND_TIME);
      setOtp("");
    } catch (error) {
      console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
    }
  };

  const checkOtpHandler = async (e) => {
    e.preventDefault();
    try {
      const { message, user } = await mutateCheckOtp({ phoneNumber, otp });
      toast.success(message);

      if (user.isActive) {
        router.push("/");
      } else {
        router.push("/complete-profile");
      }
    } catch (error) {
      // console.log(error?.response?.data?.message);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    const timer = time > 0 && setInterval(() => setTime((t) => t - 1), 1000);

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [time]);

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <SendOtpForm
            phoneNumber={phoneNumber}
            onChange={phoneNumberHandler}
            onSubmit={sendOtpHandler}
            isPending={isPending}
          />
        );
      case 2:
        return (
          <CheckOtpForm
            onBack={() => setStep((s) => s - 1)}
            onSubmit={checkOtpHandler}
            otp={otp}
            setOtp={setOtp}
            time={time}
            onResendOtp={sendOtpHandler}
            otpResponse={otpResponse}
            isCheckingOtp={isCheckingOtp}
          />
        );

      default:
        break;
    }
  };

  return (
    <div className="flex justify-center ">
      <div className="w-full sm:max-w-sm">{renderStep()}</div>
    </div>
  );
}

export default AuthPage;
