import React from "react";
import axios from "../utils/axios";
import BleatCard from "./BleatCard";
import { useEffect } from "react";
import { BleatsApi } from "../generated-sources/openapi";
import JwtAuthApiConfigurationFactory from "../api/JwtAuthApiConfigurationFactory";
import NoAuthApiConfigurationFactory from "../api/NoAuthApiFactory";
import { getApiConfigurationFactory } from "../api/FactoryProvider";

export default function BleatList({
  followingOnly,
  bleats,
  setBleats,
  currentPage,
  setTotalResults,
  setTotalPages,
}) {
  const configuration = getApiConfigurationFactory();
  console.log(configuration);
  const bleatsApiAuth: BleatsApi = new BleatsApi(
    configuration
    // new JwtAuthApiConfigurationFactory().createApiConfiguration()
  );
  console.log(bleatsApiAuth);

  useEffect(() => {
    (async () => {
      try {
        var response;
        // if (configuration instanceof JwtAuthApiConfigurationFactory) {
        response = await bleatsApiAuth.getBleats(
          currentPage - 1,
          10,
          followingOnly
        );
        // } else {
        //   response = await bleatsApiAuth.getPublicBleats(currentPage - 1, 10);
        // }

        if (response.status === 200) {
          setTotalResults(response.data.total_bleats);
          setTotalPages(response.data.total_pages);
          setBleats(response.data.bleats);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    })();
  }, [currentPage, followingOnly]);

  return (
    <>
      {bleats &&
        bleats.map((bleat) => {
          return (
            <BleatCard bleat={bleat} key={bleat.id} setBleats={setBleats} />
          );
        })}
    </>
  );
}
