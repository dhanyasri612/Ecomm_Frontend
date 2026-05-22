import React from "react";
import Rating from "./Rating";
import { Calendar } from "lucide-react";
import { formatDate } from "../utils/formatter";

const Reviews = ({ reviews = [] }) => {
  if (!reviews || reviews.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl text-center">No reviews yet.</div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {reviews.map((rev, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-amber-200 transition-colors"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="flex items-center gap-4">
              <img
                src={rev.avatar}
                alt={rev.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <h5 className="font-semibold text-gray-900">{rev.name}</h5>
                <Rating value={rev.rating} disabled={true} />
              </div>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Calendar size={16} />
              {formatDate(rev.createdAt)}
            </div>
          </div>
          <p className="text-gray-600 leading-relaxed">{rev.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
