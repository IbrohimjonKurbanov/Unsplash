import React, { useEffect, useState } from "react";
import { Form, useActionData } from "react-router-dom";
import { FormInput } from "../components";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

import { useRegister } from "../hooks/useRegister";
import { toast } from "react-toastify";
export const action = async ({ request }) => {
  const form = await request.formData();
  const displayName = form.get("displayName");
  const email = form.get("email");
  const password = form.get("password");
  const confirmPassword = form.get("confirmPassword");

  if (password == confirmPassword) {
    return { displayName, email, password, confirmPassword };
  } else {
    toast.warn("Password is not equal");
    return null;
  }
};

function Register() {
  const { registerWithGoogle, registerWithEmail } = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const inputData = useActionData();

  useEffect(() => {
    if (inputData) {
      registerWithEmail(
        inputData.displayName,
        inputData.email,
        inputData.password,
      );
    }
  }, [inputData]);

  return (
    <div className="flex h-screen w-full">
      <div className="h-full bg-cover bg-center bg-no-repeat md:w-[40%] md:bg-[url('https://picsum.photos/900/1200')]"></div>
      <div className="flex w-full items-center justify-center bg-[url('https://picsum.photos/900/1200')] bg-cover bg-center bg-no-repeat px-5 md:w-[60%] md:bg-none md:px-0">
        <Form
          method="post"
          className="w-full max-w-[450px] rounded-lg bg-white p-7 shadow-xl"
        >
          <h1 className="mb-5 text-center text-3xl font-medium md:text-4xl">
            Register
          </h1>
          <div className="mb-3 flex flex-col items-center gap-3 md:mb-5 md:gap-5">
            <FormInput type="text" placeholder="Full Name" name="displayName" />
            <FormInput type="email" placeholder="Email" name="email" />
            <FormInput
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
            />
            <FormInput
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              name="confirmPassword"
            />
          </div>
          <div className="block items-center justify-center sm:flex sm:justify-between">
            <div className="mb-3 flex items-center justify-center select-none sm:mb-0 sm:justify-start">
              <input
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
                id="check"
                type="checkbox"
                className="checkbox checkbox-md checkbox-primary"
              />

              <label htmlFor="check" className="text-md ml-3 block">
                Show password
              </label>
            </div>
            <p className="cursor-pointer text-center hover:underline md:text-right">
              Forgot password?
            </p>
          </div>
          <div className="my-5 flex flex-col gap-5 md:flex-row">
            <button
              type="submit"
              className="btn btn-primary btn-sm md:btn-md grow text-white"
            >
              Register
            </button>
            <button
              onClick={registerWithGoogle}
              type="button"
              className="btn btn-secondary btn-sm md:btn-md grow text-white"
            >
              <FcGoogle className="h-6 w-6" />
              <span>Google</span>
            </button>
          </div>

          <p className="cursor-pointer text-center">
            Already have an account?
            <Link
              to="/login"
              className="link link-primary font-medium text-blue-600"
            >
              Login here
            </Link>
          </p>
        </Form>
      </div>
    </div>
  );
}

export default Register;
