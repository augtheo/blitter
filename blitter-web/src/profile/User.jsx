
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function User() {
  const {id} = useParams()
  const [author_name , setAuthorName] = useState('name')
  const [author_username , setAuthorUsername] = useState('username')

  return (
   <div className='flex flex-col grow min-h-screen bg-gray-50 p-4 dark:bg-black'>
    <div className=' items-center justify-center '>
      <div className='rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-800'>
        <div className='flex justify-between'>
          <div className='flex items-center'>
            <img
              className='h-11 w-11 rounded-full'
              src='https://pbs.twimg.com/profile_images/1287562748562309122/4RLk5A_U_x96.jpg'
            />
            <div className='ml-1.5 text-sm leading-tight'>
              <span className='block font-bold text-black dark:text-white '>
                {author_name}
              </span>
              <span className='block font-normal text-gray-500 dark:text-gray-400'>
                @{author_username}
              </span>
            </div>
          </div>

        </div>

      </div>
    </div>
    </div>
  );
}
