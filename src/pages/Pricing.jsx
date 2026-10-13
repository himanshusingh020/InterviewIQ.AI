import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import {
  BsRobot, BsCheckCircleFill, BsXCircle, BsStars,
  BsLightningChargeFill, BsShieldFillCheck, BsArrowRight,
  BsChevronDown
} from 'react-icons/bs'
import { FaCrown } from 'react-icons/fa'
import { IoSparklesSharp } from 'react-icons/io5'

/* ─── Data ─────────────────────────────────────────────────────── */
const plans = [
  {
    name: 'Free',
    icon: <BsRobot size={22} />,
    monthlyPrice: 0,
    yearlyPrice: 0,
    color: 'from-gray-100 to-gray-50',
    border: 'border-gray-200',
    badge: null,
    cta: 'Get Started',
    ctaStyle: 'bg-black text-white hover:bg-gray-800',
    features: [
      { label: '5 AI Interview sessions/mo', ok: true },
      { label: 'Basic question bank', ok: true },
      { label: 'Answer feedback', ok: true },
      { label: 'Session history (7 days)', ok: true },
      { label: 'Advanced analytics', ok: false },
      { label: 'Resume-based questions', ok: false },
      { label: 'Priority support', ok: false },
    ],
  },
  {
    name: 'Pro',
    icon: <BsLightningChargeFill size={22} />,
    monthlyPrice: 12,
    yearlyPrice: 8,
    color: 'from-blue-600 to-indigo-600',
    border: 'border-blue-500',
    badge: 'Most Popular',
    cta: 'Start Pro',
    ctaStyle: 'bg-white text-blue-600 hover:bg-blue-50',
    popular: true,
    features: [
      { label: 'Unlimited AI sessions', ok: true },
      { label: 'Full question bank', ok: true },
      { label: 'Deep answer feedback', ok: true },
      { label: 'Unlimited session history', ok: true },
      { label: 'Advanced analytics', ok: true },
      { label: 'Resume-based questions', ok: true },
      { label: 'Priority support', ok: false },
    ],
  },
  {
    name: 'Elite',
    icon: <FaCrown size={20} />,
    monthlyPrice: 29,
    yearlyPrice: 19,
    color: 'from-amber-500 to-orange-500',
    border: 'border-amber-400',
    badge: 'Best Value',
    cta: 'Go Elite',
    ctaStyle: 'bg-white text-amber-600 hover:bg-amber-50',
    features: [
      { label: 'Everything in Pro', ok: true },
      { label: 'Human expert review', ok: true },
      { label: '1-on-1 coaching session', ok: true },
      { label: 'LinkedIn profile review', ok: true },
      { label: 'Advanced analytics', ok: true },
      { label: 'Resume-based questions', ok: true },
      { label: '24/7 Priority support', ok: true },
    ],
  },
]

const faqs = [
  {
    q: 'Can I cancel anytime?',
    a: 'Yes! No hidden fees, no lock-ins. Cancel your subscription anytime from your account settings, effective at the end of your billing period.',
  },
  {
    q: 'How does the AI generate questions?',
    a: 'Our AI analyzes your target role, experience level, and optionally your resume to craft hyper-relevant, realistic interview questions that mirror real hiring processes.',
  },
  {
    q: 'Is my data safe?',
    a: 'Absolutely. All sessions are encrypted in transit and at rest. We never share your data with third parties or use it to train models without consent.',
  },
  {
    q: 'What payment methods do you accept?',
    a: 'We accept all major credit/debit cards (Visa, Mastercard, Amex) and UPI payments via Razorpay.',
  },
  {
    q: 'Do unused credits roll over?',
    a: 'On paid plans, unused monthly credits carry over for up to 90 days. Free plan credits reset each month.',
  },
]

