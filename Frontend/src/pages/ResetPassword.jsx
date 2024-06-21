import { useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"

const ResetPassword = () => {
    const backendURL = import.meta.env.VITE_BACKEND_URL
    const { userID } = useParams()
    const [loading, setLoading] = useState(false)
    const [endMessage, setEndMessage] = useState('')
    const [flash, setFlash] = useState('')
    const [formData, setFormData] = useState({
        password: '',
        confirm_password: '',
        userID: userID
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
        if (formData.password.length === 0) {
            setFlash('Password is required')
            return
        }
        if (formData.confirm_password.length === 0) {
            setFlash('Confirm Password is required')
            return
        }
        if (formData.password !== formData.confirm_password) {
            setFlash('Passwords do not match')
            return
        }
        const formDataToSubmit = new FormData()
        formDataToSubmit.append('password', formData.password)
        formDataToSubmit.append('userID', userID)
        try {
            setLoading(true)
            const response = await axios.post(backendURL + 'users/reset-password', formDataToSubmit)
            if (response.data.message === 'Password reset successfully.') {
                setEndMessage('Password reset successfully. You can login now')
                setLoading(false)
            }
        }
        catch (err) {
            setLoading(false)
            console.log(err)
            if (err.response && err.response.data && err.response.data.message) {
                setFlash(err.response.data.message);
            } else {
                setFlash('An error occurred. Please try again later.');
            }
        }
    }

    if(endMessage.length > 0) {
        return (
            <div className="px-[170px] mt-12 font-inter mb-14 flex flex-col items-center">
                <div className="bg-white text-green-500 p-2 text-2xl font-semibold shadow-lg border-2 border-green-500">
                    <p>{endMessage.length > 0 ? endMessage : ''}</p>
                </div>
            </div>
        )
    }

    if(loading) {
        return (
            <div className="px-[170px] mt-12 font-inter mb-14 flex flex-col items-center">
                <div className="bg-white font-ibm text-blue-500 p-2">
                    <p>Loading...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="px-[170px] mt-12 font-inter mb-14 flex flex-col items-center">
            <div className={flash.length > 0 ? ` bg-white font-ibm text-red-500 p-2` : `hidden`} >
                <p>{flash.length > 0 ? flash : ''}</p>
            </div>
            <form onSubmit={handleFormSubmit} className="max-w-md mx-auto bg-white p-6 shadow-lg rounded-lg border-2 border-slate-400">
                <h2 className="text-2xl font-semibold mb-4">Reset Your Password</h2>
                <div className="mb-4">
                    <label htmlFor="password" className="block text-gray-700 font-medium mb-2">New Password</label>
                    <input onChange={(e) => handleFormChange(e)} type="password" id="password" name="password" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="confirm_password" className="block text-gray-700 font-medium mb-2">Confirm New Password</label>
                    <input onChange={(e) => handleFormChange(e)} type="password" id="confirm_password" name="confirm_password" className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
                </div>
                <button onClick={(e) => handleFormSubmit(e)} type="submit" className="w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700 transition-colors">Submit</button>
            </form>
        </div>
    )
}

export default ResetPassword