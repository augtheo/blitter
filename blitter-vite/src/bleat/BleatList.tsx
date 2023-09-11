import React from "react";
import axios from "../utils/axios";
import BleatCard from "./BleatCard";
import { useEffect } from "react";

export default function BleatList({
  // authRequired,
  bleats,
  setBleats,
  currentPage,
  setTotalResults,
  setTotalPages,
}) {
  const reqUrl = "/bleats";
  let headers = {
    "Content-Type": "application/json",
  };

  if (localStorage.getItem("bird-person-web.auth.token")) {
    headers["Authorization"] =
      "Bearer " + localStorage.getItem("bird-person-web.auth.token");
  }

  useEffect(() => {
    const f = async () => {
      try {
        const response = await axios({
          method: "get",
          url: reqUrl,
          params: {
            page: currentPage - 1,
            per_page: 10,
          },
          headers: headers,
        });
        // console.log(currentPage);
        setTotalResults(response.data.total_bleats);
        setTotalPages(response.data.total_pages);
        setBleats(response.data.bleats);
      } catch (error) {
        console.log(error);
      }
    };
    f();
  }, [currentPage]);

  return (
    bleats &&
    bleats.map((bleat) => {
      return (
        <BleatCard
          bleat={bleat}
          key={bleat.id}
          setBleats={setBleats}
          isBleatView={false}
        />
      );
    })
  );
}
