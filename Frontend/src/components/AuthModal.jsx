import { useEffect, useState } from "react"
import { RxCross2 } from "react-icons/rx"
import { MdCancel } from "react-icons/md";
import Signup from "./Signup"
import Illustration from "../assets/Illustration.png"
import Login from "./Login"
import ForgotPassword from "./ForgotPassword";

const AuthModal = ({ modalCloser }) => {
    const [isLogin, setIsLogin] = useState(false)
    const [isForgotPassword, setIsForgotPassword] = useState(false)
    const [show, setShow] = useState(false)

    useEffect(() => {
        setShow(true)
    }, []);

    function closeModal() {
        setShow(false)
        setTimeout(() => {
            modalCloser(false)
        }, 400)
    }

    function toggleLogin(e) {
        e.preventDefault()
        setIsLogin(!isLogin)
    }

    return (
        <div className=" absolute font-ibm">
            <div className={`fixed inset-0 z-30 bg-black transition-opacity duration-300 ${show ? 'opacity-50' : 'opacity-0'}`}></div>
            <div className="fixed inset-0 z-40 flex items-center max-md:items-end justify-center">
                <div className={`w-[750px] flex flex-col gap-1 transition-all duration-300 ${show ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
                    <div className="ml-auto max-md:hidden">
                        <button onClick={closeModal} className="bg-gray-300 rounded-full p-1">
                            <RxCross2 size={18} />
                        </button>
                    </div>
                    <div className={`w-[736px] bg-white shadow-xl rounded-lg max-md:w-full ${isLogin ? 'h-[450px]' : 'h-[513px] max-md:h-[560px]'}`}>
                        <div className="h-[50px] bg-[#EFFFF4] flex items-center justify-center max-md:hidden">
                            <h2 className="text-[#008A45] font-semibold text-[14px]">
                                Let's learn, share & inspire each other with our passion for writing. Sign up now 🤘🏼
                            </h2>
                        </div>
                        <div className="p-6 max-md:flex max-md:flex-col max-md:items-center">
                            <div className="mt-2 flex justify-between max-md:w-[50%] max-[540px]:w-[80%] max-[425px]:w-full  max-md:items-center">
                                <h3 className="text-2xl font-extrabold">
                                    {isLogin && isForgotPassword ? 'Forgot Password' : isLogin && !isForgotPassword ? 'Sign In' : 'Create Account'}
                                </h3>
                                <MdCancel onClick={closeModal} size={24} className="cursor-pointer md:hidden" />
                                <p className="text-[13px] max-md:hidden">
                                    {isLogin ? "Don't have an account yet?" : "Already have an account?"}
                                    <span onClick={toggleLogin} className="text-[#2F6CE5] font-bold cursor-pointer hover:underline">
                                        {isLogin ? ' Create new for free!' : ' Sign in'}
                                    </span>
                                </p>
                            </div>
                            <div className="flex gap-2">
                                <div className="w-1/2">
                                    {isLogin && isForgotPassword  ? <ForgotPassword setLogin={setIsLogin} /> : (isLogin && !isForgotPassword) ? <Login setLogin={setIsLogin} setForgotPassword={setIsForgotPassword} /> :<Signup setLogin={setIsLogin} setForgotPassword={setIsForgotPassword} />}
                                </div>
                                <div className="w-1/2 max-md:hidden">
                                    <img src={Illustration} alt="Illustration" className="w-80 h-80" />
                                    {!isLogin && (
                                        <p className="text-[11px] mt-6 text-slate-600">
                                            By signing up, you agree to our Terms & conditions, Privacy policy
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;