/* ─── Sub-components ────────────────────────────────────────────── */
function FAQItem({ q, a, index }) {
  const [open, setOpen] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className='border border-gray-200 rounded-2xl overflow-hidden bg-white'
    >
      <button
        onClick={() => setOpen(o => !o)}
        className='w-full flex items-center justify-between px-6 py-5 text-left cursor-pointer'
      >
        <span className='font-semibold text-gray-800'>{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <BsChevronDown className='text-gray-400' />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key='answer'
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className='px-6 pb-5 text-gray-500 leading-relaxed text-sm'>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ─── Page ──────────────────────────────────────────────────────── */
export default function Pricing() {
  const [yearly, setYearly] = useState(false)
  const navigate = useNavigate()

  return (
    <div className='min-h-screen bg-[#f3f3f3] font-sans text-gray-900 overflow-x-hidden'>
      <Navbar />

      {/* ── Hero ── */}
      <section className='relative px-6 pt-24 pb-16 flex flex-col items-center text-center overflow-hidden'>
        {/* background glow */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: [1, 1.15, 1], opacity: [0.07, 0.13, 0.07] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          className='absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-blue-500 rounded-full blur-[140px] -z-10 pointer-events-none'
        />

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-gray-100 mb-6'
        >
          <IoSparklesSharp className='text-amber-500' />
          <span className='text-sm font-medium'>Simple, transparent pricing</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className='text-5xl md:text-6xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-500'
        >
          Invest in your<br />
          <span className='text-blue-600'>dream career</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className='text-gray-500 text-lg max-w-xl mb-10'
        >
          Start free, upgrade when you're ready. Every plan comes with AI-powered feedback that actually helps you land the job.
        </motion.p>

        {/* Toggle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className='flex items-center gap-4 bg-white border border-gray-200 rounded-full px-2 py-2 shadow-sm'
        >
          <button
            onClick={() => setYearly(false)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${!yearly ? 'bg-black text-white shadow' : 'text-gray-500 hover:text-gray-800'}`}
          >
            Monthly
          </button>
          <button
            onClick={() => setYearly(true)}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer flex items-center gap-2 ${yearly ? 'bg-black text-white shadow' : 'text-gray-500 hover:text-gray-800'}`}
          >
            Annual
            <span className='bg-blue-100 text-blue-600 text-xs px-2 py-0.5 rounded-full font-semibold'>-35%</span>
          </button>
        </motion.div>
      </section>

      {/* ── Pricing cards ── */}
      <section className='px-6 pb-28'>
        <div className='max-w-5xl mx-auto grid md:grid-cols-3 gap-6 items-start'>
          {plans.map((plan, i) => {
            const price = yearly ? plan.yearlyPrice : plan.monthlyPrice
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.55 }}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className={`relative rounded-3xl border ${plan.border} overflow-hidden shadow-sm`}
              >
                {/* Card gradient header */}
                <div className={`bg-gradient-to-br ${plan.color} p-6 text-white`}>
                  {plan.badge && (
                    <span className='absolute top-4 right-4 bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full'>
                      {plan.badge}
                    </span>
                  )}
                  <div className='w-10 h-10 bg-white/20 rounded-2xl flex items-center justify-center mb-4'>
                    {plan.icon}
                  </div>
                  <h2 className='text-xl font-bold mb-1'>{plan.name}</h2>
                  <div className='flex items-end gap-1 mt-3'>
                    <AnimatePresence mode='wait'>
                      <motion.span
                        key={price}
                        initial={{ opacity: 0, y: -12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 12 }}
                        transition={{ duration: 0.2 }}
                        className='text-4xl font-extrabold'
                      >
                        ${price}
                      </motion.span>
                    </AnimatePresence>
                    <span className='text-white/70 mb-1 text-sm'>/mo</span>
                  </div>
                  {yearly && plan.monthlyPrice > 0 && (
                    <p className='text-white/60 text-xs mt-1 line-through'>${plan.monthlyPrice}/mo</p>
                  )}
                </div>

                {/* Features */}
                <div className='bg-white p-6 flex flex-col gap-3'>
                  {plan.features.map((f, j) => (
                    <motion.div
                      key={j}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + j * 0.05 }}
                      className='flex items-center gap-3'
                    >
                      {f.ok
                        ? <BsCheckCircleFill className='text-blue-600 shrink-0' size={16} />
                        : <BsXCircle className='text-gray-300 shrink-0' size={16} />
                      }
                      <span className={`text-sm ${f.ok ? 'text-gray-700' : 'text-gray-400'}`}>{f.label}</span>
                    </motion.div>
                  ))}

                  <button
                    onClick={() => navigate('/auth')}
                    className={`mt-4 w-full py-3 rounded-2xl font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 ${plan.ctaStyle} border border-transparent`}
                    style={plan.popular ? { background: 'linear-gradient(135deg,#2563eb,#4f46e5)', color: '#fff' } : {}}
                  >
                    {plan.cta} <BsArrowRight />
                  </button>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* ── Trust bar ── */}
      <section className='bg-white border-t border-b border-gray-100 py-12 px-6'>
        <div className='max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center'>
          {[
            { value: '50K+', label: 'Interviews completed' },
            { value: '94%', label: 'Success rate' },
            { value: '4.9★', label: 'Average rating' },
            { value: '< 2s', label: 'AI response time' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <p className='text-3xl font-extrabold text-gray-900 mb-1'>{stat.value}</p>
              <p className='text-sm text-gray-500'>{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Feature comparison callout ── */}
      <section className='px-6 py-24'>
        <div className='max-w-3xl mx-auto text-center mb-14'>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='text-3xl md:text-4xl font-bold mb-4'
          >
            Everything you need to <span className='text-blue-600'>land the offer</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className='text-gray-500'
          >
            Our AI doesn't just ask questions — it coaches you like a senior engineer would.
          </motion.p>
        </div>

        <div className='max-w-5xl mx-auto grid md:grid-cols-3 gap-6'>
          {[
            {
              icon: <BsStars className='text-amber-500' size={22} />,
              title: 'Smart Question Engine',
              desc: 'Adapts difficulty in real-time based on your answers, exactly like a real interviewer.',
            },
            {
              icon: <BsShieldFillCheck className='text-blue-600' size={22} />,
              title: 'Confidence Scoring',
              desc: 'Get a detailed breakdown of clarity, accuracy, and confidence for every response.',
            },
            {
              icon: <BsLightningChargeFill className='text-blue-500' size={22} />,
              title: 'Instant AI Coaching',
              desc: 'Receive model answers, tips, and follow-up explanations after each question.',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12 }}
              whileHover={{ y: -5 }}
              className='p-8 bg-white rounded-3xl border border-gray-100 shadow-sm'
            >
              <div className='w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-5 shadow-sm'>
                {item.icon}
              </div>
              <h3 className='text-lg font-bold mb-2'>{item.title}</h3>
              <p className='text-gray-500 text-sm leading-relaxed'>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className='px-6 pb-28'>
        <div className='max-w-2xl mx-auto'>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='text-3xl font-bold text-center mb-10'
          >
            Frequently asked questions
          </motion.h2>
          <div className='flex flex-col gap-3'>
            {faqs.map((faq, i) => <FAQItem key={i} {...faq} index={i} />)}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className='px-6 pb-24'>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='max-w-4xl mx-auto bg-black rounded-3xl px-10 py-16 text-center text-white relative overflow-hidden'
        >
          {/* glow orbs */}
          <div className='absolute -top-20 -left-20 w-72 h-72 bg-blue-600 rounded-full blur-[100px] opacity-30 pointer-events-none' />
          <div className='absolute -bottom-16 -right-16 w-64 h-64 bg-indigo-500 rounded-full blur-[80px] opacity-20 pointer-events-none' />

          <h2 className='text-3xl md:text-4xl font-bold mb-4 relative z-10'>
            Ready to ace your next interview?
          </h2>
          <p className='text-gray-400 mb-8 max-w-lg mx-auto relative z-10'>
            Join 50,000+ professionals who've already unlocked their potential with InterviewIQ.
          </p>
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/auth')}
            className='inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold rounded-2xl shadow-xl hover:shadow-white/20 transition-all cursor-pointer relative z-10'
          >
            Start for free <BsArrowRight size={18} />
          </motion.button>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className='border-t border-gray-200 py-12 px-6 bg-white'>
        <div className='max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6'>
          <div className='flex items-center gap-2'>
            <div className='bg-black text-white p-2 rounded-lg'>
              <BsRobot size={18} />
            </div>
            <span className='font-bold text-lg'>InterviewIQ.AI</span>
          </div>
          <div className='flex gap-8 text-sm text-gray-500'>
            <a href='#' className='hover:text-black transition-colors'>Privacy Policy</a>
            <a href='#' className='hover:text-black transition-colors'>Terms of Service</a>
            <a href='#' className='hover:text-black transition-colors'>Contact</a>
          </div>
          <p className='text-gray-400 text-sm'>© 2025 InterviewIQ. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
