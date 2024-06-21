import { Routes, Route, Navigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import NewPost from "./pages/NewPost"
import Home from "./pages/Home"
import MyPosts from "./pages/MyPosts"
import { useState, useEffect } from "react"
import ResetPassword from "./pages/ResetPassword"
import SinglePost from "./pages/SinglePost"
import EditPost from "./pages/EditPost"

function App() {
  const [tokenExpired, setTokenExpired] = useState(false);

  useEffect(() => {
    const checkTokenExpiry = () => {
      const token = localStorage.getItem('token');
      const expiresIn = localStorage.getItem('expiresIn');
      
      if (token && expiresIn) {
        const expiryTime = Date.now() + parseInt(expiresIn, 10) * 1000
        
        if (Date.now() >= expiryTime) {
          localStorage.removeItem('token')
          localStorage.removeItem('userName')
          localStorage.removeItem('userID')
          localStorage.removeItem('expiresIn')
          return true
        }
      }
      return false
    }

    if (checkTokenExpiry()) {
      setTokenExpired(true)
    }
  }, [])

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-post" element={<NewPost />} />
        <Route path="/my-posts" element={<MyPosts />} />
        <Route path='/posts/:postID' element={<SinglePost />} />
        <Route path='/posts/:postID/edit' element={<EditPost />} />
        {tokenExpired && <Navigate to='/' />}
        <Route path="/reset-password/:userID" element={<ResetPassword />} />
      </Routes>
    </>
  )
}

export default App
