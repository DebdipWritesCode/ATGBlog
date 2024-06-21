import { useEffect, useState } from "react"
import { useLocation, useParams } from "react-router-dom"
import axios from "axios"
import { CgProfile } from "react-icons/cg";
import { FaRegShareSquare, FaRegHeart, FaPrint, FaQuoteLeft, FaQuoteRight, FaRegComment, FaHeart } from "react-icons/fa";

const SinglePost = () => {
    const backendURL = import.meta.env.VITE_BACKEND_URL
    const [post, setPost] = useState({})
    const [loading, setLoading] = useState(true)
    const [isLiked, setIsLiked] = useState(false)
    const [isLinkCopied, setIsLinkCopied] = useState(false)
    const [totalLikes, setTotalLikes] = useState(0)
    const [comment, setComment] = useState('')
    const { postID } = useParams()
    const location = useLocation()

    function handleCopyLink() {
        const currentURL = window.location.origin + location.pathname
        navigator.clipboard.writeText(currentURL)
        setIsLinkCopied(true)
    }

    async function fetchPost() {
        setLoading(true)
        try {
            const response = await axios.get(backendURL + 'posts/' + postID)
            setPost(response.data.post)
            console.log(response.data.post)
            if (response.data.post.likes) {
                setTotalLikes(response.data.post.likes.length)
            }
            if (response.data.post.likes && response.data.post.likes.includes(localStorage.getItem('userID'))) {
                setIsLiked(true)
            }
            setLoading(false)
        }
        catch (err) {
            setLoading(false)
            console.log(err)
        }
    }

    async function handleLike() {
        if (isLiked) {
            try {
                const response = await axios.post(backendURL + 'posts/remove-like', {
                    postID: postID,
                    userID: localStorage.getItem('userID')
                })
                setIsLiked(false)
                if (totalLikes > 0) {
                    setTotalLikes(totalLikes - 1)
                }
            }
            catch (err) {
                console.log(err)
            }
        }
        else {
            try {
                const response = await axios.post(backendURL + 'posts/add-like', {
                    postID: postID,
                    userID: localStorage.getItem('userID')
                })
                setIsLiked(true)
                setTotalLikes(totalLikes + 1)
            }
            catch (err) {
                console.log(err)
            }
        }
    }

    async function handleSubmitComment(e) {
        e.preventDefault();
        try {
            const response = await axios.post(backendURL + 'posts/add-comment', {
                postID: postID,
                userID: localStorage.getItem('userID'),
                comment: comment
            })
            window.location.reload()
        }
        catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        fetchPost()
        if (!localStorage.getItem('token')) {
            return;
        }
    }, [])

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="p-8 bg-white shadow-lg rounded-lg">
                    <h1 className="text-4xl font-bold text-gray-800">Loading...</h1>
                </div>
            </div>
        )
    }

    return (
        <div className=" mx-[170px] font-inter">
            <h1 className=" text-5xl font-bold mt-6 leading-[70px]">{post.title}</h1>
            <div className="border-y flex justify-between px-4 py-2 items-center mt-2">
                <div className="flex items-center gap-4">
                    <CgProfile size={38} />
                    <div className=" flex flex-col">
                        <h4 className="font-semibold">
                            {
                                post.author ? post.author.first_name + ' ' + post.author.last_name : 'Unknown'
                            }
                        </h4>
                        <p className="text-slate-500 text-sm">{post.date && post.date.split('T')[0]}</p>
                    </div>
                </div>
                <div className=" flex items-center gap-8">
                    <button onClick={() => handleLike()} className="flex gap-2 items-center border-2 border-slate-800 text-slate-800 px-3 py-1 rounded-md hover:bg-slate-200">
                        <p>{totalLikes}</p>
                        {
                            isLiked ? <FaHeart color="red" /> : <FaRegHeart />
                        }
                    </button>
                    <button onClick={() => handleCopyLink()} className="flex gap-2 items-center border-2 border-slate-800 text-slate-800 px-3 py-1 rounded-md hover:bg-slate-200">
                        {
                            isLinkCopied ? <p>Link Copied</p>
                                : <>
                                    <p>Share</p>
                                    <FaRegShareSquare />
                                </>
                        }
                    </button>
                    <button className="flex gap-2 items-center border-2 border-slate-800 text-slate-800 px-3 py-1 rounded-md hover:bg-slate-200">
                        <p>Print</p>
                        <FaPrint />
                    </button>
                </div>
            </div>
            <div className="">
                <img src={`${backendURL}${post.imageURL}`} alt={post.title} className="w-full h-[400px] object-cover mt-6" />
            </div>
            <div className="mt-8 bg-gray-200 p-6 py-4 rounded-xl">
                <span>
                    <FaQuoteLeft size={26} className=" inline mr-4" />
                </span>
                <p className="inline font-medium leading-7 text-justify">{post.summary}</p>
                <span>
                    <FaQuoteRight size={26} className="inline ml-4" />
                </span>
            </div>
            <div className="mt-8 text-justify leading-8">
                <p>{post.content}</p>
            </div>
            <div className="mt-6 mb-6">
                <div className=" flex gap-4 items-center">
                    <h3 className=" font-bold text-3xl">Comments</h3>
                    <FaRegComment size={30} />
                </div>
            </div>
            <form onSubmit={handleSubmitComment} className="flex flex-col items-end gap-5">
                <input onChange={(e) => setComment(e.target.value)} type="text" name="comment" id="comment" placeholder="Share your thoughts" className="w-full border-2 border-slate-500 p-4 text-lg" />
                <button onClick={(e) => handleSubmitComment(e)} className="bg-slate-800 text-white px-6 py-2 rounded-md">Post</button>
            </form>
            <div className="">
                {
                    post.comments && post.comments.length > 0 ? (
                        post.comments.map(comment => (
                            <div key={comment._id} className="bg-gray-100 p-4 rounded-lg mb-4 shadow-md mt-4">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-gray-800 font-semibold">{comment.author.first_name} {comment.author.last_name}</span>
                                        <span className="text-gray-500 text-sm">{new Date(comment.date).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <p className="text-gray-700">{comment.content}</p>
                            </div>
                        ))
                    ) : (
                        <div className="">
                            <p className="my-8 text-3xl text-center font-semibold">No comments yet!</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default SinglePost