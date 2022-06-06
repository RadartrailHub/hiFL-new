import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const PostsSkelenton = () => {
  return (
    <div className="w-full">
      <Skeleton height={200} />
      <Skeleton height={10} />
      <Skeleton height={15} count={2} />
    </div>
  );
};

export default PostsSkelenton;