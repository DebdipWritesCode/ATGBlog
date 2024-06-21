import { IoEyeOutline } from "react-icons/io5";
import { useState } from "react";
import axios from 'axios'

const Login = ({ setLogin, setForgotPassword }) => {
    const backendURL = import.meta.env.VITE_BACKEND_URL
    const [showPassword, setShowPassword] = useState(false)
    const [flash, setFlash] = useState('')
    const [formData, setFormData] = useState({
        email: '',
        password: ''
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
        setFlash('')
        if (formData.email.length === 0) {
            setFlash('Email is required')
            return
        }
        if(formData.password.length === 0) {
            setFlash('Password is required')
            return
        }
        const formDataToSubmit = new FormData()
        formDataToSubmit.append('email', formData.email)
        formDataToSubmit.append('password', formData.password)
        try {
            const response = await axios.post(backendURL + 'users/login', formDataToSubmit)
            const token = response.data.token
            const userName = response.data.userName
            const userID = response.data.userID
            const expiresIn = response.data.expiresIn
            localStorage.setItem('token', token)
            localStorage.setItem('userName', userName)
            localStorage.setItem('userID', userID)
            localStorage.setItem('expiresIn', expiresIn)
            window.location.href = '/';
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

    return (
        <form onSubmit={handleFormSubmit}>
            <div className="">
                <div className=" mt-6">
                    <div className="w-[320px] max-[375px]:w-[300px] h-[46px] flex items-center bg-[#F7F8FA] border border-[#D9D9DB] rounded-sm">
                        <input onChange={(e) => handleFormChange(e)} type="email" placeholder="Email" name="email" id="email" required className=" w-4/5 h-full m-2 outline-none bg-[#F7F8FA]" />
                    </div>
                    <div className="w-[320px] max-[375px]:w-[300px] h-[46px] flex items-center bg-[#F7F8FA] border border-[#D9D9DB] rounded-sm justify-between">
                        <input onChange={(e) => handleFormChange(e)} type={showPassword ? 'text' : 'password'} placeholder="Password" name="password" id="password" required className="w-4/5 h-full m-2 outline-none bg-[#F7F8FA]" />
                        <button className="mr-4">
                            <IoEyeOutline onClick={(e) => togglePassword(e)} color="#8A8A8A" size={18} className=" cursor-pointer" />
                        </button>
                    </div>
                </div>
            </div>
            <div>
                <p className="text-red-600 text-center mt-4">{flash.length > 0 ? flash : ''}</p>
            </div>
            <div className=" mt-5 max-md:mt-8 w-[320px] max-[375px]:w-[300px] flex justify-between items-center">
                <button onClick={(e) => handleFormSubmit(e)} className="h-10 w-full max-md:w-1/2 flex items-center justify-center bg-[#2F6CE5] rounded-[20px] text-white text-base">Sign In</button>
                <p onClick={() => setLogin(false)} className=" md:hidden underline cursor-pointer">or, Sign up</p>
            </div>
            <div className="mt-6 flex w-[320px] max-[375px]:w-[300px] items-center justify-center">
                <h2 onClick={() => setForgotPassword(true)} className="font-bold text-[13px] cursor-pointer hover:underline max-md:text-center">Forgot Password?</h2>
            </div>
        </form>
    )
}

export default Login