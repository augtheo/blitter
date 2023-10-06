import React from "react";

export default function UserCard({ author, setAuthor }) {
  return (
    <div className="flex grow flex-col p-4">
      <div className=" items-center justify-center ">
        <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-800">
          <div className="flex justify-between">
            <div className="flex items-center">
              <img className="h-11 w-11 rounded-full" src={author.profileUrl} />
              <div className="ml-1.5 text-sm leading-tight">
                <span className="block font-bold text-black dark:text-white ">
                  {author.name}
                </span>
                <span className="block font-normal text-gray-500 dark:text-gray-400">
                  @{author.username}
                </span>
              </div>
            </div>
            <Follow author={author} />
          </div>
        </div>
      </div>
    </div>
  );
}
