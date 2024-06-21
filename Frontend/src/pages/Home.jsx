import { useEffect, useState } from "react"
import AllPosts from "../components/AllPosts"
import Hero from "../components/Hero"
import Pagination from "../components/Pagination"
import Recents from "../components/Recents"
import axios from "axios"

const Home = () => {
  const backendURL = import.meta.env.VITE_BACKEND_URL
  const [page, setPage] = useState(1)
  const [posts, setPosts] = useState([])
  const [recentPosts, setRecentPosts] = useState([])
  const [totalPosts, setTotalPosts] = useState(0)
  const [loading, setLoading] = useState(true)
  const [isFetching, setIsFetching] = useState(true)
  const postsPerPage = 6

  async function fetchPosts() {
    setLoading(true)
    const query = `?page=${page}&limit=${postsPerPage}`
    try {
      const response = await axios.get(backendURL + 'posts/all-posts' + query)
      setPosts(response.data.posts)
      setTotalPosts(response.data.totalItems)
      setLoading(false)
    }
    catch(err) {
      setLoading(false)
      console.log(err)
    }
  }

  async function fetchRecentPosts() {
    setIsFetching(true)
    try {
      const response = await axios.get(backendURL + 'posts/recent-posts')
      setRecentPosts(response.data.posts)
      setIsFetching(false)
    }
    catch(err) {
      setIsFetching(false)
      console.log(err)
    }
  }

  useEffect(() => {
    fetchPosts()
    fetchRecentPosts()
  }, [page])

  if(loading || isFetching) {
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
      <Hero />
      <Recents blogPosts={recentPosts} />
      <AllPosts posts={posts} heading='All Blog Posts' mode='All' />
      <Pagination setPageNumber={setPage} totalPosts={totalPosts} currentPage={page} />
    </div>
  )
}

export default Home