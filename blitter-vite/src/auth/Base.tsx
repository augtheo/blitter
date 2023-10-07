import React from "react";
import Logo from "../components/Logo";
export default function ({ child }) {
  return (
    <div className="flex flex-col items-center px-8 justify-center bg-gray-50 dark:bg-gray-900 sm:px-32 py-44">
      {child}
    </div>
  );
}
