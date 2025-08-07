'use client'

import React, { useRef } from 'react'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiHash } from 'react-icons/fi'
import { VerifyCodeSchema } from '@/Schemas/VerifyCodeSchema'
import { useParams, useRouter } from 'next/navigation'
import { Form, useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import { FormControl, FormField, FormItem, FormLabel, FormMessage , } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

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
const param = useParams<{name: string}>()

const form = useForm<z.input<typeof VerifyCodeSchema>>({
  resolver: zodResolver(VerifyCodeSchema),
  defaultValues: {
    code: ''
  }
})

const onsubmit = async (data: z.infer<typeof VerifyCodeSchema>) => {
  try {
    await axios.post(`/api/auth/verify-code`  , {
      name: param.name,
      code: data.code
    })
    console.log("Sucessfully verified account redirecting to dashboard!")
    router.push('/dashboard')
  } catch (error) {
    console.log("Error while submiting" , error)
  }
}

  const codeInputs = Array(6).fill(0);

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
      <form onSubmit={form.handleSubmit(onsubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verification Code</FormLabel>
              <FormControl>
                <Input placeholder="enter your code" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
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
