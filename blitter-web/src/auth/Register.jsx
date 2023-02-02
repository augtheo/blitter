import axios from '../utils/axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Field, Password } from '../utils/Forms';
import Base from './Base';

export function RegisterBase() {
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const formJson = Object.fromEntries(formData.entries());

    if (formJson.password != formJson.confirmPassword) {
      setMessage('Passwords do not match');
    }
    try {
      const response = await axios({
        method: 'post',
        url: '/author/new',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          username: formJson.username,
          name: formJson.name,
          password: formJson.password,
        },
      });
      if (response.status === 200) {
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0'>
      <div className='space-y-4 p-6 sm:p-8 md:space-y-6'>
        <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl'>
          Create an account
        </h1>
        <form className='space-y-4 md:space-y-6' onSubmit={handleSubmit}>
          <Field val={'name'} lab={'Your Name'} plac={'John Doe'} />
          <Field val={'username'} lab={'Your Username'} plac={'JohnDoe42'} />
          <Password val={'password'} lab={'Password'} />
          <Password val={'confirmPassword'} lab={'Confirm Password'} />
          <div className='flex items-start'>
            <div className='flex h-5 items-center'>
              <input
                id='terms'
                aria-describedby='terms'
                type='checkbox'
                className='focus:ring-3 h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-primary-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600'
                required
              />
            </div>
            <div className='ml-3 text-sm'>
              <label
                htmlFor='terms'
                className='font-light text-gray-500 dark:text-gray-300'>
                I accept the{' '}
                <a
                  className='font-medium text-primary-600 hover:underline dark:text-primary-500'
                  href='#'>
                  Terms and Conditions
                </a>
              </label>
            </div>
          </div>
          <button
            type='submit'
            className='w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'>
            Create an account
          </button>
          <p className='text-sm font-light text-gray-500 dark:text-gray-400'>
            Already have an account?{' '}
            <Link
              to='/login'
              className='font-medium text-primary-600 hover:underline dark:text-primary-500'>
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
