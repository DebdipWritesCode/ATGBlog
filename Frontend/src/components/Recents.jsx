import React from 'react'
import { topicColors } from '../data/data'
import { GoArrowUpRight } from "react-icons/go";

const Recents = ({ blogPosts }) => {
    const backendURL = import.meta.env.VITE_BACKEND_URL
    const first = blogPosts[0]
    const second = blogPosts[1]
    const third = blogPosts[2]
    const fourth = blogPosts[3]

    return (
        <div className='font-inter'>
            <h2 className='font-inter text-2xl font-semibold mt-12'>Recent Blog Posts</h2>
            <div className="">
                <div className=" flex gap-10">
                    <div className=" w-1/2 shadow-md">
                        <div className=" mt-8">
                            <img src={backendURL + first.imageURL} alt={first.title} className='max-w-[590px] h-[228px] w-full' />
                        </div>
                        <div className=" mt-6 mb-5">
                            <h5 className='text-[#6941C6] text-sm font-semibold mb-4'>{first.author.first_name + ' ' + first.author.last_name} • {first.date.split('T')[0]}</h5>
                            <div className=" flex justify-between items-center mb-4">
                                <h3 className=' text-2xl font-semibold '>{first.title}</h3>
                                <GoArrowUpRight size={24} className=' cursor-pointer hover:border border-black' />
                            </div>
                            <p className=' text-[#667085] text-base w-[95%] mb-3'>
                                {
                                    first.content.length > 120 ? first.content.slice(0, 120) + '...' : first.content
                                }
                            </p>
                        </div>
                        <div className=" flex flex-wrap gap-4 mb-5">
                            {
                                first.topics.map((topic, index) => {
                                    const { color, backgroundColor } = topicColors[topic] || { color: '#fff', backgroundColor: '#000' };
                                    return (
                                        <div key={index} style={{ color, backgroundColor }} className='font-semibold text-sm rounded-xl px-2 py-1'>{topic}</div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div className=" w-1/2">
                        <div className="flex flex-col">
                            <div className="h-1/2 flex gap-4 shadow-md">
                                <div className=" mt-8 w-1/2">
                                    <img src={backendURL + second.imageURL} alt={second.title} className='max-w-[320px] h-full w-full' />
                                </div>
                                <div className=" w-1/2">
                                    <div className=" mt-8">
                                        <h5 className='text-[#6941C6] text-sm font-semibold mb-2'>{second.author.first_name + ' ' + second.author.last_name} • {second.date.split('T')[0]}</h5>
                                        <div className=" flex items-center">
                                            <h3 className=' text-lg font-semibold mb-2'>
                                                {
                                                    second.title.length > 40 ? second.title.slice(0, 40) + '...' : second.title
                                                }
                                            </h3>
                                        </div>
                                        <p className=' text-[#667085] text-base w-[95%] mb-3'>
                                            {
                                                second.content.length > 60 ? second.content.slice(0, 60) + '...' : second.content
                                            }
                                        </p>
                                    </div>
                                    <div className=" flex flex-wrap gap-4 mb-5">
                                        {
                                            second.topics.map((topic, index) => {
                                                const { color, backgroundColor } = topicColors[topic] || { color: '#fff', backgroundColor: '#000' };
                                                if (!index) {
                                                    return (
                                                        <div className='flex items-center gap-2' key={index}>
                                                            <div style={{ color, backgroundColor }} className='font-semibold text-[12px] rounded-xl px-2 py-1'>{topic}</div>
                                                            <p className='text-[12px]'>+{second.topics.length > 1 ? second.topics.length - 1 : null} more</p>
                                                        </div>
                                                    )
                                                }
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="h-1/2">
                                <div className="h-1/2 flex gap-4 shadow-md">
                                    <div className=" mt-4 w-1/2">
                                        <img src={backendURL + third.imageURL} alt={third.title} className='max-w-[320px] h-full w-full' />
                                    </div>
                                    <div className=" w-1/2">
                                        <div className=" mt-4">
                                            <h5 className='text-[#6941C6] text-sm font-semibold mb-2'>{third.author.first_name + ' ' + third.author.last_name} • {third.date.split('T')[0]}</h5>
                                            <div className=" flex items-center">
                                                <h3 className=' text-lg font-semibold mb-2'>
                                                    {
                                                        third.title.length > 40 ? third.title.slice(0, 40) + '...' : third.title
                                                    }
                                                </h3>
                                            </div>
                                            <p className=' text-[#667085] text-base w-[95%] mb-3'>
                                                {
                                                    third.content.length > 60 ? third.content.slice(0, 60) + '...' : third.content
                                                }
                                            </p>
                                        </div>
                                        <div className=" flex flex-wrap gap-4 mb-5">
                                            {
                                                third.topics.map((topic, index) => {
                                                    const { color, backgroundColor } = topicColors[topic] || { color: '#fff', backgroundColor: '#000' };
                                                    if (!index) {
                                                        return (
                                                            <div className='flex items-center gap-2' key={index}>
                                                                <div style={{ color, backgroundColor }} className='font-semibold text-[12px] rounded-xl px-2 py-1'>{topic}</div>
                                                                <p className='text-[12px]'>+{third.topics.length > 1 ? third.topics.length - 1 : null} more</p>
                                                            </div>
                                                        )
                                                    }
                                                })
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-4">
                    <div className=" flex gap-8 shadow-md">
                        <div className=" mt-4 w-1/2">
                            <img src={backendURL + fourth.imageURL} alt={fourth.title} className='max-w-[590px] h-[302px] w-full' />
                        </div>
                        <div className=" w-1/2">
                            <div className=" mt-4 mb-5">
                                <h5 className='text-[#6941C6] text-sm font-semibold mb-4'>{fourth.author.first_name + ' ' + fourth.author.last_name} • {fourth.date.split('T')[0]}</h5>
                                <div className=" flex justify-between items-center mb-4">
                                    <h3 className=' text-2xl font-semibold '>{fourth.title}</h3>
                                    <GoArrowUpRight size={24} className=' cursor-pointer hover:border border-black' />
                                </div>
                                <p className=' text-[#667085] text-base w-[95%] mb-3'>
                                    {
                                        fourth.content.length > 320 ? fourth.content.slice(0, 320) + '...' : fourth.content
                                    }
                                </p>
                            </div>
                            <div className=" flex flex-wrap gap-4 mb-5">
                                {
                                    fourth.topics.map((topic, index) => {
                                        const { color, backgroundColor } = topicColors[topic] || { color: '#fff', backgroundColor: '#000' };
                                        return (
                                            <div key={index} style={{ color, backgroundColor }} className='font-semibold text-sm rounded-xl px-2 py-1'>{topic}</div>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Recents