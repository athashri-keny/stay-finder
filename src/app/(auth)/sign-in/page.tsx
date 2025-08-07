'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff, FiHome, FiArrowLeft } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { useForm } from "react-hook-form";
import * as z from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage
} from "@/components/ui/form";
import { SignInSchema } from '@/Schemas/SigninSchema';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';


const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
 const router = useRouter()
 const [error , seterror] = useState("")

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: '',
    }
  });



// google handle login 
const handleGoogleSignIn = async () => {
  await signIn("google" , {callbackUrl: '/dashboard'})
}

   const submitHandler = async (data: z.infer<typeof SignInSchema>) => {
 
    try {
      const result = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
      });

      if (result?.error) {
        seterror(result.error);

      } else if (result?.ok) {
        router.push('/dashboard');
      } else {
        seterror("Unexpected response from server");
      }
    } catch (err) {
      seterror("An unexpected error occurred");
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
         // <-- Add this!
          animate="float"
        />
      ))}

      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        variants={floatingVariants}
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
                Welcome Back
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-gray-400"
              >
                Sign in to continue your journey
              </motion.p>
            </motion.div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(submitHandler)} className="p-6 space-y-6">
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
                    <div className="flex justify-between items-center">
                      <FormLabel className="text-gray-300">Password</FormLabel>
                      <a 
                        href="#" 
                        className="text-sm text-purple-400 hover:text-purple-300 transition"
                      >
                        Forgot password?
                      </a>
                    </div>
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

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-600 rounded bg-gray-700"
                />
                <label
                  htmlFor="remember"
                  className="ml-2 block text-sm text-gray-300"
                >
                  Remember me
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-3.5 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] active:scale-95"
              >
                Sign In
              </button>

              {/* Divider */}
              <div className="relative flex items-center py-4">
                <div className="flex-grow border-t border-gray-700"></div>
                <span className="flex-shrink mx-4 text-gray-500 text-sm">OR</span>
                <div className="flex-grow border-t border-gray-700"></div>
              </div>

              {/* Google Sign In */}
              <button
                type="button"
                onClick={ handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 py-3.5 rounded-lg font-bold shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] active:scale-95"
              >
              
                <FcGoogle className="text-xl" />
                Sign in with Google
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
              Don't have an account?{' '}
              <a href="#" className="text-purple-400 font-medium hover:text-purple-300 hover:underline transition">
                Sign up
              </a>
            </p>
            
            <a 
              href="/" 
              className="inline-flex items-center mt-4 text-gray-400 hover:text-white transition"
            >
              <FiArrowLeft className="mr-2" />
              Back to home
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SignIn;
