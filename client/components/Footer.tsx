import React from "react";

export default function Footer() {
  return (
    <div className="h-16 w-full bg-blue-600 flex items-center p-2">
      <h1 className="uppercase font-bold">&copy;{new Date().getFullYear()}</h1>
      <div className="grow" />
    </div>
  );
}
