import React, { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { motion, AnimatePresence } from 'motion/react'
import { BsRobot, BsCoin, BsPen } from 'react-icons/bs'
import { HiOutlineLogout } from 'react-icons/hi'
import { MdHistory } from 'react-icons/md'
import { FaUserAstronaut } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { serverURL } from '../App'
import { setUserData } from '../redux/userSlice.js'
import AuthModel from './AuthModel.jsx'
import GooeyNav from './GooeyNav.jsx'

function Navbar() {
  const { userData } = useSelector((state) => state.user)
  const [showDropdown, setShowDropdown] = useState(false)
  const [showCreditPopup, setShowCreditPopup] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const dropdownRef = useRef(null)
  const creditRef = useRef(null)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userName = userData ? (userData.name || userData.displayName || 'User') : ''
  const userInitial = userName ? userName.trim().charAt(0).toUpperCase() : null
  const userCredits = userData ? (userData.credits ?? 100) : 0

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false)
      }
      if (creditRef.current && !creditRef.current.contains(e.target)) {
        setShowCreditPopup(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    try {
      setShowDropdown(false)
      dispatch(setUserData(null))
      await axios.post(serverURL + '/api/auth/logout', {}, { withCredentials: true })
    } catch (error) {
      console.error(error)
    }
  }

  const handleSignIn = () => {
    setShowDropdown(false)
    setShowAuthModal(true)
  }

  return (
    <div className='bg-[#f3f3f3] flex justify-center px-4 pt-6'>
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.05 }}
        className='w-full max-w-6xl bg-white rounded-[24px] shadow-sm
        border border-gray-200 px-8 py-4 flex justify-between items-center relative'
      >

        {/* Logo */}
        <div className='flex items-center gap-3 cursor-pointer' onClick={() => navigate('/')}>
          <div className='bg-black text-white p-2 rounded-lg'>
            <BsRobot size={18} />
          </div>
          <h1 className='font-semibold hidden md:block text-lg'>
            InterviewIQ.AI
          </h1>
        </div>

        {/* Right Side */}
        <div className='flex items-center gap-4 relative'>

          <div className="hidden sm:block">
            <GooeyNav
              items={[
                { 
                  label: <span className="flex items-center gap-2"><BsPen size={16} /> Practice</span>, 
                  onClick: () => window.open('https://practice-iq.vercel.app/', '_blank') 
                }
              ]}
              initialActiveIndex={-1}
            />
          </div>

          {/* Credits (only shown when logged in) */}
          {userData && (
            <div className='relative' ref={creditRef}>
              <button
                onClick={() => setShowCreditPopup((prev) => !prev)}
                className='flex items-center gap-2 bg-gray-100
                px-4 py-2 rounded-full text-sm hover:bg-gray-200 transition cursor-pointer'
              >
                <BsCoin size={16} />
                {userCredits}
              </button>

              <AnimatePresence>
                {showCreditPopup && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className='absolute top-full mt-2 right-0 w-52 bg-white
                    rounded-xl shadow-lg border border-gray-100 p-4 text-sm text-gray-700 z-50'
                  >
                    <p className='mb-4'>Need more credits to continue your interview?</p>
                    <button
                      onClick={() => { navigate('/pricing'); setShowCreditPopup(false) }}
                      className='w-full bg-black text-white py-2 rounded-lg text-sm cursor-pointer hover:opacity-80 transition'
                    >
                      Buy More Credits
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* User Icon / Auth Dropdown */}
          <div className='relative' ref={dropdownRef}>
            <button
              onClick={() => setShowDropdown((prev) => !prev)}
              className='w-9 h-9 bg-black text-white rounded-full
              flex items-center justify-center font-semibold cursor-pointer
              hover:opacity-80 transition text-sm'
            >
              {userData
                ? (userInitial || <FaUserAstronaut size={16} />)
                : <BsRobot size={16} />
              }
            </button>

            <AnimatePresence>
              {showDropdown && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className='absolute top-full mt-2 right-0 w-52 bg-white
                  rounded-xl shadow-lg border border-gray-100 p-2 text-sm text-gray-700 z-50'
                >
                  {userData ? (
                    <>
                      {/* User Name */}
                      <div className='px-3 py-2 mb-1 border-b border-gray-100'>
                        <p className='font-semibold text-black truncate'>{userName}</p>
                        <p className='text-xs text-gray-400 mt-0.5'>Logged in</p>
                      </div>

                      {/* View History */}
                      <button
                        onClick={() => { navigate('/history'); setShowDropdown(false) }}
                        className='w-full flex items-center gap-2 text-left px-3 py-2
                        rounded-lg hover:bg-gray-50 text-gray-600 hover:text-black transition cursor-pointer'
                      >
                        <MdHistory size={16} />
                        View History
                      </button>

                      {/* Logout */}
                      <button
                        onClick={handleLogout}
                        className='w-full flex items-center gap-2 text-left px-3 py-2
                        rounded-lg hover:bg-red-50 text-red-500 hover:text-red-600 transition cursor-pointer'
                      >
                        <HiOutlineLogout size={16} />
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      {/* View History (logged out) */}
                      <button
                        onClick={() => { navigate('/history'); setShowDropdown(false) }}
                        className='w-full flex items-center gap-2 text-left px-3 py-2
                        rounded-lg hover:bg-gray-50 text-gray-600 hover:text-black transition cursor-pointer'
                      >
                        <MdHistory size={16} />
                        View History
                      </button>

                      {/* Sign In */}
                      <button
                        onClick={handleSignIn}
                        className='w-full flex items-center gap-2 text-left px-3 py-2
                        rounded-lg hover:bg-blue-50 text-blue-500 hover:text-blue-600 transition cursor-pointer'
                      >
                        <FaUserAstronaut size={14} />
                        Sign In
                      </button>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Auth Modal */}
        {showAuthModal && <AuthModel onClose={() => setShowAuthModal(false)} />}

      </motion.div>
    </div>
  )
}

export default Navbar