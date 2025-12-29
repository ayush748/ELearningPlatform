import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"

import CountryCode from "../../data/countrycode.json"
import { apiConnector } from "../../services/apiconnector"
import { contactusEndpoint } from "../../services/apis"

const ContactUsForm = () => {
  const [loading, setLoading] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm()

  const submitContactForm = async (data) => {
    console.log("Form Data - ", data)
    try {
      setLoading(true)
      const res = await apiConnector(
        "POST",
        contactusEndpoint.CONTACT_US_API,
        data
      )
      console.log("Email Res - ", res)
      setLoading(false)
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        email: "",
        firstname: "",
        lastname: "",
        message: "",
        phoneNo: "",
        countrycode: "",
      })
    }
  }, [reset, isSubmitSuccessful])

  return (
    <form
      onSubmit={handleSubmit(submitContactForm)}
      className="mx-auto w-full max-w-3xl rounded-xl bg-richblack-800 p-6 shadow-lg sm:p-8 flex flex-col gap-6"
    >
      {/* Name */}
      <div className="flex flex-col gap-6 sm:flex-row">
        {/* First Name */}
        <div className="flex flex-1 flex-col gap-2">
          <label className="text-sm font-medium text-richblack-5">
            First Name <span className="text-yellow-100">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter first name"
            className="rounded-lg border border-richblack-600 bg-richblack-700 px-4 py-3 text-richblack-5 outline-none transition-all
            focus:border-yellow-100 focus:ring-1 focus:ring-yellow-100"
            {...register("firstname", { required: true })}
          />
          {errors.firstname && (
            <span className="text-xs text-yellow-100">
              Please enter your name
            </span>
          )}
        </div>

        {/* Last Name */}
        <div className="flex flex-1 flex-col gap-2">
          <label className="text-sm font-medium text-richblack-5">
            Last Name
          </label>
          <input
            type="text"
            placeholder="Enter last name"
            className="rounded-lg border border-richblack-600 bg-richblack-700 px-4 py-3 text-richblack-5 outline-none transition-all
            focus:border-yellow-100 focus:ring-1 focus:ring-yellow-100"
            {...register("lastname")}
          />
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-richblack-5">
          Email Address <span className="text-yellow-100">*</span>
        </label>
        <input
          type="email"
          placeholder="Enter email address"
          className="rounded-lg border border-richblack-600 bg-richblack-700 px-4 py-3 text-richblack-5 outline-none transition-all
          focus:border-yellow-100 focus:ring-1 focus:ring-yellow-100"
          {...register("email", { required: true })}
        />
        {errors.email && (
          <span className="text-xs text-yellow-100">
            Please enter your email address
          </span>
        )}
      </div>

      {/* Phone Number */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-richblack-5">
          Phone Number <span className="text-yellow-100">*</span>
        </label>

        <div className="flex gap-4">
          {/* Country Code */}
          <select
            className="w-[110px] rounded-lg border border-richblack-600 bg-richblack-700 px-3 py-3 text-richblack-5 outline-none
            focus:border-yellow-100 focus:ring-1 focus:ring-yellow-100"
            {...register("countrycode", { required: true })}
          >
            {CountryCode.map((ele, i) => (
              <option key={i} value={ele.code}>
                {ele.code}
              </option>
            ))}
          </select>

          {/* Phone Input */}
          <input
            type="number"
            placeholder="1234567890"
            className="flex-1 rounded-lg border border-richblack-600 bg-richblack-700 px-4 py-3 text-richblack-5 outline-none transition-all
            focus:border-yellow-100 focus:ring-1 focus:ring-yellow-100"
            {...register("phoneNo", {
              required: {
                value: true,
                message: "Please enter your phone number",
              },
              minLength: { value: 10, message: "Invalid phone number" },
              maxLength: { value: 12, message: "Invalid phone number" },
            })}
          />
        </div>

        {errors.phoneNo && (
          <span className="text-xs text-yellow-100">
            {errors.phoneNo.message}
          </span>
        )}
      </div>

      {/* Message */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-richblack-5">
          Message <span className="text-yellow-100">*</span>
        </label>
        <textarea
          rows="6"
          placeholder="Enter your message..."
          className="resize-none rounded-lg border border-richblack-600 bg-richblack-700 px-4 py-3 text-richblack-5 outline-none transition-all
          focus:border-yellow-100 focus:ring-1 focus:ring-yellow-100"
          {...register("message", { required: true })}
        />
        {errors.message && (
          <span className="text-xs text-yellow-100">
            Please enter your message
          </span>
        )}
      </div>

      {/* Submit Button */}
      <button
        disabled={loading}
        type="submit"
        className={`mt-4 rounded-lg bg-yellow-100 px-6 py-3 text-sm font-bold text-black transition-all
        ${
          !loading &&
          "hover:scale-95 hover:bg-yellow-200 active:scale-90"
        }
        disabled:cursor-not-allowed disabled:bg-richblack-500`}
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
    </form>
  )
}

export default ContactUsForm
