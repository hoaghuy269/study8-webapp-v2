import {t} from "i18next";
import {EMAIL_PATTERN} from "../../../constants/validation.js";
import {useForm} from "react-hook-form";
import SubmitButton from "../../../components/button/SubmitButton.jsx";
import {useState} from "react";
import CheckboxField from "../../../components/field/CheckboxField.jsx";
import authService from "../services/AuthService.jsx";
import {useToast} from "../../../hook/useToast.js";

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

            {/* Submit Button */}
            <SubmitButton
                label={t("register_page.form.button.register")}
                isLoading={isLoading}
            />
        </form>
    )
};

export default RegisterThirdStepForm;