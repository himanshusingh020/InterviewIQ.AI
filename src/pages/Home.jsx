import React from "react";
import Navbar from "../components/Navbar";
import AnimatedAIPoweredText from "../components/AnimatedAIPoweredText";
import AnimatedBackground from "../components/AnimatedBackground";
import GooeyNav from "../components/GooeyNav";
import { motion } from "framer-motion";
import {
  BsArrowRight,
  BsStars,
  BsLightningCharge,
  BsShieldCheck,
  BsRobot,
  BsMic,
  BsClock,
  BsGraphUp,
  BsFileEarmarkText,
  BsFilePdf,
  BsRocket
} from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "../App.css";

// Import AI Capabilities Images
import aiAnsImg from "../assets/ai-ans.png";
import resumeImg from "../assets/resume.png";
import pdfImg from "../assets/pdf.png";
import historyImg from "../assets/history.png";

// Import Multiple Interview Modes Images
import hrImg from "../assets/HR.png";
import techImg from "../assets/tech.png";
import confiImg from "../assets/confi.png";
import creditImg from "../assets/credit.png";

const Home = () => {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user || {});

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <div className="min-h-screen bg-[#f3f3f3] flex flex-col font-sans text-gray-900 overflow-x-hidden">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative px-6 pt-20 pb-32 md:pt-32 md:pb-24 flex flex-col items-center text-center">
          <AnimatedBackground />

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl relative z-10"
          >
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-gray-100 mb-8"
            >
              <BsStars className="text-amber-500" />
              <span className="text-sm font-medium">
                Revolutionize your career with AI
              </span>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl font-bold tracking-tight mb-6 flex flex-col items-center"
            >
              <span className="flex gap-x-3 md:gap-x-4">
                {["Master", "Your", "Next"].map((word, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{
                      duration: 0.8,
                      ease: [0.2, 0.65, 0.3, 0.9],
                      delay: i * 0.15 + 0.2, // Staggered entry from left to right
                    }}
                    className="bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-600 inline-block"
                  >
                    {word}
                  </motion.span>
                ))}
              </span>
              
              <span className="flex items-center mt-2 flex-wrap justify-center">
                <AnimatedAIPoweredText />
                
                <motion.span
                  initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                    delay: 1.8, // Waits for "AI-Powered" to finish its cinematic entry
                  }}
                  className="bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-600 ml-3 md:ml-5 inline-block"
                >
                  Interview
                </motion.span>
              </span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Experience realistic mock interviews with personalized feedback,
              expert insights, and performance tracking to land your dream job.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap justify-center gap-4"
            >
              <GooeyNav 
                items={[
                  { 
                    label: <span className="flex items-center gap-2">Start Free Interview <BsArrowRight size={20} /></span>, 
                    onClick: () => navigate(userData ? "/dashboard" : "/auth") 
                  },
                  { 
                    label: "View Pricing", 
                    onClick: () => navigate("/pricing") 
                  }
                ]}
              />
            </motion.div>
          </motion.div>
        </section>

        {/* How It Works Section */}
        <section className="px-6 py-20 bg-[#f3f3f3]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                How <span className="text-blue-600">It Works</span>
              </h2>
              <p className="text-gray-500">Three simple steps to interview excellence.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-12 items-center">
              {[
                {
                  step: "STEP 1",
                  title: "Role & Experience Selection",
                  desc: "AI adjusts difficulty based on selected job role.",
                  icon: <BsRobot size={24} />,
                  tilt: "-rotate-6",
                },
                {
                  step: "STEP 2",
                  title: "Smart Voice Interview",
                  desc: "Dynamic follow-up questions based on your answers.",
                  icon: <BsMic size={24} />,
                  tilt: "rotate-0",
                },
                {
                  step: "STEP 3",
                  title: "Timer Based Simulation",
                  desc: "Real interview pressure with time tracking.",
                  icon: <BsClock size={24} />,
                  tilt: "rotate-6",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: i * 0.2, ease: "easeOut" }}
                  whileHover={{ scale: 1.05, rotate: 0 }}
                  className={`${item.tilt} animated-border-card bg-white p-8 rounded-[32px] shadow-lg border border-gray-100 flex flex-col items-center text-center transition-all duration-300 cursor-default`}
                >
                  <div className="mb-6 bg-white border border-blue-100 p-4 rounded-2xl shadow-sm inline-flex items-center justify-center text-blue-600">
                    {item.icon}
                  </div>
                  <span className="text-[10px] font-bold tracking-widest text-blue-600 mb-2">
                    {item.step}
                  </span>
                  <h3 className="text-xl font-bold mb-3 px-4">{item.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Advanced AI Capabilities Section */}
        <section className="px-6 py-24 bg-white overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Advanced AI <span className="text-blue-600">Capabilities</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "AI Answer Evaluation",
                  desc: "Scores communication, technical accuracy and confidence.",
                  icon: <BsGraphUp size={18} />,
                  img: aiAnsImg,
                },
                {
                  title: "Resume Based Interview",
                  desc: "Project-specific questions based on uploaded resume.",
                  icon: <BsFileEarmarkText size={18} />,
                  img: resumeImg,
                },
                {
                  title: "Downloadable PDF Report",
                  desc: "Detailed strengths, weaknesses and improvement insights.",
                  icon: <BsFilePdf size={18} />,
                  img: pdfImg,
                },
                {
                  title: "History & Analytics",
                  desc: "Track progress with performance graphs and topic analysis.",
                  icon: <BsRocket size={18} />,
                  img: historyImg,
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white border border-gray-100 rounded-[32px] p-6 flex flex-col sm:flex-row items-center gap-6 shadow-sm hover:shadow-xl transition-all group"
                >
                  {/* Illustration Part */}
                  <div className="w-full sm:w-1/2 flex justify-center">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="max-w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Content Part */}
                  <div className="w-full sm:w-1/2 text-left space-y-3">
                    <div className="bg-blue-50 text-blue-600 p-2 rounded-lg inline-flex items-center justify-center">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Multiple Interview Modes Section */}
        <section className="px-6 py-24 bg-[#f3f3f3] overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Multiple Interview <span className="text-blue-600">Modes</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "HR Interview Mode",
                  desc: "Behavioral and communication based evaluation.",
                  img: hrImg,
                },
                {
                  title: "Technical Mode",
                  desc: "Deep technical questioning based on selected role.",
                  img: techImg,
                },
                {
                  title: "Confidence Detection",
                  desc: "Basic tone and voice analysis insights.",
                  img: confiImg,
                },
                {
                  title: "Credits System",
                  desc: "Unlock premium interview sessions easily.",
                  img: creditImg,
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                  whileHover={{ y: -10, scale: 1.02 }}
                  className="bg-white border border-gray-100 rounded-[32px] p-8 flex flex-col sm:flex-row items-center gap-6 shadow-sm hover:shadow-xl transition-all group"
                >
                  {/* Content Part (Left) */}
                  <div className="w-full sm:w-1/2 text-left space-y-3">
                    <h3 className="text-xl font-bold text-gray-900">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>

                  {/* Illustration Part (Right) */}
                  <div className="w-full sm:w-1/2 flex justify-center">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="max-w-[140px] h-auto object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-24 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Why Choose <span className="text-blue-600">InterviewIQ?</span>
              </h2>
              <p className="text-gray-500">
                State-of-the-art tools to sharpen your professional edge.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <BsLightningCharge className="text-blue-500" size={24} />,
                  title: "Real-time Feedback",
                  desc: "Get instant analysis on your answers, body language, and tone of voice.",
                },
                {
                  icon: <BsStars className="text-amber-500" size={24} />,
                  title: "AI-Tailored Questions",
                  desc: "Dynamic questions tailored to your specific job role and experience level.",
                },
                {
                  icon: <BsShieldCheck className="text-blue-600" size={24} />,
                  title: "Progress Tracking",
                  desc: "Detailed reports and analytics to monitor your improvement over time.",
                },
              ].map((feat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="p-8 rounded-3xl bg-[#f9f9f9] border border-gray-100"
                >
                  <div className="mb-6 bg-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-sm">
                    {feat.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feat.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feat.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 px-6 bg-white">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="bg-black text-white p-2 rounded-lg">
              <BsRobot size={18} />
            </div>
            <span className="font-bold text-lg text-black">InterviewIQ.AI</span>
          </div>

          <div className="flex gap-8 text-sm text-gray-500">
            <a href="#" className="hover:text-black transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-black transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-black transition-colors">
              Contact
            </a>
          </div>

          <p className="text-gray-400 text-sm">
            © 2024 InterviewIQ. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;