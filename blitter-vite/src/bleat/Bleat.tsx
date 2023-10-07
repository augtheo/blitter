import React, { useEffect, useState } from "react";
import BleatCard from "../bleat/BleatCard";
import { useParams, useSearchParams } from "react-router-dom";
import { BleatRes, BleatsApi } from "../generated-sources/openapi";

import BleatList from "./BleatList";
import { BLITTER_APP_BLEAT_PAGE_SIZE } from "../utils/constant";
import Hr from "../components/Hr";
import { getApiConfigurationFactory } from "../api/FactoryProvider";

export default function Bleat() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [bleat, setBleat] = useState<BleatRes>({});
  const [bleatReplies, setBleatReplies] = useState<BleatRes[]>([]);

  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1"),
  );
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  const bleatsApi: BleatsApi = new BleatsApi(getApiConfigurationFactory());
  useEffect(() => {
    (async () => {
      try {
        const [bleatRes, bleatRepliesRes] = await Promise.all([
          bleatsApi.getBleat(id),
          bleatsApi.getBleatReplies(
            id,
            currentPage - 1,
            BLITTER_APP_BLEAT_PAGE_SIZE,
          ),
        ]);

        setBleat(bleatRes.data);
        setBleatReplies(bleatRepliesRes.data.bleats);
        setTotalResults(bleatRepliesRes.data.total_bleats);
        setTotalPages(bleatRepliesRes.data.total_pages);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    bleat &&
    bleatReplies && (
      <>
        <BleatCard bleat={bleat} key={bleat.id} setBleats={setBleatReplies} />
        <Hr />
        <BleatList
          bleats={bleatReplies}
          setBleats={setBleatReplies}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          totalResults={totalResults}
        />
      </>
    )
  );
}
