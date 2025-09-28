  'use client'

  import React, { useState } from 'react';
  import { motion } from 'framer-motion';
  import { signIn } from 'next-auth/react';
  import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
  import { FcGoogle } from 'react-icons/fc';
  import { useForm } from "react-hook-form"
  import * as z from 'zod'
  import { zodResolver } from "@hookform/resolvers/zod";
  import {
    Form, FormControl, FormField, FormItem, FormLabel, FormMessage 
  } from "@/components/ui/form";
  import { SignUpSchema } from '@/Schemas/SignupSchema';
  import axios from 'axios';
  import { useRouter } from 'next/navigation';
  import { Input } from '@/components/ui/input';
  import { Loader2 } from 'lucide-react';
 



  const Signup = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [loading , setloading] = useState(false);
    const router = useRouter()

    // google sign-in 
    const handleGoogleSignIn = () => {
      signIn('google', { callbackUrl: '/dashboard' });
    };


  const form = useForm<z.infer<typeof SignUpSchema>>({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: ''
    }
  })

  const SubmitHandler = async (data: z.infer<typeof SignUpSchema>) => {

    try {
      setloading(true)
      const response = await axios.post('/api/auth/sign-up' , data)
      localStorage.setItem('tempAuthToken' , response.data.Authtoken)
      console.log("Signup sucessfully" , response.data)
      router.push(`verify/${data.name}`)

      
    } catch (error) {
      console.log("Error while sigining up" , error)
      setloading(false)
    }
  }


    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4 overflow-hidden relative">
       
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
            <h1 className='text-3xl text-center p-6'>Sign-Up</h1>
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
                <Input
                  {...field}
                  onChange={(e) => {
                  field.onChange(e)
                  }} 
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
                <Input
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

        <FormField
        control={form.control}
        name="phone"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-gray-300"> Phone</FormLabel>
            <FormControl>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                <Input
                  {...field}
                  onChange={(e) => {
                  field.onChange(e)
                  }} 
                  className="w-full pl-10 pr-3 py-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="number"
                          
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
                <Input
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
                <Input
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


    {loading ? (
  <div className="flex justify-center items-center py-3.5">
    <Loader2 
      className="w-8 h-8 animate-spin text-white rounded-full shadow-lg  "
    />
  </div>
) : (
  <button
    type="submit"
    className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-3.5 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] active:scale-95"
  >
    Create Account
  </button>
)}


      {/* Submit Button */}
    

      {/*  google sign */}
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
                <a href="/sign-in" className="text-purple-400 font-medium hover:text-purple-300 hover:underline transition">Sign in</a>
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    );
  };

  export default Signup;