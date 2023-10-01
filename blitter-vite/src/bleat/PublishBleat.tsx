import { PhotoIcon } from "@heroicons/react/24/outline";
import React from "react";
import { BleatReq, BleatsApi } from "../generated-sources/openapi";
import JwtAuthApiConfigurationFactory from "../api/JwtAuthApiConfigurationFactory";

export default function PublishBleat({ setPublishBleat }) {
  const bleatsApi: BleatsApi = new BleatsApi(
    new JwtAuthApiConfigurationFactory().createApiConfiguration()
  );
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      const formJson = Object.fromEntries(formData.entries());

      // let headers = {
      //   "Content-Type": "application/json",
      // };

      // if (localStorage.getItem("blitter.auth.token")) {
      //   headers["Authorization"] =
      //     "Bearer " + localStorage.getItem("blitter.auth.token");
      // }
      const bleatReq: BleatReq = {
        message: formJson.postContents.toString(),
      };
      const response = await bleatsApi.postBleat(bleatReq);
      // const response = await axios({
      //   method: "post",
      //   url: "/bleats",
      //   headers: headers,
      //   data: {
      //     message: formJson.postContents,
      //   },
      // });

      if (response.status === 200) {
        setPublishBleat(response.data);
        event.target.reset();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      className="space-y-4 items-center justify-center rounded-xl p-4"
      onSubmit={handleSubmit}
    >
      <div className="w-full rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700">
        <div className="flex items-center justify-between border-b px-3 py-2 dark:border-gray-600">
          <button
            type="button"
            className="cursor-pointer rounded p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <PhotoIcon className="h-5 w-5" aria-hidden="true" />
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
            className="block w-full border-0 bg-white px-0 text-sm text-gray-800 focus:ring-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
            placeholder="Write a bleat ..."
            required
          ></textarea>
        </div>
      </div>
      <button
        type="submit"
        className="inline-flex items-center rounded-lg bg-blue-700 p-2 text-center text-sm font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900"
      >
        Publish post
      </button>
    </form>
  );
}
