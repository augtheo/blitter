import { Fieldv2, Fieldv3, Passwordv2, Passwordv3 } from "../utils/Forms";
import React from "react";
import axios from "../utils/axios";
import Base from "./Base";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RegisterReq, UsersApi } from "../generated-sources/openapi";
import NoAuthApiConfigurationFactory from "../api/NoAuthApiFactory";

export function RegisterBase() {
  const navigate = useNavigate();
  const [registerForm, setRegisterForm] = useState<RegisterReq>({
    name: "",
    password: "",
    username: "",
  });
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const usersApi: UsersApi = new UsersApi(
        new NoAuthApiConfigurationFactory().createApiConfiguration()
      );
      const response = await usersApi.createUser(registerForm);
      if (response.status === 200) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
      <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
          Create an account
        </h1>
        <form
          className="space-y-4 items-center md:space-y-6"
          onSubmit={handleSubmit}
        >
          <Fieldv3
            val={registerForm.name}
            setVal={setRegisterForm}
            name="name"
            lab={"Your Name"}
          />
          <Fieldv3
            val={registerForm.username}
            setVal={setRegisterForm}
            name="username"
            lab={"Your Username"}
          />
          <Passwordv3
            val={registerForm.password}
            setVal={setRegisterForm}
            name="password"
            lab={"Password"}
          />
          <button
            type="submit"
            className="w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          >
            Create an account
          </button>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default function Register() {
  return <Base child={<RegisterBase />} />;
}
