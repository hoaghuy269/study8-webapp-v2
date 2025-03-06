import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { t } from "i18next";
import SubmitButton from "../components/button/SubmitButton.jsx";
import authService from "../services/AuthService.jsx";
import {useToast} from "../../../hook/useToast.js";

const RegisterSecondStepForm = ({ nextStep, prevStep, id }) => {
    const { addToast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const { handleSubmit } = useForm();
    const otpInputs = useRef([]);
    const [countdown, setCountdown] = useState(0);


    // Handle OTP input
    const handleInput = (e, index) => {
        const value = e.target.value;
        if (value && index < otpInputs.current.length - 1) {
            otpInputs.current[index + 1].focus();
        }
    };

    const handleKeyDown = (e, index) => {
        //Note: Accept Ctrl + V
        if (e.ctrlKey && e.key === "v") {
            return;
        }

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
        const text = e.clipboardData.getData("text").trim();
        if (/^\d{4}$/.test(text)) {
            text.split("").forEach((char, index) => {
                if (otpInputs.current[index]) {
                    otpInputs.current[index].value = char;
                }
            });

            otpInputs.current[3]?.focus();
        }
    };

    // Handle resend OTP
    useEffect(() => {
        if (countdown > 0) {
            const timer = setInterval(() => {
                setCountdown((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [countdown]);

    const handleResendOTP = async () => {
        if (countdown === 0 && !isResending) {
            setIsResending(true);

            try {
                await authService.registerOTP(id);
                setCountdown(20);
            } catch (error) {
                addToast(error.message, "error");
            } finally {
                setIsResending(false);
            }
        }
    };

    // Handle form submit
    const onSubmit = async () => {
        setIsLoading(true);

        const otpValue = otpInputs.current.map(input => input.value).join("");
        if (otpValue.length !== 4) {
            addToast(t("register_page.form.otp.error"), "error");
            return;
        }

        try {
            await authService.registerVERIFY(id, otpValue);

            // Do next page
            nextStep();
        } catch (error) {
            addToast(error.message, "error");
        } finally {
            setIsLoading(false);
        }
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
                        onPaste={handlePaste}
                    />
                ))}
            </div>

            {/* Resend OTP */}
            <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                {t("register_page.form.otp.resend")}{" "}
                <button
                    type="button"
                    className={`text-indigo-600 font-medium ${
                        countdown > 0 ? "opacity-50 cursor-not-allowed" : "hover:underline"
                    }`}
                    onClick={handleResendOTP}
                    disabled={countdown > 0 || isResending}
                >
                    {isResending ? (
                        <span
                            className="animate-spin inline-block h-4 w-4 border-2 border-indigo-600 border-t-transparent rounded-full"></span>
                    ) : countdown > 0 ? (
                        `${t("register_page.form.button.resend_in")} ${countdown}s`
                    ) : (
                        t("register_page.form.button.resend")
                    )}
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
