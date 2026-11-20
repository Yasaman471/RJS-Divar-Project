import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { CheckOtp } from "@/Services/auth";
import { setCookie } from "@/utils/cookie";
import getProfileData from "@/Services/user";
import styles from "./CheckOtpForm.module.css";

function CheckOtpForm({ code, setCode, mobile, setStep }) {
  const navigate = useNavigate();
  const { refetch } = useQuery({
    queryKey: ["Profile"],
    queryFn: getProfileData,
  });

  const submitHandler = async (e) => {
    e.preventDefault();
    if (code.length !== 5) {
      toast.error("کد تایید باید ۵ رقم باشد");
      return;
    }
    const { response, error } = await CheckOtp(mobile, code);

    if (response) {
      setCookie(response.data);
      navigate("/");
      refetch();
      toast.success(response?.data?.message || "ورود موفقیت آمیز بود");
    }
    if (error) {
      toast.error(error.response?.data?.message || "کد تایید درست نمی باشد");
    }
  };
  return (
    <form onSubmit={submitHandler} className={styles.form}>
      <p>تایید کد پیامک شده</p>
      <span>کد پیامک شده به شماره «{mobile}»را وارد کنید</span>
      <label htmlFor="input">کد تایید را وارد کنید</label>
      <input
        type="text"
        id="input"
        placeholder="کد تایید"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
      <button type="submit">ورود</button>
      <button
        type="button"
        onClick={() => setStep(1)}
        className={styles.backButton}
      >
        تغییر شماره موبایل
      </button>
    </form>
  );
}

export default CheckOtpForm;
