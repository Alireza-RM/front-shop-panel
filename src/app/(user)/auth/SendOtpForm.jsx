import Loading from "@/common/Loading";
import TextField from "@/common/TextField";

function SendOtpForm({ phoneNumber, onChange, onSubmit, isPending }) {
  return (
    <div>
      <form className="space-y-10" onSubmit={onSubmit}>
        <div>
          <TextField
            label="شماره موبایل"
            name="phoneNumber"
            value={phoneNumber}
            onChange={onChange}
          />
        </div>
        <div>
          {isPending ? (
            <Loading />
          ) : (
            <button type="submit" className="btn btn--primary w-full">
              ارسال کد تایید
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default SendOtpForm;
