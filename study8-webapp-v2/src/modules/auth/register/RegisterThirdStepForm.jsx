import {t} from "i18next";
import {PASSWORD_PATTERN} from "../../../constants/validation.js";
import {useForm} from "react-hook-form";
import SubmitButton from "../components/button/SubmitButton.jsx";
import {useState} from "react";
import authService from "../services/AuthService.jsx";
import {useToast} from "../../../hook/useToast.js";
import InputField from "../components/field/InputField.jsx";
import InfoInputField from "../components/field/InfoInputField.jsx";
import AsyncSelectField from "../components/field/AsyncSelectField.jsx";

const RegisterThirdStepForm = ({ nextStep, prevStep, id }) => {
    const { addToast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        control,
        watch,
        formState: { errors },
    } = useForm();

    const password = watch("password");

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            await authService.registerSUBMIT(id, data.password, data.name, data.role.value);

            // Do next to success page
            nextStep();
        } catch (error) {
            addToast(error.message, "error");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* Name Input */}
            <InputField
                id="name"
                label={t("register_page.form.name.label")}
                type="text"
                placeholder={t("register_page.form.name.placeholder")}
                register={register}
                errors={errors}
                validation={{
                    required: t("register_page.form.name.validation.required"),
                }}
            />

            {/* Role Select */}
            <AsyncSelectField
                id="role"
                label={t("register_page.form.role.label")}
                placeholder={t("register_page.form.role.placeholder")}
                url="/api/v1/sys/public/constant?groupCode=SYSTEM_ROLE"
                control={control}
                errors={errors}
                validation={{
                    required: t("register_page.form.role.validation.required"),
                }}
            />


            {/* Password Input */}
            <InfoInputField
                id="password"
                label={t("register_page.form.password.label")}
                type="password"
                placeholder={t("register_page.form.password.placeholder")}
                register={register}
                errors={errors}
                validation={{
                    required: t("register_page.form.password.validation.required"),
                    pattern: {
                        value: PASSWORD_PATTERN,
                        message: t("register_page.form.password.validation.pattern"),
                    },
                }}
                tooltip={t("register_page.form.password.validation.pattern")}
            />

            {/* Retype Password Input */}
            <InputField
                id="retypePassword"
                label={t("register_page.form.retype_password.label")}
                type="password"
                placeholder={t("register_page.form.retype_password.placeholder")}
                register={register}
                errors={errors}
                validation={{
                    required: t("register_page.form.password.validation.required"),
                    validate: (value) =>
                        value === password || t("register_page.form.password.validation.match"),
                }}
            />

            {/* Navigation Buttons */}
            <div className="flex flex-col items-center gap-2">
                <SubmitButton
                    label={t("register_page.form.button.register")}
                    isLoading={isLoading}
                />

                <button
                    type="button"
                    onClick={prevStep}
                    className="flex items-center text-indigo-600 font-medium hover:underline"
                >
                    ← {t("register_page.form.button.back")}
                </button>
            </div>
        </form>
    )
};

export default RegisterThirdStepForm;