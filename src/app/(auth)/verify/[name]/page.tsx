'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiHash } from 'react-icons/fi'
import { VerifyCodeSchema } from '@/Schemas/VerifyCodeSchema'
import { useParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp"



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

const VerifyCode = () => {
  const router = useRouter()
  const params = useParams<{name: string}>()

  console.log(params.name)
  const form = useForm<z.infer<typeof VerifyCodeSchema>>({
    resolver: zodResolver(VerifyCodeSchema),
    defaultValues: {
      code: ''
    }
  })


  const onSubmitt = async (data: z.infer<typeof VerifyCodeSchema>) => {
    try {
     const response =  await axios.post(`/api/auth/verifycode`, {
        name: params.name,
        verifycode: data.code
      })
      console.log("form data" , response.data )
      console.log("Successfully verified account! Redirecting to dashboard...")
      router.push('/dashboard')
    } catch (error) {
      console.log("Error while submitting", error)
    }
  }

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
            {/* Background elements */}
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
                <FiHash className="text-4xl text-purple-500" />
              </div>
              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-3xl font-bold text-white mb-2"
              >
                Verify your Code
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-gray-400"
              >
                Enter the 6-digit code sent to your email address
              </motion.p>
            </motion.div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmitt)} className="p-6 space-y-8">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-center">
                    <FormLabel className="text-white-300 mb-4">Verification Code</FormLabel>
                    <FormControl>
                     <InputOTP maxLength={6}
                     className='text-white'
                     value= {field.value}
                     onChange={field.onChange}
                     >
  <InputOTPGroup>
    <InputOTPSlot index={0} />
    <InputOTPSlot index={1} />
    <InputOTPSlot index={2} />
  </InputOTPGroup>
  <InputOTPSeparator />
  <InputOTPGroup>
    <InputOTPSlot index={3} />
    <InputOTPSlot index={4} />
    <InputOTPSlot index={5} />
  
  </InputOTPGroup>
</InputOTP>
                    </FormControl>
                    <FormMessage className="mt-4 text-red-400" />
                  </FormItem>
                )}
              />
              
              <Button 
                       type="submit" 
                className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg"
              >
                Verify Account
              </Button>
            </form>
          </Form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="p-6 text-center border-t border-gray-700/50"
          >
            <p className="text-gray-400">
              Didn&apos;t receive a code?{' '}
              <a href="#" className="text-purple-400 font-medium hover:text-purple-300 hover:underline transition">
                Resend
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
  )
}

export default VerifyCode