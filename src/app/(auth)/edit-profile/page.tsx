'use client'

import React, { useState } from 'react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import z from 'zod'
import { ChangePasswordSchema } from '@/Schemas/Changepassowrd'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Loader } from 'lucide-react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation';


function page() {
const [loading , setloading] = useState(false)
const router = useRouter()


  const form = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      Oldpassword: '',
      NewPassword: '',
      confirmPassword: ''
    },
  });



const handlechangePassowrd = async(data: z.infer<typeof ChangePasswordSchema>) => {
  setloading(true)
    
  try {
       await axios.post('/api/auth/change-password' , data)
       toast("Password changed Sucessfully")
      setTimeout(() => {
         router.push('/user')
      } , 4000)

    } catch (error) {
     setloading(false)
     console.log("Error while changing the passowrd" , error)
  
    } finally{
      setloading(false)
    }
}


  return (
    <div>
      <div>
<Form {...form}>
  <form onSubmit={form.handleSubmit(handlechangePassowrd)}>
    <FormField
      control={form.control}
      name="Oldpassword"
      render={({ field }) => (
        <FormItem>
          <FormLabel className='m-1'>Oldpassword</FormLabel>
          <FormControl>
            <Input placeholder="Enter your oldpasswrd" 
            {...field} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />


<FormField
  control={form.control}
  name="NewPassword"
  render={({ field }) => (
    <FormItem>
      <FormLabel> New Passowrd</FormLabel>
      <FormControl>
        <Input placeholder="New passowrd"
        {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>


<FormField
  control={form.control}
  name="confirmPassword"
  render={({ field }) => (
    <FormItem>
      <FormLabel>Password</FormLabel>
      <FormControl>
        <Input placeholder="password"
         {...field} />
      </FormControl>  
      <FormMessage />
    </FormItem>
  )}
/>
<Button type='submit'>
  {loading ? (
    <Loader className='w-9 h-10 animate-spin'/>
  ): (
 <div className='p-3'>
    <p className='p-2'>Change Password</p>
 </div>
  )}
    </Button>
 
          </form>
        </Form>
      </div>
    </div>
  )
}


export default page
