import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { getInstructorData } from '../../../../services/operations/profileAPI';
import InstructorChart from './InstructorChart';
import { Link, useNavigate } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";

export default function Instructor() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const [loading, setLoading] = useState(false);
  const [instructorData, setInstructorData] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    ;(async () => {
      setLoading(true);
      const instructorApiData = await getInstructorData(token, dispatch, navigate);
      if (instructorApiData) {
        setInstructorData(instructorApiData);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <div className="flex w-full flex-col gap-8 pb-10">
      {/* Header */}
      <div className="flex flex-col gap-2 rounded-2xl bg-richblack-800 p-8 shadow-sm border border-richblack-700/50 relative overflow-hidden">
        <div className="absolute top-0 right-0 h-[150px] w-[150px] rounded-full bg-yellow-25 opacity-10 blur-[80px]"></div>
        <h1 className="text-3xl font-bold bg-gradient-to-br from-richblack-5 to-richblack-200 bg-clip-text text-transparent">
          Hi, {user?.firstName} 👋
        </h1>
        <p className="font-medium text-richblack-300">Welcome back to your dashboard!</p>
      </div>

      {loading ? (
        <div className="flex h-[30vh] items-center justify-center">
          <div className="spinner"></div>
        </div>
      ) : instructorData && instructorData.courses?.length > 0 ? (
        <div className="flex flex-col gap-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Render chart / graph */}
            <div className="md:col-span-2 rounded-2xl bg-richblack-800 p-6 shadow-sm border border-richblack-700/50 flex flex-col h-[400px]">
              <p className="text-xl font-bold text-richblack-5 mb-4">Analytics Visualization</p>
              <div className="flex-1 w-full h-full relative">
                {(instructorData.totalRevenue > 0 || instructorData.totalStudents > 0) ? (
                  <InstructorChart courses={instructorData.courses} />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    <p className="text-lg font-medium text-richblack-400">Not Enough Data To Visualize</p>
                  </div>
                )}
              </div>
            </div>

            {/* Total Statistics Cards */}
            <div className="flex flex-col gap-6">
              <div className="flex-1 rounded-2xl bg-gradient-to-br from-richblack-800 to-richblack-900 p-6 shadow-md border border-richblack-700/50 hover:border-yellow-200/30 transition-colors">
                <p className="text-sm font-semibold uppercase tracking-wider text-richblack-300">Total Courses</p>
                <p className="mt-2 text-4xl font-bold text-yellow-50">{instructorData.totalCourses}</p>
              </div>
              <div className="flex-1 rounded-2xl bg-gradient-to-br from-richblack-800 to-richblack-900 p-6 shadow-md border border-richblack-700/50 hover:border-yellow-200/30 transition-colors">
                <p className="text-sm font-semibold uppercase tracking-wider text-richblack-300">Total Students</p>
                <p className="mt-2 text-4xl font-bold text-yellow-50">{instructorData.totalStudents}</p>
              </div>
              <div className="flex-1 rounded-2xl bg-gradient-to-br from-richblack-800 to-richblack-900 p-6 shadow-md border border-richblack-700/50 hover:border-yellow-200/30 transition-colors">
                <p className="text-sm font-semibold uppercase tracking-wider text-richblack-300">Total Revenue</p>
                <p className="mt-2 text-4xl font-bold text-yellow-50">₹{instructorData.totalRevenue}</p>
              </div>
            </div>
          </div>

          {/* Course Table */}
          <div className="rounded-2xl bg-richblack-800 p-8 shadow-sm border border-richblack-700/50">
            <div className="flex items-center justify-between mb-6">
              <p className="text-2xl font-bold text-richblack-5">Course Analytics</p>
              <Link to="/dashboard/my-courses">
                <p className="text-sm font-semibold text-yellow-100 hover:text-yellow-50 hover:underline transition-all">View All Courses →</p>
              </Link>
            </div>
            
            <div className="overflow-hidden rounded-xl border border-richblack-700/50">
              <table className="w-full text-left text-richblack-200">
                <thead className="bg-richblack-700/50">
                  <tr>
                    <th className="px-6 py-4 font-semibold text-richblack-50">Course</th>
                    <th className="px-6 py-4 font-semibold text-richblack-50">Price</th>
                    <th className="px-6 py-4 font-semibold text-richblack-50">Students Enrolled</th>
                    <th className="px-6 py-4 font-semibold text-richblack-50">Total Revenue</th>
                    <th className="px-6 py-4 font-semibold text-richblack-50">Average Rating</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-richblack-700/50">
                  {instructorData.courses.map((course) => (
                    <tr key={course._id} className="hover:bg-richblack-700/30 transition-colors group">
                      <td className="px-6 py-4 flex items-center gap-4">
                        <div className="relative overflow-hidden rounded-lg">
                          <img
                            src={course.thumbnail}
                            alt={course.courseName}
                            className="h-[60px] w-[90px] rounded-lg object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <p className="text-sm font-semibold text-richblack-50 group-hover:text-yellow-50 transition-colors">{course.courseName}</p>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium">₹{course.price}</td>
                      <td className="px-6 py-4 text-sm font-medium">
                        <span className="bg-richblack-700/50 text-richblack-50 px-2 py-1 rounded-md">
                          {course.totalStudentsEnrolled}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-caribbeangreen-100">₹{course.totalAmountGenerated}</td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex items-center gap-2 bg-richblack-700/30 px-3 py-1 rounded-full w-fit">
                          <span className="font-bold text-yellow-100">{course.averageRating}</span>
                          <ReactStars
                            count={5}
                            value={course.averageRating}
                            size={18}
                            edit={false}
                            activeColor="#ffd700"
                            emptyIcon={<i className="far fa-star text-richblack-600"></i>}
                            fullIcon={<i className="fas fa-star text-yellow-100"></i>}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-10 flex flex-col items-center justify-center rounded-2xl bg-richblack-800 p-12 shadow-sm border border-richblack-700/50">
          <div className="h-24 w-24 rounded-full bg-richblack-700 flex items-center justify-center mb-6">
            <span className="text-4xl">📊</span>
          </div>
          <p className="text-2xl font-bold text-richblack-5 mb-2">
            No courses found
          </p>
          <p className="text-richblack-300 mb-6 text-center max-w-md">
            You haven't created any courses yet. Start your journey as an instructor today!
          </p>
          <Link to="/dashboard/add-course">
            <button className="rounded-md bg-yellow-50 px-6 py-3 text-lg font-bold text-richblack-900 hover:scale-95 transition-all shadow-md">
              Create Your First Course
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
