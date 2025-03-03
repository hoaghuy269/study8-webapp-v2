import {useForm} from "react-hook-form";
import InputField from "../../../components/field/InputField.jsx";
import {EMAIL_PATTERN} from "../../../constants/validation.js";
import {t} from "i18next";
import authService from "../services/AuthService.jsx";
import {useToast} from "../../../hook/useToast.js";
import SubmitButton from "../../../components/button/SubmitButton.jsx";
import {useState} from "react";
import {Link} from "react-router-dom";
import ROUTES from "../../../constants/routes.js";

const LoginForm = () => {
    const { addToast } = useToast();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        console.log("Form Data:", data);
        setIsLoading(true);

        try {
            const response = await authService.login(data.email, data.password);
            console.log("Login successful:", response);
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
                placeholder={t("login_page.form.email.placeholder")}
                register={register}
                errors={errors}
                validation={{
                    required: t("login_page.form.email.validation.required"),
                    pattern: {
                        value: EMAIL_PATTERN,
                        message: t("login_page.form.email.validation.pattern"),
                    },
                }}
            />

            {/* Password Input */}
            <InputField
                id="password"
                label={t("login_page.form.password.label")}
                type="password"
                placeholder={t("login_page.form.password.placeholder")}
                register={register}
                errors={errors}
                validation={{
                    required: t("login_page.form.password.validation.required"),
                }}
            />

            {/* Remember Me & Forgot Password */}
            <div className="flex justify-end">
                <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">
                    {t("login_page.form.button.forgot_password")}
                </a>
            </div>

            {/* Submit Button */}
            <SubmitButton
                label={t("login_page.form.button.login")}
                isLoading={isLoading}
            />

            {/* Register Link */}
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                {t("login_page.form.text.dont_have_account")}
                <Link to={ROUTES.REGISTER} className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                    {t("login_page.form.button.register")}
                </Link>
            </p>
        </form>
    )
};

export default LoginForm;