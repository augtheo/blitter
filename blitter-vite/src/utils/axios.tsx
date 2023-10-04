import React from "react";
import axios from "axios";
import { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import globalAxios from "axios";

const instance = globalAxios;

export function useAxiosNavigation() {
  // https://stackoverflow.com/a/74086922/8674624
  // Use useRef to prevent a re-render in the useEffect.
  // A ref, cannot be used as a useEffect dependency, hence,
  // your linters shouldn't complain about missing dependencies.
  const navRef = useRef(useNavigate());

  useEffect(() => {
    const intercetpor = instance.interceptors.response.use(
      (response) => {
        console.log(response);
        return response;
      },
      (error) => {
        switch (error?.code) {
          case "ERR_NETWORK":
            navRef.current("/error");
            break;
          default:
        }
        switch (error?.response?.status) {
          case 401:
            localStorage.removeItem("blitter.auth.token");
            navRef.current("/login");
            break;
          default:
        }
        return Promise.reject(error);
      },
    );
    return () => {
      axios.interceptors.response.eject(intercetpor);
    };
  }, []);
}

export function AxiosNavigation() {
  useAxiosNavigation();
  return <></>;
}

export default instance;
