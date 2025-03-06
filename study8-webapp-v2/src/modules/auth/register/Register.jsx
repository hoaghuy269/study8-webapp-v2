import {t} from "i18next";
import RegisterFirstStepForm from "./RegisterFirstStepForm.jsx";
import RegisterSecondStepForm from "./RegisterSecondStepForm.jsx";
import {useState} from "react";
import RegisterThirdStepForm from "./RegisterThirdStepForm.jsx";
import RegisterSucessForm from "./RegisterSuccessForm.jsx";

const Register = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [id, setId] = useState(null);

    const nextStep = () => setCurrentStep((prev) => prev + 1);
    const prevStep = () => setCurrentStep((prev) => prev - 1);

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-16 h-16 mr-2" src="../../../../public/study8_logo.png" alt="logo" />
                </a>
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            {t("register_page.title")}
                        </h1>
                        {currentStep === 1 && <RegisterFirstStepForm nextStep={nextStep} setId={setId}/>}
                        {currentStep === 2 && <RegisterSecondStepForm nextStep={nextStep} prevStep={prevStep} id={id}/>}
                        {currentStep === 3 && <RegisterThirdStepForm nextStep={nextStep} prevStep={prevStep} id={id}/>}
                        {currentStep === 4 && <RegisterSucessForm/>}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register