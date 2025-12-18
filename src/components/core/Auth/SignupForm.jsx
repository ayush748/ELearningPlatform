import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
// import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

// import { sendOtp } from '../../../services/operations/authAPI'
// import { setSignupData } from '../../../slices/authSlice'
// import { ACCOUNT_TYPE } from '../../../utils/constants'
// import Tab from '../../common/Tab'

function SignupForm() {
    const navigate = useNavigate()
    // const dispatch = useDispatch()

    // student or instructor (temporary local state)
    const [accountType, setAccountType] = useState("Student")
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email : '',
        password : '',
        confirmPassword : '',
    })

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    
    const { firstName, lastName, email, password, confirmPassword } = formData

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            toast.error("Passwords Do Not Match")
            return
        }

        // TEMP: just log data instead of Redux
        console.log("Signup Data:", {
            ...formData,
            accountType,
        })

        toast.success("Signup data captured (Redux disabled)")

        // Reset form
        setFormData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
        })
        setAccountType("Student")

        // navigate("/login") // optional
    }

    return (
        <div>
            {/* Student / Instructor Toggle */}
            <div className='flex bg-richblack-800 p-1 gap-x-1 my-6 rounded-full max-w-max'>
                <button
                    type="button"
                    className={`${accountType === 'Student'
                        ? 'bg-richblack-900 text-richblack-5'
                        : 'bg-transparent text-richblack-200'} 
                        py-2 px-5 rounded-full transition-all duration-200`}
                    onClick={() => setAccountType('Student')}
                >
                    Student
                </button>

                <button
                    type="button"
                    className={`${accountType === 'Instructor'
                        ? 'bg-richblack-900 text-richblack-5'
                        : 'bg-transparent text-richblack-200'}
                        py-2 px-5 rounded-full transition-all duration-200`}
                    onClick={() => setAccountType('Instructor')}
                >
                    Instructor
                </button>
            </div>
                
            {/* Form */}
            <form onSubmit={handleOnSubmit} className='flex w-full flex-col gap-y-4'>
                <div className='flex gap-x-4'>
                    <label>
                        <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
                            First Name <sup className='text-pink-200'>*</sup>
                        </p>
                        <input 
                            required
                            type='text'
                            name='firstName'
                            value={firstName}
                            onChange={handleOnChange}
                            className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
                        />
                    </label>

                    <label>
                        <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
                            Last Name <sup className='text-pink-200'>*</sup>
                        </p>
                        <input 
                            required
                            type='text'
                            name='lastName'
                            value={lastName}
                            onChange={handleOnChange}
                            className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
                        />
                    </label>
                </div>

                <label>
                    <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
                        Email Address <sup className='text-pink-200'>*</sup>
                    </p>
                    <input 
                        required
                        type='email'
                        name='email'
                        value={email}
                        onChange={handleOnChange}
                        className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5'
                    />
                </label>

                <div className='flex gap-x-4'>
                    <label className='relative'>
                        <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
                            Create Password <sup className='text-pink-200'>*</sup>
                        </p>
                        <input 
                            required
                            type={showPassword ? 'text' : 'password'}
                            name='password'
                            value={password}
                            onChange={handleOnChange}
                            className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5'
                        />
                        <span
                            onClick={() => setShowPassword((prev) => !prev)}
                            className='absolute right-3 top-[38px] cursor-pointer'
                        >
                            {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </span>
                    </label>

                    <label className='relative'>
                        <p className='mb-1 text-[0.875rem] leading-[1.375rem] text-richblack-5'>
                            Confirm Password <sup className='text-pink-200'>*</sup>
                        </p>
                        <input 
                            required
                            type={showConfirmPassword ? 'text' : 'password'}
                            name='confirmPassword'
                            value={confirmPassword}
                            onChange={handleOnChange}
                            className='w-full rounded-[0.5rem] bg-richblack-800 p-[12px] pr-10 text-richblack-5'
                        />
                        <span
                            onClick={() => setShowConfirmPassword((prev) => !prev)}
                            className='absolute right-3 top-[38px] cursor-pointer'
                        >
                            {showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </span>
                    </label>
                </div>

                <button
                    type='submit'
                    className='mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900'
                >
                    Create Account
                </button>
            </form>
        </div>
    )
}

export default SignupForm
