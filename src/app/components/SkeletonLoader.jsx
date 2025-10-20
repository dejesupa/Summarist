"use client";

export default function SkeletonLoader({
  width = "100%",
  height = "16px",
  rounded = "md",
  className = "",
}) {
  return (
    <div
      className={`skeleton-shimmer rounded-${rounded} ${className}`}
      style={{ width, height }}
    />
  );
}
