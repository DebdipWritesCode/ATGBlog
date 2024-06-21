import { useState } from "react";
import axios from 'axios'

const ForgotPassword = ({ setLogin }) => {
    const backendURL = import.meta.env.VITE_BACKEND_URL
    const [flash, setFlash] = useState('')
    const [modalFlash, setModalFlash] = useState('')
    const [formData, setFormData] = useState({
        email: '',
    })

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
        const formDataToSubmit = new FormData()
        formDataToSubmit.append('email', formData.email)
        try {
            const response = await axios.post(backendURL + 'users/forgot-password', formDataToSubmit)
            if(response.data.message === 'Password reset email sent.') {
                setModalFlash('Password reset email sent')
                setTimeout(() => {
                    setModalFlash('')
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

    return (
        <form onSubmit={handleFormSubmit}>
            <div className="">
                <div className={modalFlash.length > 0 ? `absolute z-[60] bg-white font-ibm text-green-500 p-2 left-[50%] -translate-x-[50%] -top-4` : `hidden`}>
                    <p>{modalFlash.length > 0 ? modalFlash : ''}</p>
                </div>
                <div className=" mt-6">
                    <div className="w-[320px] max-[375px]:w-[300px] h-[46px] flex items-center bg-[#F7F8FA] border border-[#D9D9DB] rounded-sm">
                        <input onChange={(e) => handleFormChange(e)} type="email" placeholder="Email" name="email" id="email" required className=" w-4/5 h-full m-2 outline-none bg-[#F7F8FA]" />
                    </div>
                </div>
            </div>
            <div>
                <p className="text-red-600 text-center mt-4">{flash.length > 0 ? flash : ''}</p>
            </div>
            <div className=" mt-5 max-md:mt-8 w-[320px] max-[375px]:w-[300px] flex justify-between items-center">
                <button onClick={(e) => handleFormSubmit(e)} className="h-10 w-full max-md:w-1/2 flex items-center justify-center bg-[#2F6CE5] rounded-[20px] text-white text-base">Send Mail</button>
                <p onClick={() => setLogin(false)} className=" md:hidden underline cursor-pointer">or, Sign up</p>
            </div>
        </form>
    )
}

export default ForgotPassword