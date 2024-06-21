import { CiWarning } from "react-icons/ci";
import axios from "axios";

const DeleteModal = ({ postID, closeModal }) => {
    const backendURL = import.meta.env.VITE_BACKEND_URL

    async function handleDeletePost() {
        try {
            const response = await axios.delete(backendURL + 'posts/delete-post/' + postID)
            closeModal(false)
            window.location.reload()
        }
        catch(err) {
            console.log(err)
        }
    }

    return (
        <div className="fixed w-screen h-screen top-0 left-0 font-inter">
            <div className="backdrop fixed w-full h-full bg-black opacity-20 z-20"></div>
            <div className=" fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-white rounded-lg z-30 p-4 shadow-lg">
                <div className="flex items-end mb-3 gap-2 border-b-2 pb-1">
                    <h3 className=" font-semibold text-red-600 text-2xl">Warning</h3>
                    <CiWarning size={36} fill="red" />
                </div>
                <p className="text-base font-medium my-3">Do you want to delete the post?</p>
                <div className="flex justify-around">
                    <button onClick={() => closeModal(false)} className=" bg-blue-600 py-2 px-4 rounded-lg text-white font-semibold mt-2 cursor-pointer">Cancel</button>
                    <button onClick={() => handleDeletePost()} className=" bg-red-600 py-2 px-4 rounded-lg text-white font-semibold mt-2 cursor-pointer">Delete</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteModal