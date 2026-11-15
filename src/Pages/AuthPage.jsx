import { useState } from "react";
import CheckOtpForm from "@/Components/template/CheckOtpForm";
import SendOtpForm from "@/Components/template/SendOtpForm";

function AuthPage() {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");
  const [code, setCode] = useState();
  return (
    <div>
      {step === 1 && (
        <SendOtpForm setStep={setStep} setMobile={setMobile} mobile={mobile} />
      )}
      {step === 2 && (
        <CheckOtpForm
          code={code}
          setCode={setCode}
          mobile={mobile}
          setStep={setStep}
        />
      )}
    </div>
  );
}

export default AuthPage;
