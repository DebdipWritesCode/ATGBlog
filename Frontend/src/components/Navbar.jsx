import { useState } from "react"
import { Link } from "react-router-dom"
import AuthModal from "./AuthModal"

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const token = localStorage.getItem('token')
  const userName = localStorage.getItem('userName')

  return (
    <nav className=" font-inter px-[170px] py-7 flex justify-between items-center h-[90px]">
      {
        token ? (
          <div className="font-semibold text-xl">
            <h2 className=" text-xl">Welcome back!
              <span className=" text-blue-600"> {userName}</span>
            </h2>
          </div>
        ) : (
          <div onClick={() => setIsModalOpen(true)} className=" font-semibold text-xl">
            <h2 className=" hover:underline cursor-pointer">Create Account
              <span className=" text-blue-600"> It's free!</span>
            </h2>
          </div>
        )
      }
      <div className=" flex gap-12 text-xl items-center">
        {token && (
          <Link to='new-post'>
            <button className="bg-blue-600 text-white py-2 px-6 rounded-xl">Add</button>
          </Link>
        )}
        <Link to='/'>
          <button>Home</button>
        </Link>
        {token && (
          <Link to='my-posts'>
            <button>My Posts</button>
          </Link>
        )}
      </div>
      {
        isModalOpen && <AuthModal modalCloser={setIsModalOpen} />
      }
    </nav>
  )
}

export default Navbar