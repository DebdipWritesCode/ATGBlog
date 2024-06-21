import { IoEyeOutline } from "react-icons/io5";
import { useEffect, useState } from "react";
import axios from 'axios'

const Signup = ({ setLogin, setForgotPassword }) => {
    const backendURL = import.meta.env.VITE_BACKEND_URL
    const [showPassword, setShowPassword] = useState(false)
    const [flash, setFlash] = useState('')
    const [modalFlash, setModalFlash] = useState('');
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        confirm_password: ''
    })

    function togglePassword(e) {
        e.preventDefault()
        setShowPassword(!showPassword)
    }

    function handleFormChange(e) {
        setFlash('')
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
    }

    async function handleFormSubmit(e) {
        e.preventDefault()
        if (formData.first_name.length === 0) {
            setFlash('First name is required')
            return
        }
        if (formData.last_name.length === 0) {
            setFlash('Last name is required')
            return
        }
        if (formData.email.length === 0) {
            setFlash('Email is required')
            return
        }
        if(formData.password.length === 0) {
            setFlash('Password is required')
            return
        }
        if (formData.password !== formData.confirm_password) {
            setFlash('Passwords do not match')
            return
        }
        const formDataToSubmit = new FormData()
        formDataToSubmit.append('first_name', formData.first_name)
        formDataToSubmit.append('last_name', formData.last_name)
        formDataToSubmit.append('email', formData.email)
        formDataToSubmit.append('password', formData.password)

        try {
            const response = await axios.post(backendURL + 'users/signup', formDataToSubmit)
            if(response.data.message === 'User created successfully!') {
                setModalFlash('User created successfully!')
                setTimeout(() => {
                    setModalFlash('')
                    setLogin(true)
                }, 2000)
            }
        }
        catch(err) {
            console.log(err)
            if (err.response && err.response.data && err.response.data.message) {
                setFlash(err.response.data.message); 
            } else {
                setFlash('An error occurred. Please try again later.');
            }
        }
    }

    useEffect(() => {
        setForgotPassword(false)
    })

    return (
        <form onSubmit={handleFormSubmit}>
            <div className="">
                <div className={modalFlash.length > 0 ? `absolute z-[60] bg-white font-ibm text-green-500 p-2 left-[50%] -translate-x-[50%] -top-4` : `hidden`}>
                    <p>{modalFlash.length > 0 ? modalFlash : ''}</p>
                </div>
                <div className=" mt-6">
                    <div className=" w-[320px] max-[375px]:w-[300px] h-[46px] flex items-center bg-[#F7F8FA] border border-[#D9D9DB] rounded-sm">
                        <input onChange={(e) => handleFormChange(e)} type="text" placeholder="First Name" name="first_name" id="first_name" required className="w-1/2 border-r border-[#D9D9DB] h-full m-2 outline-none bg-[#F7F8FA] pr-2" />
                        <input onChange={(e) => handleFormChange(e)} type="text" placeholder="Last Name" name="last_name" id="last_name" required className="w-1/2 h-full m-2 outline-none bg-[#F7F8FA]" />
                    </div>
                    <div className="w-[320px] max-[375px]:w-[300px] h-[46px] flex items-center bg-[#F7F8FA] border border-[#D9D9DB] rounded-sm">
                        <input onChange={(e) => handleFormChange(e)} type="email" placeholder="Email" name="email" id="email" required className=" w-4/5 h-full m-2 outline-none bg-[#F7F8FA]" />
                    </div>
                    <div className="w-[320px] max-[375px]:w-[300px] h-[46px] flex items-center bg-[#F7F8FA] border border-[#D9D9DB] rounded-sm justify-between">
                        <input onChange={(e) => handleFormChange(e)} type={showPassword ? 'text' : 'password'} placeholder="Password" name="password" id="password" required className="w-4/5 h-full m-2 outline-none bg-[#F7F8FA]" />
                        <button className="mr-4">
                            <IoEyeOutline onClick={(e) => togglePassword(e)} color="#8A8A8A" size={18} className=" cursor-pointer" />
                        </button>
                    </div>
                    <div className=" w-[320px] max-[375px]:w-[300px] h-[46px] flex items-center bg-[#F7F8FA] border border-[#D9D9DB] rounded-sm">
                        <input onChange={(e) => handleFormChange(e)} type="password" placeholder="Confirm Password" name="confirm_password" id="confirm_password" required className=" w-4/5 h-full m-2 outline-none bg-[#F7F8FA]" />
                    </div>
                </div>
            </div>
            <div>
                <p className="text-red-600 text-center mt-4">{flash.length > 0 ? flash : ''}</p>
            </div>
            <div className=" mt-5 max-md:mt-8 w-[320px] max-[375px]:w-[300px] flex justify-between items-center">
                <button onClick={(e) => handleFormSubmit(e)} className="h-10 w-full max-md:w-1/2 flex items-center justify-center bg-[#2F6CE5] rounded-[20px] text-white text-base">Create Account</button>
                <p onClick={() => setLogin(true)} className=" md:hidden underline cursor-pointer">or, Sign in</p>
            </div>
            <div className="md:hidden mt-6 w-[320px] max-[375px]:w-[300px]">
                <p className="text-center text-sm">By signing up, you agree to our Terms & conditions, Privacy policy</p>
            </div>
        </form>
    )
}

export default Signup