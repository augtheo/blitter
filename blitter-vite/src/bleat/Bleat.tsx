import React from "react";
import BleatCard from "../bleat/BleatCard";
import axios from "../utils/axios";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { BleatsApi, PaginatedBleats } from "../generated-sources/openapi";

import configuration from "../utils/ClientConfig";
import JwtAuthApiConfigurationFactory from "../api/JwtAuthApiConfigurationFactory";

export default function Bleat() {
  const { id } = useParams();
  const [bleat, setBleat] = useState({});
  const [bleatReplies, setBleatReplies] = useState([]);

  const bleatsApi: BleatsApi = new BleatsApi(
    new JwtAuthApiConfigurationFactory().createApiConfiguration()
  );
  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      try {
        const [bleatRes, bleatRepliesRes] = await Promise.all([
          bleatsApi.getBleat(id),
          bleatsApi.getBleatReplies(id),
        ]);

        setBleat(bleatRes.data);
        setBleatReplies(bleatRepliesRes.data);
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
