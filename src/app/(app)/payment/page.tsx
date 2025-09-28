'use client'

import axios from 'axios'
import Script from 'next/script';
import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner'


// NEXT TO DO:
// after payment make the payment status to paid 
// Add a messasge to owner and user(who books)
// improve ui
// MAIN - CHECK UP THE SIGNUP LOGIN ISSUE 

export const dynamic = 'force-dynamic' // for prerending while deployment searchparams(issue)
function Paymentpage() {
  const searchparams = useSearchParams()
  const amount = searchparams.get('amount')
  if (!amount) {
     return {
      notFound: true,
    }
  }
  const BookingId = searchparams.get('BookingId') //  listing
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  
  const amountInrupppes = amount as any * 100  // converting it into paise


  const handlePayment = async () => {
    setIsProcessing(true)

    try {
      const response = await axios.post('/api/create-order',{
        amount: amountInrupppes ,
         BookingId: BookingId
      })

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: amountInrupppes,
        currency: 'INR',  
        name: 'Stay Finder',
        description: 'Testing Payment Integration',
        order_id: response.data.orderId,
        // about happens payment manages this function handler
        handler:  async function (response: any) {
           try {
            await axios.post('/api/confirm-payment' , {
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_order_id: response.razorpay_order_id,
             razorpay_signature: response.razorpay_signature,
             BookingId: BookingId
            })
           } catch (error) {
            console.log("Error payment verifiication" , error)
            toast.error("Error ocuured while payment verification")
           }
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
