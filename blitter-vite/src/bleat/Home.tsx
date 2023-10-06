import React, { useEffect, useState } from "react";
import BleatList from "./BleatList";
import PublishBleat from "./PublishBleat";
import { getApiConfigurationFactory } from "../api/FactoryProvider";
import { BleatRes, BleatsApi } from "../generated-sources/openapi";
import { useSearchParams } from "react-router-dom";
import { BLITTER_APP_BLEAT_MAX_PAGES } from "../utils/constant";

export default function Home({ followingOnly }) {
  const [publishedBleat, setPublishedBleat] = useState({});
  const [bleats, setBleats] = useState<BleatRes[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1"),
  );

  const configuration = getApiConfigurationFactory();
  const bleatsApiAuth: BleatsApi = new BleatsApi(configuration);
  useEffect(() => {
    if (Object.keys(publishedBleat).length !== 0)
      setBleats((prevBleats) => [publishedBleat, ...prevBleats]);
  }, [publishedBleat]);

  useEffect(() => {
    (async () => {
      try {
        const response = await bleatsApiAuth.getBleats(
          currentPage - 1,
          BLITTER_APP_BLEAT_MAX_PAGES,
          followingOnly,
        );

        if (response.status === 200) {
          setTotalResults(response.data.total_bleats);
          setTotalPages(response.data.total_pages);
          setBleats(response.data.bleats);
        }
      } catch (error) {
        console.error(error);
      }
    })();
  }, [currentPage, followingOnly]);

  return (
    <>
      <PublishBleat setPublishBleat={setPublishedBleat} />
      <BleatList
        bleats={bleats}
        setBleats={setBleats}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        totalResults={totalResults}
      />
    </>
  );
}
