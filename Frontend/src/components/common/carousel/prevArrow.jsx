import React from "react";

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      // style={{ ...style, display: "block", background: "white" }}
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="11" height="20" id="arrow">
        <path
          fillRule="evenodd"
          d="M10.634.292a1.063 1.063 0 0 0-1.464 0L.607 8.556a1.95 1.95 0 0 0 0 2.827l8.625 8.325c.4.385 1.048.39 1.454.01a.975.975 0 0 0 .01-1.425l-7.893-7.617a.975.975 0 0 1 0-1.414l7.83-7.557a.974.974 0 0 0 0-1.413"
        ></path>
      </svg>
    </div>
  );
};

export default PrevArrow;
