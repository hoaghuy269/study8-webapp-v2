import InputField from "../components/field/InputField.jsx";
import {t} from "i18next";
import {EMAIL_PATTERN} from "../../../constants/validation.js";
import {useForm} from "react-hook-form";
import SubmitButton from "../components/button/SubmitButton.jsx";
import {useState} from "react";
import CheckboxField from "../components/field/CheckboxField.jsx";
import authService from "../services/AuthService.jsx";
import {useToast} from "../../../hook/useToast.js";

const RegisterFirstStepForm = ({ nextStep, setId }) => {
    const { addToast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await authService.registerCREATE(data.email);
            if (response.data.id != null) {
                setId(response.data.id);
                await authService.registerOTP(response.data.id);

                // Do next page
                nextStep();
            }
        } catch (error) {
            addToast(error.message, "error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Email Input */}
            <InputField
                id="email"
                label={t("login_page.form.email.label")}
                type="email"
                placeholder={t("register_page.form.email.placeholder")}
                register={register}
                errors={errors}
                validation={{
                    required: t("register_page.form.email.validation.required"),
                    pattern: {
                        value: EMAIL_PATTERN,
                        message: t("register_page.form.email.validation.pattern"),
                    },
                }}
            />

            {/* Policy and Terms */}
            <CheckboxField
                id="terms"
                label={t("register_page.form.terms.label")}
                register={register}
                validation={{
                    required: t("register_page.form.terms.validation.required"),
                }}
                error={errors.terms}
            />

            {/* Submit Button */}
            <SubmitButton
                label={t("register_page.form.button.register")}
                isLoading={isLoading}
            />
        </form>
    )
};

export default RegisterFirstStepForm;