import React from "react";

const ScrollableBoxContainer = () => {
  // Generate an array of random colors
  const randomColors = Array.from({ length: 40 }, () =>
    `#${Math.floor(Math.random() * 16777215).toString(16)}`
  );

  return (
    <div
      className="h-64 w-full overflow-y-auto scrollbar-thin  border p-4"
      style={{ maxHeight: "16rem" }} // Set max height for the container
    >
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {randomColors.map((color, index) => (
          <div
            key={index}
            className="h-32 w-full rounded-md"
            style={{ backgroundColor: color }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default ScrollableBoxContainer;
