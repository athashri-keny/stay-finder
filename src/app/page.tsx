'use client'

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'


function Page() {
  return (
<div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-blue-900 relative overflow-hidden">

     

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-6 py-20">
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
       <motion.div
    className="text-center"
    initial={{ opacity: 0, y: 50 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
>
  
    {/* App Name */}
    <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
    >
        <h1 className='text-7xl m-20 font-bold bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent pb-2'>
            Stay-Finder
        </h1>
        <p className="text-xl text-gray-400 mt-2 mb-3">Find your perfect stay</p>
    </motion.div>
</motion.div>
          {/* Main heading */}
       

          {/* Subheading */}
          <motion.p 
            className="text-xl md:text-2xl text-white-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Discover your perfect <span className="font-semibold text-blue-600">home away from home</span> with our curated selection of beautiful stays!
          </motion.p>

          {/* Features grid */}

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <Link href="/dashboard">
              <motion.div
                className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ 
                  scale: 1.05,
                  background: "linear-gradient(45deg, #3B82F6, #8B5CF6)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center justify-center gap-2">
                  Lets Get Started!
                </span>
              </motion.div>
            </Link>
          </motion.div>

          {/* Additional info */}
          <motion.p 
            className="text-gray-500 mt-8 text-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            Join thousands of happy travelers finding their perfect stay
          </motion.p>
        </motion.div>
      </div>
    
    </div>
  )
}

export default Page