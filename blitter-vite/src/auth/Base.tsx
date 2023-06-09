export default function ({ child }) {
  return (
    <div className='flex h-screen bg-gray-50 dark:bg-gray-900 md:px-32 md:py-32'>
      <div className='mx-auto flex w-screen flex-col items-center  justify-center px-8 py-8 md:flex-row'>
        {child}
      </div>
    </div>
  );
}
