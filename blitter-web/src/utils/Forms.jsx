export function Field({ val, lab, plac }) {
  return (
    <div>
      <label
        htmlFor={val}
        className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
        {lab}
      </label>
      <input
        type='text'
        name={val}
        id={val}
        className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm'
        placeholder={plac}
        required
      />
    </div>
  );
}
export function Password({ val, lab }) {
  return (
    <div>
      <label
        htmlFor={val}
        className='mb-2 block text-sm font-medium text-gray-900 dark:text-white'>
        {lab}
      </label>
      <input
        type='password'
        name={val}
        id={val}
        placeholder='••••••••'
        className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm'
        required
      />
    </div>
  );
}
