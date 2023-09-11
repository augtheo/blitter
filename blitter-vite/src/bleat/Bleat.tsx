import React from "react";
import BleatCard from "../bleat/BleatCard";
import axios from "../utils/axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function Bleat() {
  const { id } = useParams();
  const [bleat, setBleat] = useState({});
  const [bleatReplies, setBleatReplies] = useState([]);

  let headers = {
    "Content-Type": "application/json",
  };

  if (localStorage.getItem("bird-person-web.auth.token")) {
    headers["Authorization"] =
      "Bearer " + localStorage.getItem("bird-person-web.auth.token");
  }
  useEffect(() => {
    window.scrollTo(0, 0);
    const f = async () => {
      try {
        const bleatRes = await axios({
          method: "get",
          url: "/bleats/" + id,
          headers: headers,
        });
        const bleatReplies = await axios({
          method: "get",
          url: "/bleats/" + id + "/reply",
          headers: headers,
        });
        setBleat(bleatRes.data);
        setBleatReplies(bleatReplies.data);
      } catch (error) {
        console.log(error);
      }
    };
    f();
  }, [id]);

  return (
    bleat &&
    bleatReplies && (
      <div className="min-h-screen  grow bg-gray-50 dark:bg-black">
        <BleatCard
          bleat={bleat}
          key={bleat.id}
          setBleats={setBleatReplies}
          isBleatView={true}
        />
        <hr className="mx-auto my-4 h-1 w-48 rounded border-0 bg-gray-100 dark:bg-gray-700 md:my-10" />
        <div>
          {bleatReplies.map((reply) => (
            <BleatCard
              bleat={reply}
              key={reply.id}
              setBleats={setBleatReplies}
            />
          ))}
        </div>
      </div>
    )
  );
}
