import React from "react";

export default function SkeletonBox({ className = "" }) {
  return (
    <div className={`bg-gray-300 animate-pulse rounded ${className}`} />
  );
}