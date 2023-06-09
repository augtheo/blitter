import axios from "../utils/axios";
import BleatCard from "../bleat/BleatCard";
import { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function UserCard({ author }) {
  return (
    <div className="flex grow flex-col bg-gray-50 p-4 dark:bg-black">
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
            <button
              className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-primary-700 rounded-lg focus:ring-4 focus:ring-primary-200 dark:focus:ring-primary-900 hover:bg-primary-800"
              type="submit"
            >
              Follow
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function User() {
  const { id } = useParams();
  const [author, setAuthor] = useState({});
  const [bleatsByAuthor, setBleatsByAuthor] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    const f = async () => {
      try {
        const authorRes = await axios({
          method: "get",
          url: "/users/" + id,
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer " + localStorage.getItem("bird-person-web.auth.token"),
          },
        });

        const bleatsByUser = await axios({
          method: "get",
          url: "/users/" + id + "/bleats",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer " + localStorage.getItem("bird-person-web.auth.token"),
          },
        });

        setAuthor(authorRes.data);
        setBleatsByAuthor(bleatsByUser.data);
      } catch (error) {
        console.log(error);
      }
    };
    f();
  }, [id]);
  return (
    bleatsByAuthor && (
      <div className="min-h-screen  grow bg-gray-50 dark:bg-black">
        <UserCard author={author} key={author.id} />
        <hr className="mx-auto my-4 h-1 w-48 rounded border-0 bg-gray-100 dark:bg-gray-700 md:my-10" />
        <div>
          {bleatsByAuthor.map((bleat) => (
            <BleatCard
              bleat={bleat}
              key={bleat.id}
              setBleats={setBleatsByAuthor}
            />
          ))}
        </div>
      </div>
    )
  );
}
