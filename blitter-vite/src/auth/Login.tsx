import React, { useState } from "react";
import { Fieldv3, Passwordv3 } from "../utils/Forms";
import axios from "../utils/axios";
import Base from "./Base";
import { Link, useNavigate } from "react-router-dom";
import { AlertMessage } from "../alerts";

import { AuthenticationApi, Configuration } from "../generated-sources/openapi";

type LoginForm = {
  username: string;
  password: string;
};

export function LoginBase({ alertMessages, setAlertMessages }) {
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(loginForm);
    try {
      const configuration = new Configuration({
        basePath: import.meta.env.VITE_APP_API_URL,
        username: loginForm.username,
        password: loginForm.password,
      });
      const authApi = new AuthenticationApi(configuration);
      const response = await authApi.authPost();
      console.log(response);
      if (response.status === 200 && response.data.jwt != null) {
        localStorage.setItem("blitter.auth.token", response.data.jwt);
        localStorage.setItem("currentUser", loginForm.username);
        const alertMessage: AlertMessage = {
          hidden: false,
          color: "success",
          message: {
            title: "Successfully logged in",
            content: localStorage.getItem("currentUser") || "Anonymous",
          },
        };
        setAlertMessages([alertMessage]);
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const [loginForm, setLoginForm] = useState<LoginForm>({
    username: "",
    password: "",
  });
  return (
    <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
      <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
          Login
        </h1>
        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
          <Fieldv3
            val={loginForm.username}
            setVal={setLoginForm}
            name="username"
            lab={"Username"}
          />
          <Passwordv3
            val={loginForm.password}
            setVal={setLoginForm}
            name="password"
            lab={"Password"}
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Login
          </button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default function Login({ alertMessages, setAlertMessages }) {
  return (
    <Base
      child={
        <LoginBase
          alertMessages={alertMessages}
          setAlertMessages={setAlertMessages}
        />
      }
    />
  );
}
