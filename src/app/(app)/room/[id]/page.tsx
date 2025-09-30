'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useEffect } from 'react'
import {  useParams } from 'next/navigation'
import { RoomSchema } from '@/Schemas/RoomSchema'
import z from 'zod'
import { Heart } from 'lucide-react'
import { toast } from 'sonner'
import { Skeleton } from '@/components/ui/skeleton'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { useSession } from 'next-auth/react'


// TODO: create a favourite page backend + frontend
// account settings page backend + frontend
// Reserve Booking frontend 
// rating

type Room = z.infer<typeof RoomSchema >



function PropertyDetails() {
const router = useRouter()

const [roomsdata , setroomdata] = useState<Room | null>()
const [favouriteProp ,  setfavouritesProp] = useState(false)
const [loading , setloading ] = useState(false)
const [reserveloading , setreserveloading] = useState(false)
const [suggestion , setsuggestion] = useState("")
const [loadingAI , setLoadingAI] =  useState(false)


   const parmams = useParams()
  const roomid = parmams?.id as string
const {data: session} = useSession()
const user = session?.user._id



useEffect(() => {

  if (!roomid) {
    console.log("Room ID is required!")
    return 
  }
    const getPropertyDetails = async () => {
    try {
      setloading(true)
     const response = await axios.get(`/api/rooms/${roomid}`)
     setroomdata(response.data.result[0])
  }catch (error) {
    console.log("Error while hitting the api request" , error)
    setloading(false)
  } finally {
    setloading(false)
  }  
    }
    
 getPropertyDetails()
  } , [roomid]
)

  // add to favourites
const addtofavourite = async() => {

if (!user) {
  toast.error("!!! Failed plz login to continue...")
 setTimeout(() => {
 router.push('/sign-up')
} ,1000 )
}

  try {
   await axios.post(`/api/rooms/${roomid}`)
    toast("property added favourite sucessfully")
  } catch (error) {
    console.log("error while adding to favourites" , error)
  }
}


// get current user favourites properties
useEffect(() => {
const getFavproperties = async () => {
  try {
    const response = await axios.get('/api/rooms/favourites')
    setfavouritesProp(response.data.favouriteProperties)
    } catch (error) {
    console.log("errro while getting current  fav properties" , error)
  }
}
getFavproperties()
} , [loading])


const handleReserveClick = async() => {
  try {
    setreserveloading(true)
    router.push(`/room/${roomid}/book`)
  } catch (error) {
    setreserveloading(false)
    console.log("Error while clickig", error)
  }
}

 // get ai suggestion about this property

 const getSuggestion = async() => {
   setLoadingAI(true)
    try {
      const response = await axios.post('/api/ai-sugesstions'  ,  {description: roomsdata?.description})
     
      console.log( "Success ai suggestion " ,response.data)
      setsuggestion(response.data.summary[0].summary_text)
      
    } catch (error) {
      console.log("Error while getting AI suggestion" ,  error)
      setLoadingAI(false)
    } finally {
      setLoadingAI(false)
    }
 }



return (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    {loading ? (
      <>
        <Skeleton className="h-6 w-32 rounded-full animate-pulse mb-2" />
        <Skeleton className="h-6 w-24 rounded-full animate-pulse mb-2" />
        <Skeleton className="h-10 w-full rounded-lg animate-pulse" />

      </>
    ) : (
      <>
        {/* Breadcrumb Navigation */}
        <nav className="flex mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="text-white hover:text-gray-700">
                Home
              </Link>
            </li>
            <li>
              <span className="text-gray-400">/</span>
            </li>
            <li>
              <Link href="/dashboard" className="text-white hover:text-gray-700">
                Listings
              </Link>
            </li>
            <li>
              <span className="text-gray-400">/</span>
            </li>
            <li className="text-white truncate">
              {roomsdata?.title}
            </li>
          </ol>
        </nav>

        {/* Property Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-white">{roomsdata?.title}</h1>
          <div className="flex items-center mt-2">
            <span className="text-white">{roomsdata?.location}</span>
            {roomsdata?.rating && (
              <div className="flex items-center">
                <span className="ml-1 text-white">{roomsdata?.rating}</span>
              </div>
            )}
          </div>
        </div>

        {/* Image Gallery */}
        <div className="relative mb-8 rounded-xl overflow-hidden">
          <div className="aspect-w-16 aspect-h-9">
            <img 
              src={roomsdata?.images[0]}
              className="w-full h-96 object-cover"
              alt="Property"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Property Details */}
          <div className="lg:col-span-2">
            {/* Description */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-white">About this property</h2>
              <p className="text-white leading-relaxed ">{roomsdata?.description}</p>
            </div>

            {/* Amenities */}
            <div className="mb-8">
              <h2 className="text-2xl font-semibold mb-4 text-white">Amenities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {roomsdata?.amenities && roomsdata.amenities.length > 0 ? (
                  roomsdata?.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-500 mr-3"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-white">{amenity}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-white">No amenities given</p>
                )}
              </div>
            </div>

            {/* Availability */}
            <div className="mb-8">
              <div className="mb-8 flex flex-col items-start gap-4">
  <button
    onClick={() => getSuggestion()}
    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition duration-300"
  >
    {loadingAI ? (
      <>
      <Loader2  className='w-10 h-10 animate-spin'/>
      </>
    ): (
     <>
         Get AI Suggestions
     </>
    )}

  </button>

  <p className="bg-black text-white p-4 rounded-lg shadow-sm w-full max-w-md focus-visible:">
    {suggestion}
  </p>
</div>

            </div>
          </div>

          {/* Right Column - Booking Card */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
              <div className="mb-6">
                <span className="text-3xl font-bold text-black">₹{roomsdata?.price}</span>
                <span className="text-black"> / per Night</span>
              </div>
                        
             
              
              <button
               onClick={handleReserveClick}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-2 flex items-center justify-center gap-2 ${
    reserveloading || roomsdata?.status === 'booked'
      ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
      : 'bg-blue-600 text-white hover:bg-blue-700'
  }`}
              >
                {reserveloading ? (
                  <>
                  <Loader2 className='w-7 h-7 animate-spin'/>
                  </>
                ) : (
                 roomsdata?.status === 'booked' ? "Reserved" : "Reserve"
                )}
              
              </button>

              <button
                onClick={() => addtofavourite()}
                className="w-full bg-yellow-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-yellow-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 mt-2 flex items-center justify-center gap-2"
              >
                {favouriteProp ? (
                  <>
                    <Heart className="fill-red-500 text-red-500" />
                    Added to Favourites
                  </>
                ) : (
                  <>
                    <Heart className="text-white" />
                    Add to Favourites
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </>
    )}
  </div>
)
}
export default PropertyDetails
