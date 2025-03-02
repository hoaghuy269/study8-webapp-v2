import {useForm} from "react-hook-form";
import InputField from "../../../components/field/InputField.jsx";
import {EMAIL_PATTERN} from "../../../constants/validation.js";
import {t} from "i18next";
import authService from "../services/AuthService.jsx";
import {useToast} from "../../../context/ToastContext.jsx";

const LoginForm = () => {
    const { addToast } = useToast();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        console.log("Form Data:", data);

        try {
            const response = await authService.login(data.email, data.password);
            console.log("Login successful:", response);
        } catch (error) {
            addToast(error.message, "error");
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
            <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300
               font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
                {t("login_page.form.button.login")}
            </button>


            {/* Register Link */}
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                {t("login_page.form.text.dont_have_account")}
                <a href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                    {t("login_page.form.button.register")}
                </a>
            </p>
        </form>
    )
};

export default LoginForm;