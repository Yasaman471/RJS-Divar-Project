import { useState } from "react";
import CheckOtpForm from "../Components/Template/CheckOtpForm";
import SendOtpForm from "../Components/Template/SendOtpForm";

function AuthPage() {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [code, setCodep] = useState();
  return (
    <div>
      {step === 1 && (
        <SendOtpForm setStep={setStep} setMobile={setMobile} mobile={mobile} />
      )}
      {step === 2 && <CheckOtpForm />}
    </div>
  );
}

export default AuthPage;
