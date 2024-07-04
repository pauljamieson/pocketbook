"use client";
import { useRouter } from "next/navigation";
import React from "react";

export default function GoBackButton({ label }: { label: string }) {
  const router = useRouter();
  return (
    <button className="btn" onClick={() => router.back()}>
      {label}
    </button>
  );
}
