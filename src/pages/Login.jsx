import React, { useState, useEffect } from "react";
import { Form, Link } from "react-router-dom";
import { FormInput, Modal } from "../components";
import { FcGoogle } from "react-icons/fc";
import { useActionData } from "react-router-dom";
import { useRegister } from "../hooks/useRegister";
import { useLogin } from "../hooks/useLogin";
export const action = async ({ request }) => {
  const form = await request.formData();
  const email = form.get("email");
  const password = form.get("password");
  const emailForReset = form.get("email_for_reset");

  if (emailForReset?.trim()) {
    return { emailForReset };
  }

  return { email, password };
};
function Login() {
  const { registerWithGoogle } = useRegister();
  const { loginWithEmail } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const inputData = useActionData();

  useEffect(() => {
    if (inputData?.email && inputData?.password) {
      loginWithEmail(inputData.email, inputData.password);
    }
  }, [inputData]);
  return (
    <>
      <Modal />
      <div className="flex h-screen w-full">
        <div className="bg-cover bg-center bg-no-repeat md:w-[40%] md:bg-[url('https://picsum.photos/900/1200')]"></div>
        <div className="flex w-full items-center justify-center bg-[url('https://picsum.photos/900/1200')] bg-cover bg-center bg-no-repeat px-5 md:w-[60%] md:bg-none md:px-0">
          <Form
            method="post"
            className="w-full max-w-[450px] rounded-lg p-7 shadow-xl"
          >
            <h1 className="mb-5 text-center text-3xl font-medium md:text-4xl">
              Login
            </h1>
            <div className="mb-3 flex flex-col items-center gap-3 md:mb-5 md:gap-5">
              <FormInput type="email" placeholder="Email" name="email" />
              <FormInput
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
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

                <label
                  htmlFor="check"
                  className="text-md ml-3 block cursor-pointer"
                >
                  Show password
                </label>
              </div>
              <button
                type="button"
                className="cursor-pointer text-center hover:underline md:text-right"
                onClick={() =>
                  document.getElementById("my_modal_1").showModal()
                }
              >
                Forgot password?
              </button>
            </div>
            <div className="my-5 flex flex-col gap-5 md:flex-row">
              <button
                type="submit"
                onClick={loginWithEmail}
                className="btn btn-primary btn-sm md:btn-md grow text-white"
              >
                Login
              </button>
              <button
                type="button"
                onClick={registerWithGoogle}
                className="btn btn-secondary btn-sm md:btn-md grow text-white"
              >
                <FcGoogle className="h-6 w-6" />
                <span>Google</span>
              </button>
            </div>

            <p className="cursor-pointer text-center">
              Don’t have an account yet?
              {"     "}
              <Link
                to="/register"
                className="link link-primary font-medium text-blue-600"
              >
                Register here
              </Link>
            </p>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Login;
