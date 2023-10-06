import React from "react";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <img className="hidden h-8 w-auto lg:block" src="/logo.svg" alt="Blitter" />
  );
}
