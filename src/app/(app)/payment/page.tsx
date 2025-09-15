'use client'

import axios from 'axios'
import Script from 'next/script';
import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner'

function Paymentpage() {
  const searchparams = useSearchParams()
  const amount = searchparams.get('amount')
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const amountInrupppes = amount as any * 100 //TODO: check this out later it works for now


  const handlePayment = async () => {
    setIsProcessing(true)

    try {
      const response = await axios.post('/api/create-order')

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amountInrupppes,
        currency: 'INR',  
        name: 'Stay Finder',
        description: 'Testing Payment Integration',
        order_id: response.data.id,
        // about happens payment manages this function handler
        handler: function (response: any) {
          console.log('Payment successful:', response)
          alert('Payment Successful!')
          router.push('/dashboard')
          toast("payment sucessfully thanks owner will contact you on your check-in day!")        
        },
        theme: {
          color: '#3399cc'  
        }
      }

      const payment = new (window as any).Razorpay(options)
      payment.open()


    } catch (error) {
      console.error('Error while handling the payment:', error)
    } finally {
      setIsProcessing(false)
    }
  }


  return (
    <div>
       <Script
      type='text/javascript'
      src='https://checkout.razorpay.com/v1/checkout.js'/>
      <button onClick={handlePayment} disabled={isProcessing}>
        {isProcessing ? 'Processing...' : 'Pay Now'}
      </button>
    </div>
  )
}

export default Paymentpage
