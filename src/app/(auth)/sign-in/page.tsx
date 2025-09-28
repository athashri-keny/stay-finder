'use client'

import React, { useState } from 'react';
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiArrowLeft } from 'react-icons/fi';
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
import { Loader } from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';



const SignIn = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading , setloading] = useState(false)

  const form = useForm<z.infer<typeof SignInSchema>>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    }
  });

  const handleGoogleSignIn = async () => {
    await signIn("google", { callbackUrl: '/dashboard' });
  };

  const submitHandler = async (data: z.infer<typeof SignInSchema>) => {
    setloading(true)
    try {
     const result = await signIn('credentials', {
        name: data.name,
        email: data.email,
        password: data.password,
        redirect: false
      });

    if (result?.ok) {

      router.push('/dashboard');
      toast("Login Sucessfully!")
    } else {
      let errorMessage = "Login failed. Please try again.";

      if (result?.error === 'CredentialsSignin') {
        errorMessage = "Invalid email, name, or password. Please check your credentials.";
      } else if (result?.error === 'EmailNotVerified') {
        errorMessage = "Please verify your email before signing in.";
      } 
      setError(errorMessage);
    }
    } catch (error) {
      toast("Error ")
      setError("Login failed check your crendentails")
      setloading(false)
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col items-center justify-center p-4 relative">
      <div className="w-full max-w-md">
        
        <Form {...form}>
          <form 
            onSubmit={form.handleSubmit(submitHandler)} 
            className="bg-gray-800/30 backdrop-blur-lg border border-gray-700 rounded-xl p-6 space-y-6 shadow-2xl"
          >
               <h1 className='text-3xl p-4 text-center'> Sign-In</h1>
            {/* Name Field - ADDED */}
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
                        type="text"
                        className="w-full pl-10 pr-3 py-3 rounded-lg bg-gray-700/50 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="John Doe"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            {/* Email Field */}
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
                  <FormMessage className="text-red-400" />
                </FormItem>
              )}
            />

            {/* Password Field */}
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
                  <FormMessage className="text-red-400" />
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

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-700 text-white py-3.5 rounded-lg font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] active:scale-95"
            >
              {loading ? (
               <>
               <Loader className='h-10 w-10 animate-spin text-center'/>
               </>
              ): (
              <>
                     Sign In
              </>
              )}
     
            </button>
  
           {error && (
          <div className="mb-4 p-3 bg-red-500/20 text-red-300 rounded-lg text-center">
            {error}
          </div>
        )}
            <div className="relative flex items-center py-4">
              <div className="flex-grow border-t border-gray-700"></div>
              <span className="flex-shrink mx-4 text-gray-500 text-sm">OR</span>
              <div className="flex-grow border-t border-gray-700"></div>
            </div>
 
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 bg-white text-gray-800 py-3.5 rounded-lg font-bold shadow-lg hover:bg-gray-100 transition-all duration-300 transform hover:-translate-y-1 hover:scale-[1.02] active:scale-95"
            >
              <FcGoogle className="text-xl" />
              Sign in with Google
            </button>
          </form>
        </Form>
      

        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Don't have an account?{' '}
            <Link href="/sign-up" className="text-purple-400 font-medium hover:text-purple-300 hover:underline transition">
              Sign up
            </Link>
          </p>
          
          <a 
            href="/" 
            className="inline-flex items-center mt-4 text-gray-400 hover:text-white transition"
          >
            <FiArrowLeft className="mr-2" />
            Back to home
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignIn;