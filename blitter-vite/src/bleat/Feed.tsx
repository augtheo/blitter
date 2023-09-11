import React from "react";
import PaginationFooter from "../PaginationFooter";
import axios from "../utils/axios";
import BleatList from "./BleatList";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

function PublishBleat({ setSomeBleat }) {
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const formJson = Object.fromEntries(formData.entries());

      let headers = {
        "Content-Type": "application/json",
      };

      if (localStorage.getItem("bird-person-web.auth.token")) {
        headers["Authorization"] =
          "Bearer " + localStorage.getItem("bird-person-web.auth.token");
      }
      const response = await axios({
        method: "post",
        url: "/bleats",
        headers: headers,
        data: {
          message: formJson.postContents,
        },
      });

      if (response.status === 200) {
        setSomeBleat(response.data);
        event.target.reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grow items-center justify-center bg-gray-50 p-4 dark:bg-black">
      <form
        className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-800"
        onSubmit={handleSubmit}
      >
        <div className="mb-2 w-full rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700">
          <div className="flex items-center justify-between border-b px-3 py-2 dark:border-gray-600">
            <button
              type="button"
              className="cursor-pointer rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Upload image</span>
            </button>
          </div>
          <div className="rounded-b-lg bg-white px-4 py-2 dark:bg-gray-800">
            <label htmlFor="editor" className="sr-only">
              Publish post
            </label>
            <textarea
              id="editor"
              name="postContents"
              rows="8"
              className="block w-full border-0 bg-white px-0 text-sm text-gray-800 focus:ring-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
              placeholder="Write a bleat ..."
              required
            ></textarea>
          </div>
        </div>
        <button
          type="submit"
          className="inline-flex items-center rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900"
        >
          Publish post
        </button>
      </form>
    </div>
  );
}

export default function Feed() {
  const [someBleat, setSomeBleat] = useState({});
  const [bleats, setBleats] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(searchParams.get("page") | 1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  useEffect(() => {
    if (Object.keys(someBleat).length !== 0)
      setBleats((prevBleats) => [someBleat, ...prevBleats]);
  }, [someBleat]);
  return (
    <div className="flex min-h-screen grow flex-col">
      <div className="grow bg-gray-50 dark:bg-black">
        <PublishBleat setSomeBleat={setSomeBleat} />
        <BleatList
          bleats={bleats}
          setBleats={setBleats}
          currentPage={searchParams.get("page") || 1}
          setTotalResults={setTotalResults}
          setTotalPages={setTotalPages}
        />
      </div>
      <PaginationFooter
        currentPage={searchParams.get("page") || 1}
        totalPages={totalPages}
        totalResults={totalResults}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
