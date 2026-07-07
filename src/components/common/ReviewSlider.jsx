import React, { useEffect, useState } from "react"
import ReactStars from "react-rating-stars-component"
import "../../App.css"
import { FaStar } from "react-icons/fa"

import { apiConnector } from "../../services/apiconnector"
import { ratingsEndpoints } from "../../services/apis"

function ReviewSlider() {
  const [reviews, setReviews] = useState([])
  const truncateWords = 15

  useEffect(() => {
    ;(async () => {
      const { data } = await apiConnector(
        "GET",
        ratingsEndpoints.REVIEWS_DETAILS_API
      )
      if (data?.success) {
        setReviews(data?.data)
      }
    })()
  }, [])

  return (
    <div className="w-full text-white">
      <div className="my-[50px] mx-auto w-full max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {reviews.map((review, i) => {
            return (
              <div
                key={i}
                className="flex flex-col gap-3 bg-richblack-800 p-5 rounded-lg text-[14px] text-richblack-25 shadow-sm shadow-richblack-700 h-full w-full min-w-[280px]"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={
                      review?.user?.image
                        ? review?.user?.image
                        : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
                    }
                    alt={`${review?.user?.firstName} profile`}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                  <div className="flex flex-col">
                    <h1 className="font-semibold text-richblack-5 text-base">{`${review?.user?.firstName} ${review?.user?.lastName}`}</h1>
                    <h2 className="text-[13px] font-medium text-richblack-500">
                      {review?.course?.courseName}
                    </h2>
                  </div>
                </div>
                <p className="font-medium text-richblack-25 flex-grow mt-2">
                  {review?.review.split(" ").length > truncateWords
                    ? `${review?.review
                        .split(" ")
                        .slice(0, truncateWords)
                        .join(" ")} ...`
                    : `${review?.review}`}
                </p>
                <div className="flex items-center gap-2 mt-auto pt-2">
                  <h3 className="font-semibold text-yellow-100">
                    {review.rating.toFixed(1)}
                  </h3>
                  <ReactStars
                    count={5}
                    value={review.rating}
                    size={20}
                    edit={false}
                    activeColor="#ffd700"
                    emptyIcon={<FaStar />}
                    fullIcon={<FaStar />}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ReviewSlider
