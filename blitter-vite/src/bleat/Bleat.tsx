import React from "react";
import BleatCard from "../bleat/BleatCard";
import axios from "../utils/axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { BleatRes, BleatsApi, PaginatedBleats } from "../generated-sources/openapi";

import configuration from "../utils/ClientConfig";
import JwtAuthApiConfigurationFactory from "../api/JwtAuthApiConfigurationFactory";
import BleatList from "./BleatList";

export default function Bleat() {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const [bleat, setBleat] = useState<BleatRes>({});
  const [bleatReplies, setBleatReplies] = useState<BleatRes[]>([]);

  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page") || "1")
  );
  const [totalPages, setTotalPages] = useState(0);
  const [totalResults, setTotalResults] = useState(0);

  const bleatsApi: BleatsApi = new BleatsApi(
    new JwtAuthApiConfigurationFactory().createApiConfiguration()
  );
  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      try {
        const [bleatRes, bleatRepliesRes] = await Promise.all([
          bleatsApi.getBleat(id),
          bleatsApi.getBleatReplies(id , currentPage - 1, 10),
        ]);

        setBleat(bleatRes.data);
        setBleatReplies(bleatRepliesRes.data.bleats);
        setTotalResults(bleatRepliesRes.data.total_bleats);
        setTotalPages(bleatRepliesRes.data.total_pages);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, []);

  return (
    bleat &&
    bleatReplies && (
      <div className="min-h-screen  grow ">
        <BleatCard bleat={bleat} key={bleat.id} setBleats={setBleatReplies} />
        <hr className="mx-auto my-4 h-1 w-48 rounded border-0 bg-gray-100 dark:bg-gray-700 md:my-10" />
        <BleatList
          bleats={bleatReplies}
          setBleats={setBleatReplies}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          totalResults={totalResults}
        />
      </div>
    )
  );
}
