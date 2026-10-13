import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { FaTimes } from 'react-icons/fa'
import Auth from '../pages/Auth.jsx'



function AuthModel({ onClose }) {
  const { userData } = useSelector((state) => state.user)

  useEffect(() => {
    if (userData) {
      onClose()
    }
  }, [userData, onClose])

  return (
    <div className=' fixed inset-0 z-[999] flex items-center justify-center bg-black/40 backdrop-blur-md px-4'>
      <div className=' relative w-full max-w-md bg-white rounded-3xl shadow-2xl'>
        <button onClick={onClose} className=' absolute top-6 right-6 text-gray-400 hover:text-black transition-colors z-[1000]'>
          <FaTimes size={20} />
        </button>
        <Auth isModel={true} />
      </div>
    </div>
  )
}

export default AuthModel
