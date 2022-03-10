import * as React from "react"

const OrderHistoryIcon = (props) => (
  <svg
    width={25}
    height={25}
    viewBox="0 0 16 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M3 0h10a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H3a3 3 0 0 1-3-3V3a3 3 0 0 1 3-3Zm1 7a1 1 0 0 0 0 2h8a1 1 0 1 0 0-2H4Zm0 8a1 1 0 0 0 0 2h5a1 1 0 0 0 0-2H4ZM4 3a1 1 0 0 0 0 2h8a1 1 0 1 0 0-2H4Zm0 8a1 1 0 0 0 0 2h8a1 1 0 0 0 0-2H4Z"
      fill={props.fill}
    />
  </svg>
)

export default OrderHistoryIcon