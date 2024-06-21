import { GoArrowUpRight } from "react-icons/go";
import { topicColors } from '../data/data'
import { Link } from 'react-router-dom'
import { useState } from "react";
import DeleteModal from "./DeleteModal";

const Post = ({ id, title, date, author, content, imageURL, topics, mode }) => {
    const backendURL = import.meta.env.VITE_BACKEND_URL
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

    const imagePatth = backendURL + imageURL

    function handlePostEdit() {
        const path = `/posts/${id}/edit`
        window.location.href = path
    }

    return (
        <div className={`w-[360px] flex flex-col shadow-lg ${mode === 'All' ? 'h-[520px]' : 'h-[560px]'}`}>
            <div className="">
                <img src={imagePatth} alt={title} className="w-full h-[200px]" />
            </div>
            <div className=" mt-6 mb-5 px-3">
                <h5 className='text-[#6941C6] text-sm font-semibold mb-4'>{author.first_name + ' ' + author.last_name} • {date.split('T')[0]}</h5>
                <div className=" flex justify-between items-center mb-4">
                    <h3 className=' text-xl font-semibold max-w-[90%] '>
                        {
                            title.length > 40 ? title.slice(0, 40) + '...' : title
                        }
                    </h3>
                    <Link to={`/posts/${id}`}>
                        <GoArrowUpRight size={24} className=' cursor-pointer hover:border border-black' />
                    </Link>
                </div>
                <p className=' text-[#667085] text-base w-[95%] mb-3'>
                    {
                        content.length > 70 ? content.slice(0, 70) + '...' : content
                    }
                </p>
            </div>
            <div className=" flex flex-wrap gap-4 mb-5 px-3">
                {
                    topics.map((topic, index) => {
                        const { color, backgroundColor } = topicColors[topic] || { color: '#fff', backgroundColor: '#000' };
                        return (
                            <div key={index} style={{ color, backgroundColor }} className='font-semibold text-sm rounded-xl px-2 py-[2px]'>{topic}</div>
                        )
                    })
                }
            </div>
            {
                mode === 'My' && (
                    <div className=" flex justify-center gap-8 items-center px-3 mt-auto mb-4">
                        <button onClick={() => handlePostEdit()} className='text-base font-semibold p-2 px-10 border-2 border-[#7F56D9] text-[#7F56D9] hover:bg-purple-100'>Edit</button>
                        <button onClick={() => setIsDeleteModalOpen(true)} className='text-base font-semibold p-2 px-10 border-2 border-[#7F56D9] text-[#7F56D9] hover:bg-purple-100'>Delete</button>
                    </div>
                )
            }
            {
                isDeleteModalOpen && (
                    <DeleteModal postID={id} closeModal={setIsDeleteModalOpen} />
                )
            }
        </div>
    )
}

export default Post