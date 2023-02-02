import { Link } from 'react-router-dom';

export default function FourZeroFour() {
  return (
    <div class='h-screen bg-white dark:bg-gray-900'>
      <div class='mx-auto max-w-screen-xl py-8 px-4 lg:py-16 lg:px-6'>
        <div class='mx-auto max-w-screen-sm text-center'>
          <h1 class='mb-4 text-7xl font-extrabold tracking-tight text-primary-600 dark:text-primary-500 lg:text-9xl'>
            404
          </h1>
          <p class='mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl'>
            Something's missing.
          </p>
          <p class='mb-4 text-lg font-light text-gray-500 dark:text-gray-400'>
            Sorry, we can't find that page. You'll find lots to explore on the
            home page.{' '}
          </p>
          <Link
            to='/home'
            className='my-4 inline-flex rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900'>
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}
