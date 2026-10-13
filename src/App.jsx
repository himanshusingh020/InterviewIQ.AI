import React, { useState, useEffect } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Pricing from './pages/Pricing'
import InterviewPage from './pages/InterviewPage'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setUserData } from './redux/userSlice.js'
import LoadingScreen from './components/LoadingScreen'
import WelcomeLoader from './components/WelcomeLoader'
import { AnimatePresence, motion } from 'framer-motion'

export const serverURL = "http://localhost:5000"

const App = () => {
  const dispatch = useDispatch()
  const location = useLocation()
  
  // Only show loaders if the visitor landed on the Home page ('/') when first opening the site
  const [isWelcomeDone, setIsWelcomeDone] = useState(location.pathname !== '/')
  const [isLoading, setIsLoading] = useState(location.pathname === '/')

  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await axios.get(serverURL + "/api/user/current-user",
          { withCredentials: true })
        dispatch(setUserData(result.data.user))
      } catch (error) {
        console.log(error)
        dispatch(setUserData(null))
      }
    }
    getUser()
  }, [dispatch])

  return (
    <>
      {!isWelcomeDone && (
        <WelcomeLoader key="welcome-loader" onComplete={() => setIsWelcomeDone(true)} />
      )}

      {isWelcomeDone && (
        <>
          <AnimatePresence mode="wait">
            {isLoading && (
              <LoadingScreen key="loading-screen" onComplete={() => setIsLoading(false)} />
            )}
          </AnimatePresence>

          {!isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, ease: "easeIn" }}
            >
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/auth' element={<Auth />} />
                <Route path='/interview' element={<InterviewPage />} />
                <Route path='/pricing' element={<Pricing />} />
              </Routes>
            </motion.div>
          )}
        </>
      )}
    </>
  )
}

export default App
