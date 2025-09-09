'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useEffect } from 'react'
import {  useParams } from 'next/navigation'
import { RoomSchema } from '@/Schemas/RoomSchema'
import z from 'zod'
import { Heart } from 'lucide-react'
import { Toaster } from '@/components/ui/sonner'
import { toast } from 'sonner'


// TODO: create a favourite page backend + frontend
// account settings page backend + frontend
// Reserve Booking frontend 
// rating

type Room = z.infer<typeof RoomSchema >


const formatDate = (isoDateString: string): string => {
  const date = new Date(isoDateString)
  return date.toLocaleDateString() 
}

function PropertyDetails() {
const [roomsdata , setroomdata] = useState<Room | null>()
const [favouriteProp ,  setfavouritesProp] = useState(false)
const [isFavourite , setisfavourite] = useState(false)
const [loading , setloading ] = useState(false)


   const parmams = useParams()
  const roomid = parmams?.id as string
  console.log("Roomd id = " , roomid )
  

useEffect(() => {

  if (!roomid) {
    console.log("Room ID is required!")
    return 
  }
    
    const getPropertyDetails = async () => {
    try {
     const response = await axios.get(`/api/rooms/${roomid}`)
     console.log(response.data)
     setroomdata(response.data.result[0])
     console.log("Property found")
  } catch (error) {
    console.log("Error while hitting the api request" , error)
  }  
    }
    
 getPropertyDetails()
  } , [roomid]
)

  // add to favourites
const addtofavourite = async() => {
  try {

    const response = await axios.post(`/api/rooms/${roomid}`)
    console.log(response.data)
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
    console.log(response.data)
    setfavouritesProp(response.data.favouriteProperties)
    } catch (error) {
    console.log("errro while getting current  fav properties" , error)
  }
}
getFavproperties()
} , [loading])


  return (
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb Navigation */}
      <nav className="flex mb-6" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2">
          <li>
            <Link href="/" className="text-gray-500 hover:text-gray-700">
              Home
            </Link>
          </li>
          <li>
            <span className="text-gray-400">/</span>
          </li>
          <li>
            <Link href="/dashboard" className="text-gray-500 hover:text-gray-700">
              Listings
            </Link>
          </li>
          <li>
            <span className="text-gray-400">/</span>
          </li>
          <li className="text-white-800 truncate">
            {roomsdata?.title}
          </li>
        </ol>
      </nav>

      {/* Property Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-text-white-900"> {roomsdata?.title}</h1>
        <div className="flex items-center mt-2">
          <span className="text-white-600">{roomsdata?.location}</span>
          <span className="mx-2 text-white-400">•</span>
          {roomsdata?.rating && (
            <div className="flex items-center">
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="ml-1 text-white-700">{roomsdata?.rating}</span>
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
          />
        </div>
      
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Property Details */}
        <div className="lg:col-span-2">
          {/* Description */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white-900">About this property</h2>
            <p className="text-whie-700 leading-relaxed">{roomsdata?.description}</p>
          </div>

                    {/* Amenities */}

          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white-900">Amenities</h2>
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
        <span className="text-gray-700">{amenity}</span>
      </div>
    ))
  ) : (
    <p className="text-gray-500">No amenities given</p>
  )}
              
            </div>
          </div>
          {/* Availability */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 text-white-900">Availability</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700">
                Available from <span className="font-medium">{formatDate(roomsdata?.availableDates?.from ?? '')}</span> to <span className="font-medium">{formatDate(roomsdata?.availableDates?.to ?? '')}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Booking Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-md p-6 sticky top-6">
            <div className="mb-6">
              <span className="text-3xl font-bold text-gray-900">₹{roomsdata?.price}</span>
              <span className="text-gray-600"> / night</span>
            </div>
            
            <div className="mb-6 p-4 bg-blue-50 rounded-lg">
              <div className="flex justify-between mb-2">
                <span className="text-gray-700">Check-in</span>
                <span className="text-gray-700">{formatDate(roomsdata?.availableDates?.from ?? '')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Check-out</span>
                <span className="text-gray-700">{formatDate(roomsdata?.availableDates?.to ?? '')}</span>
              </div>
            </div>
            
            <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
              Reserve
            </button>
            {}
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
    </div>
  )
}

export default PropertyDetails