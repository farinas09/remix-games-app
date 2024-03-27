import React from "react";
import { FaStar } from "react-icons/fa6";

interface RatingDetailProps {
  title: string;
  rating: number;
}

export default function RatingDetail({ title, rating }: RatingDetailProps) {
  return (
    <div className="flex justify-evenly items-center w-96 p-3 m-3 bg-gray-100 rounded-md dark:bg-gray-700 dark:text-gray-300">
      <span className="px-4 font-black text-gray-800 dark:text-gray-300 text-xl">
        {title}
      </span>
      <div className="text-center">
        <span className="text-4xl font-bold flex gap-x-1 items-center ">
          {rating}
          <FaStar fill="#eab308" />
        </span>
      </div>
    </div>
  );
}
