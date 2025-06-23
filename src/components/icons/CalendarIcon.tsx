import React from "react";

const CalendarIcon = () => (
  <svg
    width="22"
    height="22"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <rect
      x="3"
      y="5"
      width="18"
      height="16"
      rx="2"
      fill="#fff"
      stroke="#111"
      strokeWidth="2"
    />
    <path
      d="M16 3v4M8 3v4"
      stroke="#111"
      strokeWidth="2"
      strokeLinecap="round"
    />
    <path d="M3 9h18" stroke="#111" strokeWidth="2" />
  </svg>
);

export default CalendarIcon;