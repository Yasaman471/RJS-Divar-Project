import toast from "react-hot-toast";
import { SendOtp } from "@/Services/auth";
import styles from "./SendOtpForm.module.css";

function SendOtpForm({ setStep, setMobile, mobile }) {
  const submitHandler = async (event) => {
    event.preventDefault();
    if (mobile.length !== 11) return;
    const { response, error } = await SendOtp(mobile);
    if (response) {
      toast.success("کد تایید ارسال شد");
      setStep(2);
    }
    if (error) {
      toast.error(
        error.response?.data?.message || "خطایی رخ داد، دوباره تلاش کنید",
      );
    }
  };
  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <p>ورود به حساب کاربری</p>
      <span>
        برای استفاده از امکانات دیوار لطفا شماره موبایل خود را وارد کنید .کد
        تایید به این شماره پیامک خواهد شد
      </span>
      <label htmlFor="input">شماره موبایل خود را وارد کنید</label>
      <input
        type="text"
        id="input"
        value={mobile}
        maxLength={11}
        placeholder="شماره موبایل"
        onChange={(e) => setMobile(e.target.value)}
      />
      <button type="submit">ارسال کد تایید</button>
    </form>
  );
}

export default SendOtpForm;
