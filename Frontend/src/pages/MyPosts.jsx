import AllPosts from "../components/AllPosts"
import { useEffect, useState } from "react"
import axios from "axios"

const MyPosts = () => {
  const backendURL = import.meta.env.VITE_BACKEND_URL
  const [myPosts, setMyPosts] = useState([])
  const [loading, setLoading] = useState(false)
  
  const token = localStorage.getItem('token')
  const userID = localStorage.getItem('userID')

  async function fetchMyPosts() {
    setLoading(true)
    try {
      const query = `?userID=${userID}`
      const response = await axios.get(backendURL + 'posts/my-posts' + query)
      setMyPosts(response.data.posts)
      setLoading(false)
    }
    catch(err) {
      setLoading(false)
      console.log(err)
    }
  }

  useEffect(() => {
    fetchMyPosts()
  }, [])

  if(!token) {
    return <div>You need to be logged in to view this page</div>
  }

  if(loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="p-8 bg-white shadow-lg rounded-lg">
          <h1 className="text-4xl font-bold text-gray-800">Loading...</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="px-[170px]">
      <AllPosts posts={myPosts} heading='My Blog Posts' mode='My' />
    </div>
  )
}

export default MyPosts