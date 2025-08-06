'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { signIn } from 'next-auth/react';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiPhone, FiHome } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { useForm } from "react-hook-form"
import * as z from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form";
import { SignUpSchema } from '@/Schemas/SignupSchema';
import axios from 'axios';

const Signup = () => {
 
  const [showPassword, setShowPassword] = useState(false);

  const handleGoogleSignIn = () => {
    signIn('google', { callbackUrl: '/' });
  };

 const form = useForm<z.infer<typeof SignUpSchema>>({
  resolver: zodResolver(SignUpSchema),
  defaultValues: {
     name: '',
    email: '',
  
    password: '',
    confirmPassword: ''
  }
 })

const SubmitHandler = async (data: z.infer<typeof SignUpSchema>) => {

  try {
    const response = await axios.post('/api/auth/signup' , data)
    console.log("Signup sucessfully" , response.data)

  } catch (error) {
    console.log("Error while sigining up" , error)
  }
}

  // Floating animation variants
  const floatingVariants = {
    float: {
      y: [0, -20, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4 overflow-hidden relative">
      {/* Floating particles */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-gradient-to-r from-purple-500/20 to-indigo-500/20"
          style={{
            width: Math.floor(Math.random() * 100 + 50),
            height: Math.floor(Math.random() * 100 + 50),
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          variants={floatingVariants}
          animate="float"
        />
      ))}

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md z-10"
      >
        <motion.div
          initial={{ scale: 0.9, rotate: -2 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-gray-800/80 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden border border-gray-700/50"
        >
          <div className="bg-gradient-to-r from-gray-900 to-black p-8 text-center relative overflow-hidden">
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl"
            />
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="relative z-10"
            >
              <div className="flex justify-center mb-4">
                <FiHome className="text-4xl text-purple-500" />
              </div>
              <motion.h1 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-3xl font-bold text-white mb-2"
              >
                StayFinder
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-gray-400"
              >
                Find your perfect stay anywhere in the world
              </motion.p>
            </motion.div>
          </div>
          <Form {...form}>
  <form onSubmit={form.handleSubmit(SubmitHandler)} className="p-6 space-y-6">
    
    {/* Name */}
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-gray-300">Full Name</FormLabel>
          <FormControl>
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                {...field}
                className="w-full pl-10 pr-3 py-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="John Doe"
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    {/* Email */}
    <FormField
      control={form.control}
      name="email"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-gray-300">Email Address</FormLabel>
          <FormControl>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                {...field}
                type="email"
                className="w-full pl-10 pr-3 py-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="john@example.com"
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

      {/* Password */}
    <FormField
      control={form.control}
      name="password"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-gray-300">Password</FormLabel>
          <FormControl>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                {...field}
                type={showPassword ? "text" : "password"}
                className="w-full pl-10 pr-10 py-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    {/* Confirm Password */}
    <FormField
      control={form.control}
      name="confirmPassword"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-gray-300">Confirm Password</FormLabel>
          <FormControl>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
              <input
                {...field}
                type={showPassword ? "text" : "password"}
                className="w-full pl-10 pr-10 py-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />

    {/* Submit Button */}
    <button
      type="submit"
      className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-3.5 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] active:scale-95"
    >
      Create Account
    </button>
    <button
  type="button"
 onClick={() => handleGoogleSignIn()}
  className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 py-3.5 rounded-lg font-bold shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] active:scale-95"
>
  <FcGoogle className="text-xl" />
  Sign up with Google
</button>
  </form>
</Form>


          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="p-6 text-center border-t border-gray-700/50"
          >
            <p className="text-gray-400">
              Already have an account?{' '}
              <a href="#" className="text-purple-400 font-medium hover:text-purple-300 hover:underline transition">Sign in</a>
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Signup;