import React from "react";

export default function Logo() {
  return (
    <>
      <img
        className="hidden sm:block h-8 w-auto lg:hidden"
        src="/logo.png"
        alt="Blitter"
      />
      <img
        className="hidden h-8 w-auto lg:block"
        src="/logo.svg"
        alt="Blitter"
      />
    </>
  );
}
