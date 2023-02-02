import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';

function Page({ val }) {
  return (
    <a
      href='#'
      className='relative inline-flex items-center border  border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50 focus:z-20 dark:bg-gray-800'>
      {val}
    </a>
  );
}

function RoundedPage({ val }) {
  return (
    <a
      href='#'
      className='relative inline-flex items-center rounded-md border  border-gray-300 bg-white px-4 py-2 text-sm font-medium hover:bg-gray-50 focus:z-20 dark:bg-gray-800'>
      {val}
    </a>
  );
}

export default function PaginationFooter() {
  return (
    <div className='flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 text-gray-500 dark:bg-gray-900 dark:text-white sm:px-6'>
      <div className='flex flex-1 justify-between sm:hidden'>
        {['Previous', 'Next'].map((val) => (
          <RoundedPage val={val} key={val} />
        ))}
      </div>
      <div className='hidden sm:flex sm:flex-1 sm:items-center sm:justify-between'>
        <div>
          <p className='text-sm'>
            Showing <span className='font-medium'>1</span> to{' '}
            <span className='font-medium'>10</span> of{' '}
            <span className='font-medium'>97</span> results
          </p>
        </div>
        <div>
          <nav
            className='isolate inline-flex -space-x-px rounded-md shadow-sm '
            aria-label='Pagination'>
            <a
              href='#'
              className='relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 dark:bg-gray-800'>
              <span className='sr-only'>Previous</span>
              <ChevronLeftIcon className='h-5 w-5' aria-hidden='true' />
            </a>
            {[1, 2, 3].map((val) => (
              <Page val={val} key={val} />
            ))}
            <span className='relative inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium dark:bg-gray-800 '>
              ...
            </span>
            {[8, 9, 10].map((val) => (
              <Page val={val} key={val} />
            ))}

            <a
              href='#'
              className='relative inline-flex items-center rounded-r-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-20 dark:bg-gray-800'>
              <span className='sr-only'>Next</span>
              <ChevronRightIcon className='h-5 w-5' aria-hidden='true' />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
