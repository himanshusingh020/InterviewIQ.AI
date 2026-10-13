import React from 'react'
import { BsRobot } from "react-icons/bs";
import { IoSparklesSharp } from "react-icons/io5";
import { motion } from "motion/react"
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from '../utils/firebase';
import { signInWithPopup } from "firebase/auth";
import axios from 'axios';
import { serverURL } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice.js';






function Auth({ isModel = false }) {
  const dispatch = useDispatch()

  const handleGoogleAuth = async () => {
    try {
      const response = await signInWithPopup(auth, provider);

      let User = response.user;
      let name = User.displayName;
      let email = User.email;
      const res = await axios.post(serverURL + "/api/auth/google",
        { name, email }, { withCredentials: true })
      dispatch(setUserData(res.data.user))

    } catch (error) {
      console.error(error);
      dispatch(setUserData(null))
    }
  };

  return (
    <div className={isModel ? '' : 'w-full min-h-screen bg-[#f3f3f3] flex items-center justify-center px-6 py-20'}>
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.05 }}
        className={`w-full max-w-md p-8 rounded-3xl bg-white ${isModel ? '' : 'shadow-2xl border border-gray-200'}`}>
        <div className=' flex items-center justify-center gap-3 mb-6'>
          <div className=' bg-black text-white p-2 rounded-lg'>
            <BsRobot size={18} />

          </div>
          <h2 className=' font-semibold text-lg'>InterviewIQ.AI</h2>

        </div>
        <h1 className=' text-2xl md:text-3xl font-semibold text-center
             leading-snug mb-4'>
          Continue with
          <span className=' bg-blue-100 text-blue-600 px-3 py-1 
                 rounded-full inline-flex items-center gap-2'>
            <IoSparklesSharp size={18} />
            AI Smart Interview
          </span>
        </h1>

        <p className=' text-gray-500 text-center text-sm md:text-base
             leading-relaxed mb-8'>
          Sign in to start AI-powered mock interviews, track your progress, and unlock detailed performance insights.

        </p>
        <motion.button
          onClick={handleGoogleAuth}
          whileHover={{ opacity: 0.9, scale: 1.05 }}
          whileTap={{ opacity: 1, scale: 0.95 }}
          className=' w-full flex items-center justify-center
             gap-3 py-3 bg-black text-white rounded-full shadow-md'>
          <FcGoogle size={18} />
          Continue with Google
        </motion.button>

      </motion.div>

    </div>
  )
}

export default Auth
