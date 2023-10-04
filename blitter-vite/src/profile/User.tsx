import React from "react";
import axios from "../utils/axios";
import { useState } from "react";
import { useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {
  BleatRes,
  BleatsApi,
  PaginatedBleats,
  UsersApi,
} from "../generated-sources/openapi";
import JwtAuthApiConfigurationFactory from "../api/JwtAuthApiConfigurationFactory";
import { getApiConfigurationFactory } from "../api/FactoryProvider";
import BleatList from "../bleat/BleatList";
import { BLITTER_APP_BLEAT_PAGE_SIZE } from "../utils/constant";

function Follow({ author }) {
  const [isFollowing, setIsFollowing] = useState(author.following);
  const configuration = getApiConfigurationFactory();
  const usersApi: UsersApi = new UsersApi(configuration);

  const toggle = (action) => {
    const handleFollowUnfollow = async (event) => {
      try {
        event.preventDefault();
        const response = await usersApi.followUser(author.username);
        setIsFollowing((isFollowing) => !isFollowing);
      } catch (error) {
        console.log(error);
      }
    };
    return handleFollowUnfollow;
  };

  const currentUser = localStorage.getItem("currentUser");
  if (currentUser === author.username) return <></>;
  else if (isFollowing)
    return (
      <button
        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-red-700 rounded-lg focus:ring-4 focus:ring-red-200 dark:focus:ring-red-900 hover:bg-red-800"
        type="submit"
        onClick={toggle("unfollow")}
      >
        Unfollow
      </button>
    );
  else
    return (
      <button
        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
        type="submit"
        onClick={toggle("follow")}
      >
        Follow
      </button>
    );
}

function UserCard({ author, setAuthor }) {
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

export default function User() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [author, setAuthor] = useState({});
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1"),
  );
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [bleatsByAuthor, setBleatsByAuthor] = useState<BleatRes[]>([]);

  const configuration = getApiConfigurationFactory();
  const usersApi: UsersApi = new UsersApi(configuration);
  const bleatsApiAuth: BleatsApi = new BleatsApi(configuration);

  useEffect(() => {
    window.scrollTo(0, 0);
    const f = async () => {
      try {
        if (id != undefined) {
          const authorRes = await usersApi.getAuthor(id);
          const bleatsByUserRes = await usersApi.getBleatsByAuthor(
            id,
            currentPage - 1,
            BLITTER_APP_BLEAT_PAGE_SIZE,
          );
          setAuthor(authorRes.data);
          if (bleatsByUserRes.status === 200) {
            setBleatsByAuthor(bleatsByUserRes.data.bleats);
            setTotalResults(bleatsByUserRes.data.total_bleats);
            setTotalPages(bleatsByUserRes.data.total_pages);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    f();
  }, [id]);
  return (
    bleatsByAuthor && (
      <div className="min-h-screen  grow ">
        <UserCard author={author} setAuthor={setAuthor} key={author.id} />
        <hr className="mx-auto my-4 h-1 w-48 rounded border-0 bg-gray-100 dark:bg-gray-700 md:my-10" />
        <BleatList
          bleats={bleatsByAuthor}
          setBleats={setBleatsByAuthor}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          totalResults={totalResults}
        />
      </div>
    )
  );
}
