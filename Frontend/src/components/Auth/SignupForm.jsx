import { useState } from "react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { CiLock, CiUnlock } from "react-icons/ci";
import axios from "axios";
import Loader from "../loader/Loader";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [isLottieLoading, setIsLottieLoading] = useState(true);

  const fields = [
    {
      id: "name",
      type: "text",
      placeholder: "Name",
    },
    {
      id: "email",
      type: "email",
      placeholder: "Email Address",
    },
    {
      id: "password",
      type: "password",
      placeholder: "Password",
      icon: showPassword ? (
        <CiUnlock className="text-black text-2xl" />
      ) : (
        <CiLock className="text-black text-2xl" />
      ),
    },
    {
      id: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      icon: showConfirmPassword ? (
        <CiUnlock className="text-black text-2xl" />
      ) : (
        <CiLock className="text-black text-2xl" />
      ),
    },
  ];

  const togglePasswordVisibility = (fieldId) => {
    if (fieldId === "password") setShowPassword((prev) => !prev);
    if (fieldId === "confirmPassword") setShowConfirmPassword((prev) => !prev);
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/signup`,
        {
          name: values.name,
          email: values.email,
          password: values.password,
        }
      );
      localStorage.setItem("token", response.data.token);
      navigate("/cars");
    } catch (error) {
      console.error(
        error.response?.data?.error || "An error occurred during signup"
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="h-screen flex flex-col items-center pt-4 bg-gradient-to-bl from-white to-white">
      <div className="flex flex-col w-full px-8 md:px-32 lg:px-24 justify-center items-center h-full">
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, values, isSubmitting }) => (
            <div className="flex w-fit p-2 rounded-lg justify-center gap-x-3 lg:gap-x-16 bg-gradient-to-br from-slate-50 to-green-50 ring-1 ring-green-50">
              <Form className="bg-gradient-to-br from-[#eefffa] to-[#e2f3ff] rounded-md ring-1 ring-lime-200 p-5 w-[22rem] lsm:w-[26rem] lg:w-[26rem]">
                <h1 className="text-slate-600 font-onest tracking-wider font-bold text-2xl mb-12 text-center">
                  Sign Up
                </h1>
                <div className="grid gap-3">
                  {fields.map(({ id, type, placeholder, icon }) => (
                    <div
                      key={id}
                      className="flex items-center mb-5 rounded-lg relative group"
                    >
                      {icon && (
                        <span
                          onClick={() => togglePasswordVisibility(id)}
                          className="cursor-pointer absolute right-3 text-black"
                        >
                          {icon}
                        </span>
                      )}
                      <Field
                        id={id}
                        name={id}
                        type={
                          id === "password"
                            ? showPassword
                              ? "text"
                              : "password"
                            : id === "confirmPassword"
                            ? showConfirmPassword
                              ? "text"
                              : "password"
                            : type
                        }
                        className={`w-full bg-white pl-3 pr-10 text-slate-900 border-none outline-none focus:outline-none rounded-lg py-2.5 ${
                          values[id] ? "ring-1 ring-cyan-400" : ""
                        } transition-all hover:ring-blue-300 ring-1 ring-blue-100 peer`}
                      />
                      <label
                        htmlFor={id}
                        className={`absolute transition-all left-4 text-slate-800 text-[15px] ${
                          values[id]
                            ? "left-2 -top-[1.1rem] text-xs font-bold text-slate-600"
                            : "top-1/2 -translate-y-1/2"
                        }`}
                      >
                        {placeholder}
                      </label>
                      {errors[id] && touched[id] && (
                        <div className="text-red-500 text-sm absolute -bottom-[1.1rem] right-2">
                          {errors[id]}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex flex-col items-center space-y-10">
                  <div className="flex items-center justify-between mt-3 px-2 text-slate-500 w-full">
                    <span>Already have an account?</span>
                    <Link
                      to="/login"
                      className="px-2 rounded-lg hover:underline font-onest"
                    >
                      Login
                    </Link>
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center justify-center gap-x-2 mt-4 py-2 rounded-lg bg-[#eef9ff] ring-1 ring-blue-100 hover:ring-0 hover:bg-blue-200 active:scale-95 transition-all duration-200 text-slate-500 hover:text-indigo-600 font-semibold font-mavenPro tracking-wider w-1/2"
                  >
                    SignUp
                    {isSubmitting && <Loader width="w-4" />}
                  </button>
                </div>
              </Form>

              {isLottieLoading && (
                <div className=" hidden md:flex items-center justify-center pr-10 w-[20rem] lg:w-[25rem]">
                  <Loader width="w-10" />
                </div>
              )}

              <iframe
                src="https://lottie.host/embed/db689947-eadf-4366-8580-774883f23e7f/pRnRZ8YKSx.json"
                className={`hidden ${
                  !isLottieLoading ? "md:block" : ""
                } pr-10 w-[20rem] lg:w-[25rem]`}
                onLoad={() => setIsLottieLoading(false)}
              />
            </div>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default SignUpPage;
