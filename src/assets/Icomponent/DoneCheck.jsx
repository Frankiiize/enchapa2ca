import * as React from "react"

const DoneCheck = (props) => (
  <svg
    width={props.width}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 122.88 122.88"
    style={{
      enableBackground: "new 0 0 122.88 122.88",
    }}
    xmlSpace="preserve"
    {...props}
  >
    <path
      d="M61.44 0c33.93 0 61.44 27.51 61.44 61.44 0 33.93-27.51 61.44-61.44 61.44C27.51 122.88 0 95.37 0 61.44 0 27.51 27.51 0 61.44 0zM39.48 56.79c4.6 2.65 7.59 4.85 11.16 8.78 9.24-14.88 19.28-23.12 32.32-34.83l1.28-.49h14.28C79.38 51.51 64.53 69.04 51.24 94.68c-6.92-14.79-13.09-25-26.88-34.47l15.12-3.42z"
      style={{
        fillRule: "evenodd",
        clipRule: "evenodd",
        fill: "#39c4a1",
      }}
    />
  </svg>
)

export default DoneCheck