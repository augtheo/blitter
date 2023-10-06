import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {
  AuthorRes,
  BleatRes,
  BleatsApi,
  UsersApi,
} from "../generated-sources/openapi";
import { getApiConfigurationFactory } from "../api/FactoryProvider";
import BleatList from "../bleat/BleatList";
import { BLITTER_APP_BLEAT_PAGE_SIZE } from "../utils/constant";
import Hr from "../components/Hr";
import { classNames } from "../utils/utils";

function Follow({ author }) {
  const [isFollowing, setIsFollowing] = useState<Boolean>(author.following);
  const configuration = getApiConfigurationFactory();
  const usersApi: UsersApi = new UsersApi(configuration);

  const toggle = async (event) => {
    try {
      event.preventDefault();
      if (isFollowing) {
        await usersApi.unfollowUser(author.username);
        setIsFollowing(false);
      } else {
        await usersApi.followUser(author.username);
        setIsFollowing(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const currentUser = localStorage.getItem("currentUser");
  if (currentUser === author.username) return <></>;
  else
    return (
      <button
        className={classNames(
          "inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white  rounded-lg focus:ring-4",
          isFollowing
            ? "bg-red-700  focus:ring-red-200 dark:focus:ring-red-900 hover:bg-red-800"
            : "bg-primary-700 focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800",
        )}
        type="submit"
        onClick={toggle}
      >
        {isFollowing ? `Unfollow` : `Follow`}
      </button>
    );
}

function UserCard({ author }: { author: AuthorRes }) {
  return (
    <div className="flex flex-col p-4">
      <div className="rounded-xl border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-800">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <img className="h-11 w-11 rounded-full" src={author.profileUrl} />
            <div className="ml-1.5 text-sm leading-tight">
              <span className="block font-bold text-black dark:text-white">
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
  );
}

export default function User() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [author, setAuthor] = useState<AuthorRes>({});
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
    (async () => {
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
    })();
  }, [id]);

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      try {
        if (id != undefined) {
          const bleatsByUserRes = await usersApi.getBleatsByAuthor(
            id,
            currentPage - 1,
            BLITTER_APP_BLEAT_PAGE_SIZE,
          );
          if (bleatsByUserRes.status === 200) {
            setBleatsByAuthor(bleatsByUserRes.data.bleats);
            setTotalResults(bleatsByUserRes.data.total_bleats);
            setTotalPages(bleatsByUserRes.data.total_pages);
          }
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, [currentPage]);

  return (
    author &&
    bleatsByAuthor && (
      <>
        <UserCard author={author} />
        <Hr />
        <BleatList
          bleats={bleatsByAuthor}
          setBleats={setBleatsByAuthor}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          totalResults={totalResults}
        />
      </>
    )
  );
}
