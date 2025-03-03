import {t} from "i18next";
import {EMAIL_PATTERN, PASSWORD_PATTERN} from "../../../constants/validation.js";
import {useForm} from "react-hook-form";
import SubmitButton from "../../../components/button/SubmitButton.jsx";
import {useState} from "react";
import CheckboxField from "../../../components/field/CheckboxField.jsx";
import authService from "../services/AuthService.jsx";
import {useToast} from "../../../hook/useToast.js";
import InputField from "../../../components/field/InputField.jsx";
import InfoInputField from "../../../components/field/InfoInputField.jsx";
import SelectField from "../../../components/field/SelectField.jsx";

const RegisterThirdStepForm = ({ nextStep, setId }) => {
    const { addToast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        console.log("Form Data:", data);
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
                    required: t("login_page.form.email.validation.required")
                }}
            />

            {/* Role Select */}
            <SelectField
                id="role"
                label={t("register_page.form.role.label")}
                options={[
                    { value: "teacher", label: t("register_page.form.role.teacher") },
                    { value: "student", label: t("register_page.form.role.student") }
                ]}
                register={register}
                errors={errors}
                validation={{ required: t("register_page.form.role.validation.required") }}
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
                    pattern: {
                        value: PASSWORD_PATTERN,
                        message: t("register_page.form.password.validation.pattern"),
                    },
                }}
            />


            {/* Submit Button */}
            <SubmitButton
                label={t("register_page.form.button.register")}
                isLoading={isLoading}
            />
        </form>
    )
};

export default RegisterThirdStepForm;