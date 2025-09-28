'use client'


import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import Image from 'next/image'
import { RoomSchema } from '@/Schemas/RoomSchema'
import z from 'zod'
import { Badge } from '@/components/ui/badge'


function Page() {
  type room  = z.infer<typeof RoomSchema>

 const [favouriteRooms , setfavouritesRooms] = useState<room[]>([])



useEffect(() => {
const getfav = async () => {
    try {
        const response = await axios.get('/api/rooms/favourites')
        setfavouritesRooms(response.data.favouriteProperties)
        console.log("Rooms fetched sucessfully" , response.data.favouriteProperties)
    } catch (error) {
        console.log("Error while getting favourite properties for current user" , error)
    }
}
getfav()
} , [])

  return (
     <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Favourite Properties </h1>
      
      {favouriteRooms?.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <h2 className="mt-4 text-xl font-medium text-gray-700">No rooms available</h2>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {favouriteRooms?.map(room => (
            <Link key={room._id} href={`/room/${room._id}`}>
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <Image 
                  src={room?.images[0]} 
                  alt="Property" 
                  className="w-full h-48 object-cover"
                />  
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-lg truncate text-black">{room?.title}</h3>
                    <Badge 
                      variant={room.status === 'available' ? 'outline' : 'destructive'}
                      className={room.status === 'available' ? "bg-green-500" : "bg-red-500"}
                    >
                      {room.status === 'available' ? "Available" : "Booked"}
                    </Badge>
                  </div>
                  <p className="text-gray-500 text-sm mt-1">{room?.location}</p>
                  
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-lg font-bold text-black">₹{room.price}/night</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default Page
