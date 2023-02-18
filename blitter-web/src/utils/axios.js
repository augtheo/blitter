import axios from 'axios';
import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

export function useAxiosNavigation() {
  // https://stackoverflow.com/a/74086922/8674624
  // Use useRef to prevent a re-render in the useEffect.
  // A ref, cannot be used as a useEffect dependency, hence,
  // your linters shouldn't complain about missing dependencies.
  const navRef = useRef(useNavigate());

  useEffect(() => {
    const intercetpor = instance.interceptors.response.use(
      (response) => response,
      (error) => {
        switch (error?.code) {
          case "ERR_NETWORK" :
            navRef.current('/error');
            break;
          default:
        }
        switch (error?.response?.status) {
          case 401:
            navRef.current('/login');
            break;
          default:
        }
        return Promise.reject(error);
      }
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
