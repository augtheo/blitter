import React, { useEffect, useState } from "react";
import BleatList from "./BleatList";
import PublishBleat from "./PublishBleat";

export default function Home({
  followingOnly,
  searchParams,
  setTotalPages,
  setTotalResults,
}) {
  const [publishedBleat, setPublishedBleat] = useState({});
  const [bleats, setBleats] = useState([]);

  useEffect(() => {
    if (Object.keys(publishedBleat).length !== 0)
      setBleats((prevBleats) => [publishedBleat, ...prevBleats]);
  }, [publishedBleat]);

  return (
    <>
      <PublishBleat setPublishBleat={setPublishedBleat} />
      <BleatList
        followingOnly={followingOnly}
        bleats={bleats}
        setBleats={setBleats}
        currentPage={searchParams.get("page") || 1}
        setTotalResults={setTotalResults}
        setTotalPages={setTotalPages}
      />
    </>
  );
}
