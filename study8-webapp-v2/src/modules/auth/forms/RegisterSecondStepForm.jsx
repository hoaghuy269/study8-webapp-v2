import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { t } from "i18next";
import SubmitButton from "../../../components/button/SubmitButton.jsx";

const RegisterSecondStepForm = ({ nextStep, prevStep, id }) => {
    const [isLoading, setIsLoading] = useState(false);
    const { handleSubmit } = useForm();
    const otpInputs = useRef([]);
    const [countdown, setCountdown] = useState(0);

    // useEffect để giảm dần thời gian đếm ngược
    useEffect(() => {
        if (countdown > 0) {
            const timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [countdown]);

    // Handle OTP input
    const handleInput = (e, index) => {
        const value = e.target.value;
        if (value && index < otpInputs.current.length - 1) {
            otpInputs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        if (!/^[0-9]$/.test(e.key) && e.key !== "Backspace" && e.key !== "Delete") {
            e.preventDefault();
        }

        if ((e.key === "Backspace" || e.key === "Delete")) {
            otpInputs.current[index].value = "";
            if (index > 0) {
                otpInputs.current[index - 1].focus();
            }
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const text = e.clipboardData.getData("text").trim();
        if (/^\d{4}$/.test(text)) {
            text.split("").forEach((char, index) => {
                if (otpInputs.current[index]) {
                    otpInputs.current[index].value = char;
                }
            });
        }
    };

    // Handle resend OTP
    const handleResendOTP = () => {
        if (countdown === 0) {
            console.log("Resend OTP clicked");
            setCountdown(20);
        }
    };

    // Handle form submit
    const onSubmit = async (data) => {
        console.log("Form Data:", data);
        nextStep();
    };

    return (
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/*OTP Input*/}
            <label htmlFor="otp" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                {t("register_page.form.otp.label")}
            </label>
            <div className="flex items-center justify-center gap-3" onPaste={handlePaste}>
                {[...Array(4)].map((_, index) => (
                    <input
                        key={index}
                        type="text"
                        className="w-14 h-14 text-center text-2xl font-extrabold text-slate-900 bg-slate-100 border border-transparent hover:border-slate-200 appearance-none rounded p-4 outline-none focus:bg-white focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                        maxLength="1"
                        ref={(el) => (otpInputs.current[index] = el)}
                        onInput={(e) => handleInput(e, index)}
                        onKeyDown={(e) => handleKeyDown(e, index)}
                    />
                ))}
            </div>

            {/* Resend OTP */}
            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                {t("register_page.form.otp.resend")}{" "}
                <button
                    type="button"
                    className={`text-indigo-600 font-medium ${countdown > 0 ? "opacity-50 cursor-not-allowed" : "hover:underline"}`}
                    onClick={handleResendOTP}
                    disabled={countdown > 0}
                >
                    {countdown > 0 ? `${t("register_page.form.button.resend_in")} ${countdown}s` : t("register_page.form.button.resend")}
                </button>
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col items-center gap-2">
                <SubmitButton label={t("register_page.form.button.verify")} isLoading={isLoading}/>

                <button
                    type="button"
                    onClick={prevStep}
                    className="flex items-center text-indigo-600 font-medium hover:underline"
                >
                    ← {t("register_page.form.button.back")}
                </button>
            </div>
        </form>
    );
};

export default RegisterSecondStepForm;
