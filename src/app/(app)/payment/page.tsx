'use client'

import axios from 'axios'
import Script from 'next/script';
import React, { useState , Suspense } from 'react'
import { notFound, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner'



function PaymentContent() {
  const searchparams = useSearchParams()
  const amount = searchparams.get('amount')
  const BookingId = searchparams.get('BookingId') //  listing
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const amountInrupppes = amount as any * 100  // converting it into paise


  
  if (!amount) {
    notFound()
  }

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
     <div className="min-h-screen bg-gradient-to-br from-black flex items-center justify-center p-4">
      <Script
        type='text/javascript'
        src='https://checkout.razorpay.com/v1/checkout.js'
      />
      
      <div className="bg-gray-700 rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-white-800 mb-2">Complete Your Booking</h1>
          <p className="text-white">Secure payment powered by Razorpay</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <span className="text-gray-600">Booking ID</span>
            <span className="font-mono text-gray-800">{BookingId}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Total Amount</span>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">₹{amount}</div>
              <div className="text-sm text-gray-500">Inclusive of all taxes</div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={handlePayment}
            disabled={isProcessing}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 flex items-center justify-center gap-3"
          >
            {isProcessing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Pay Securely
              </>
            )}
          </button>
          
          <button
            onClick={() => router.back()}
            disabled={isProcessing}
            className="w-full border border-gray-300 hover:bg-gray-50 text-white font-medium py-3 px-6 rounded-lg transition-all duration-200"
          >
            Cancel
          </button>
        </div>

        <div className="mt-8 text-center">
          <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
            <span>Your payment is secured with 256-bit SSL encryption</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function Paymentpage() {
  return (
    <Suspense fallback={
     <div>
      Failed!
     </div>
    }>
      <PaymentContent />
    </Suspense>
  )
}
export default Paymentpage
