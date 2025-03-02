import InputField from "../../../components/field/InputField.jsx";
import {t} from "i18next";
import {EMAIL_PATTERN} from "../../../constants/validation.js";
import {useForm} from "react-hook-form";
import SubmitButton from "../../../components/button/SubmitButton.jsx";
import {useState} from "react";
import CheckboxField from "../../../components/field/CheckboxField.jsx";

const RegisterSecondStepForm = ({ nextStep }) => {
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        console.log("Form Data:", data);
        nextStep();
    };

    return (
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>

            {/* Submit Button */}
            <SubmitButton
                label={t("register_page.form.button.register")}
                isLoading={isLoading}
            />
        </form>
    )
};

export default RegisterSecondStepForm;