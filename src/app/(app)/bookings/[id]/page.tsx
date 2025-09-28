'use client'


import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import axios from 'axios'
import { BookingDetailsSchema } from '@/Schemas/BookingDetailsSchema'
import z from 'zod'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'


function Page() {

  type Booking = z.infer<typeof BookingDetailsSchema>

const params = useParams()
const bookingID = params.id
const [bookingDetails ,  setBookingDetails] = useState<Booking>()
const [totalprice , setTotalPrice] = useState(Number)
const [CheckInDatee , setCheckIndate] = useState(Date)
const [CheckoutDate , setCheckoutDate] = useState(Date)
const [CreatedAt , setCreatedAt] = useState(Date)
const router = useRouter()


useEffect(() => {
    const getBookingDetails = async() => {
    try {
       const response = await axios.get(`/api/book/${bookingID}`) 
       console.log(response.data)
       setBookingDetails(response.data.bookingByUser)
       setTotalPrice(response.data.bookingByUser.totalPrice)
       setCheckIndate(response.data.bookingByUser.checkin)
     setCheckoutDate(response.data.bookingByUser.checkout)
     setCreatedAt(response.data.bookingByUser.createdAt)
    

    } catch (error) {
        console.log("Error while getting the booking details" , error)
    }
    } 
    getBookingDetails()
} , [])


const price = totalprice * 100


// converting date into a readable format
const NEwCheckInDate = new Date(CheckInDatee).toLocaleDateString()
const newCheckoutdate = new Date(CheckoutDate).toLocaleDateString()
const CreatedDate = new Date(CreatedAt).toLocaleDateString()


const HandleDeleteBooking = async() => {
  try {
    const response = await axios.delete(`/api/book/${bookingID}`)
    console.log(response.data)
    toast('booking deleted sucessfully!')
   router.push('/user')
  } catch (error) {
    console.log("Errror while deleting the booking" , error)
  }
}



  return (
     <div className="min-h-screen bg-black py-8 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white">
          <h1 className="text-3xl font-bold mb-2">Booking Details</h1>
          <p className="text-blue-100">Booking ID: <span className="font-mono">{bookingDetails?.BookingId}</span></p>
        </div>
        
        {/* Status Bar */}
        <div className="px-6 py-4 bg-blue-50 border-b border-blue-100 flex justify-between items-center">
          <div className="flex items-center">
            <span className={`h-3 w-3 rounded-full mr-2 `}> </span>
            <span className={`font-medium `}>
             isCancelled
            </span>
          </div>
          <div className="text-blue-600">
            <i className="far fa-calendar-alt mr-1"></i>
            <span> Booked on  {CreatedDate}</span>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* Check-in Date */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="text-sm font-medium text-gray-500 mb-1">CHECK-IN</h3>
              <div className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-lg mr-3">
                  <i className="fas fa-sign-in-alt text-blue-600 text-xl">{NEwCheckInDate}</i>
                </div>
                <div>
                  <p className="text-xl font-semibold">Checkin</p>
                </div>
              </div>
            </div>
            
            {/* Check-out Date */}
            <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
              <h3 className="text-sm font-medium text-gray-500 mb-1">CHECK-OUT</h3>
              <div className="flex items-center">
                <div className="bg-blue-100 p-2 rounded-lg mr-3">
                  <i className="fas fa-sign-out-alt text-blue-600 text-xl">{newCheckoutdate}</i>
                </div>
                <div>
                  <p className="text-xl font-semibold">Checkout</p>
                  <p className="text-gray-500 text-sm"></p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Room Details */}
          <div className="border border-gray-200 rounded-lg mb-8">
            <h3 className="bg-gray-50 px-4 py-3 font-medium text-gray-700 border-b border-gray-200"> DETAILS</h3>
            <div className="p-4">
              <div className="flex justify-between">
                <div>
                  <p className="font-medium"></p>
                  <p className="text-gray-600 text-sm"> Nights {bookingDetails?.numberOfNights}  Guests {bookingDetails?.guests}</p>
                </div>
                <p className="font-medium">/night</p>
              </div>
            </div>
          </div>
          
          {/* Price Details */}
          <div className="border border-gray-200 rounded-lg mb-8">
            <h3 className="bg-gray-50 px-4 py-3 font-medium text-gray-700 border-b border-gray-200">PRICE DETAILS</h3>
            <div className="divide-y divide-gray-200">
              <div className="flex justify-between px-4 py-3">
                <span className="text-gray-600"></span>
                <span className="font-medium"></span>
              </div>
              <div className="flex justify-between px-4 py-3">
                <span className="text-gray-600">Taxes & fees</span>
                <span className="font-medium"></span>
              </div>
              <div className="flex justify-between px-4 py-3 bg-blue-50">
                <span className="text-gray-800 font-semibold">Total {price}</span>
                <span className="text-blue-600 font-bold text-lg"></span>
              </div>
            </div>
          </div>
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <AlertDialog>
  <AlertDialogTrigger className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center">Delete Booking</AlertDialogTrigger>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
      <AlertDialogDescription>
        This action cannot be undone. This will permanently delete your Booking
        and remove your data from our servers.
      </AlertDialogDescription>
    </AlertDialogHeader>
    <AlertDialogFooter>
      <AlertDialogCancel >Cancel</AlertDialogCancel>
      <AlertDialogAction onClick={() => HandleDeleteBooking()}>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
            <button 
    

              className={`flex-1 bg-white text-red-600 border font-medium py-3 px-4 rounded-lg transition duration-200 flex items-center justify-center 
              }`}
            >
              <i className="fas fa-times-circle mr-2"></i> 
        
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Page
