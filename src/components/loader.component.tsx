import React, { SVGProps } from "react";

export function Loader(props: SVGProps<any>) {
  return (
    <svg
      version="1.1"
      x="0px"
      y="0px"
      viewBox="0 0 100 100"
      enableBackground="new 0 0 0 0"
      height="16"
      {...props}
    >
      <circle
        fill="none"
        stroke="#6495ed"
        strokeWidth="4"
        cx="50"
        cy="50"
        r="44"
        style={{ opacity: 0.5 }}
      />
      <circle fill="#6495ed" stroke="#fff" strokeWidth="3" cx="8" cy="54" r="6">
        <animateTransform
          attributeName="transform"
          dur="2s"
          type="rotate"
          from="0 50 48"
          to="360 50 52"
          repeatCount="indefinite"
        />
      </circle>
    </svg>
  );
}
