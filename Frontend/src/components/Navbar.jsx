import { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import AuthModal from "./AuthModal";

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [token, setToken] = useState(null);
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUserName = localStorage.getItem("userName");

    if (savedToken) setToken(savedToken);
    if (savedUserName) setUserName(savedUserName);
  }, []);

  const handleModalOpen = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const NavButton = ({ to, children, className = "" }) => (
    <Link to={to}>
      <button className={`text-xl ${className}`}>{children}</button>
    </Link>
  );

  return (
    <nav className="font-inter px-[170px] py-7 flex justify-between items-center h-[90px]">
      {token ? (
        <div className="font-semibold text-xl">
          <h2 className="text-xl">
            Welcome back! <span className="text-blue-600">{userName}</span>
          </h2>
        </div>
      ) : (
        <div onClick={handleModalOpen} className="font-semibold text-xl">
          <h2 className="hover:underline cursor-pointer">
            Create Account <span className="text-blue-600">It's free!</span>
          </h2>
        </div>
      )}
      <div className="flex gap-12 items-center">
        {token && (
          <NavButton to="new-post" className="bg-blue-600 text-white py-2 px-6 rounded-xl">
            Add
          </NavButton>
        )}
        <NavButton to="/">Home</NavButton>
        {token && <NavButton to="my-posts">My Posts</NavButton>}
      </div>
      {isModalOpen && <AuthModal modalCloser={setIsModalOpen} />}
    </nav>
  );
};

export default Navbar;
