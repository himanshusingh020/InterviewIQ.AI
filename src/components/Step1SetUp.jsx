import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import { serverURL } from '../App'
import { BsPerson, BsMic, BsGraphUp, BsBriefcase, BsArrowRight, BsCloudUpload, BsCheckCircleFill } from 'react-icons/bs'

function Step1SetUp({ onStart }) {
  const [role, setRole] = useState('')
  const [experience, setExperience] = useState('')
  const [type, setType] = useState('Technical Interview')
  const [resume, setResume] = useState(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [analysisDone, setAnalysisDone] = useState(false)
  const [projects, setProjects] = useState([])
  const [skills, setSkills] = useState([])
  const [resumeText, setResumeText] = useState('')
  const fileInputRef = useRef(null)

  const handleAnalysis = async (resumeFile) => {
    if (!resumeFile || analyzing) return
    setAnalyzing(true)

    const formData = new FormData()
    formData.append("resume", resumeFile)

    try {
      const result = await axios.post(serverURL + "/api/interview/resume", formData, {
        withCredentials: true
      })
      console.log(result.data)
      setRole(result.data.role || "")
      setExperience(result.data.experience || "")
      setProjects(result.data.projects || [])
      setSkills(result.data.skills || [])
      setResumeText(result.data.resumeText || "")
      setAnalysisDone(true)
    } catch (error) {
      console.error("Analysis failed:", error)
      const errorMsg = error.response?.data?.error || error.message || "Failed to analyze resume."
      alert("Analysis Error: " + errorMsg)
    } finally {
      setAnalyzing(false)
    }
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (file && file.type === 'application/pdf') {
      setResume(file)
      handleAnalysis(file)
    } else {
      alert("Please upload a PDF file.")
    }
  }

  const features = [
    { icon: <BsPerson size={20} />, text: 'Choose Role & Experience' },
    { icon: <BsMic size={20} />, text: 'Smart Voice Interview' },
    { icon: <BsGraphUp size={20} />, text: 'Performance Analytics' },
  ]

  // Animation Variants
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1], 
        staggerChildren: 0.12, 
        delayChildren: 0.3 
      }
    }
  }

  const textRevealVariants = {
    hidden: { y: 30, opacity: 0, filter: 'blur(8px)' },
    visible: { 
      y: 0, 
      opacity: 1, 
      filter: 'blur(0px)',
      transition: { duration: 0.7, ease: "easeOut" }
    }
  }

  const cardVariants = {
    hidden: { x: -30, opacity: 0, scale: 0.95 },
    visible: { 
      x: 0, 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  }

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className='min-h-screen flex items-center justify-center bg-[#f8fafc] px-4'>

      <div className='w-full max-w-5xl bg-white rounded-[48px] shadow-2xl flex flex-col md:flex-row overflow-hidden border border-gray-100/50'>
        
        {/* Left Side: Info Panel (Blue Theme) */}
        <div className='md:w-[48%] bg-[#f0f9ff] p-12 lg:p-16 flex flex-col justify-center relative overflow-hidden'>
          
          {/* Subtle background glow */}
          <div className="absolute top-0 left-0 w-full h-full bg-linear-to-tr from-blue-100/30 to-transparent pointer-none" />

          <motion.h2 
            variants={textRevealVariants}
            className='text-4xl font-extrabold text-[#1a2e35] mb-6 tracking-tight leading-tight z-10'
          >
            Start Your <br/>
            <span className="text-blue-600">AI Interview</span>
          </motion.h2>
          
          <motion.p 
            variants={textRevealVariants}
            className='text-gray-500 text-sm leading-relaxed mb-12 max-w-sm z-10'
          >
            Experience realistic mock interviews powered by advanced AI. Improve your performance with deep insights into your communication and technical skills.
          </motion.p>

          <div className='space-y-4 z-10'>
            {features.map((feature, i) => (
              <motion.div
                key={i}
                variants={cardVariants}
                whileHover={{ scale: 1.02, x: 8, backgroundColor: "#ffffff" }}
                whileTap={{ scale: 0.98 }}
                className='flex items-center gap-4 bg-white/80 backdrop-blur-sm p-5 rounded-3xl shadow-sm border border-blue-50 hover:shadow-lg hover:border-blue-100 transition-all duration-300 cursor-pointer group'
              >
                <div className='p-3 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all duration-500'>
                  {feature.icon}
                </div>
                <span className='font-bold text-gray-700 text-[15px]'>
                  {feature.text}
                </span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Side: Interview SetUp Form */}
        <motion.div 
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ duration: 0.8, delay: 0.6 }}
           className='flex-1 bg-white p-12 lg:p-16 flex flex-col justify-center'
        >
          <div className='max-w-md w-full mx-auto space-y-6'>
            <h2 className='text-3xl font-bold text-gray-800 tracking-tight'>Interview SetUp</h2>

            <div className='space-y-4'>
              {/* Role Input */}
              <div className='relative group'>
                <div className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors'>
                  <BsPerson size={20} />
                </div>
                <input 
                  type="text"
                  placeholder="Enter role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className='w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl outline-none focus:border-blue-200 focus:bg-white focus:ring-4 focus:ring-blue-50/50 transition-all text-gray-700'
                />
              </div>

              {/* Experience Input */}
              <div className='relative group'>
                <div className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors'>
                  <BsBriefcase size={20} />
                </div>
                <input 
                  type="text"
                  placeholder="Experience (e.g. 2 years)"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className='w-full pl-12 pr-4 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl outline-none focus:border-blue-200 focus:bg-white focus:ring-4 focus:ring-blue-50/50 transition-all text-gray-700'
                />
              </div>

              {/* Type Select */}
              <select 
                value={type}
                onChange={(e) => setType(e.target.value)}
                className='w-full px-6 py-3.5 bg-gray-50/50 border border-gray-100 rounded-2xl outline-none focus:border-blue-300 focus:bg-white transition-all text-gray-700 appearance-none cursor-pointer hover:bg-white'
              >
                <option value="Technical Interview">Technical Interview</option>
                <option value="HR Interview">HR Interview</option>
              </select>

              {/* Resume Upload Section */}
              <motion.div 
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className={`border-2 border-dashed rounded-2xl p-6 text-center transition-all group ${
                  analysisDone ? 'border-blue-400 bg-blue-50/20' : 'border-gray-200 cursor-pointer hover:border-blue-400 hover:bg-blue-50/50'
                }`}
                onClick={() => !analyzing && fileInputRef.current.click()}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  className="hidden" 
                  accept=".pdf"
                />
                <div className='flex flex-col items-center gap-2'>
                   {analysisDone ? (
                     <BsCheckCircleFill size={32} className="text-blue-500" />
                   ) : (
                     <BsCloudUpload size={28} className={`${analyzing ? 'text-blue-400 animate-bounce' : 'text-gray-400 group-hover:text-blue-500'} transition-colors`} />
                   )}
                   
                   <span className='text-xs font-semibold text-gray-500 group-hover:text-blue-600 uppercase tracking-wider'>
                      {analyzing ? "Analyzing..." : (resume ? resume.name : "Upload Resume (PDF)")}
                   </span>

                   {analyzing ? (
                     <div className="mt-2 bg-slate-900 text-white px-4 py-1.5 rounded-full text-[10px] font-bold animate-pulse">
                        Analyzing AI Profile...
                     </div>
                   ) : !analysisDone && (
                     <p className='text-[10px] text-gray-400'>Click or drag and drop your file here</p>
                   )}
                   
                   {analysisDone && (
                     <p className='text-[10px] text-blue-500 font-bold'>Analysis Complete</p>
                   )}
                </div>
              </motion.div>
            </div>

            <motion.button 
              onClick={() => onStart({ role, experience, type, resume, projects, skills, resumeText })}
              whileHover={{ scale: 1.02, boxShadow: "0 20px 25px -5px rgb(37 99 235 / 0.1)" }}
              whileTap={{ scale: 0.98 }}
              className={`w-full py-4 rounded-3xl font-bold text-lg flex items-center justify-center gap-3 shadow-xl transition-all ${
                analyzing ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 text-white shadow-blue-200"
              }`}
              disabled={analyzing}
            >
                {analyzing ? "Please wait..." : "Launch session"} <BsArrowRight size={20} />
            </motion.button>
          </div>
        </motion.div>

      </div>

    </motion.div>
  )
}

export default Step1SetUp