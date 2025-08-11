'use client'


import React, { useState } from 'react'
import axios from 'axios';
import { RoomSchema  } from '@/Schemas/RoomSchema';
import z from 'zod';
import { useEffect } from 'react';

function Dashboard() {
type RoomType = z.infer<typeof RoomSchema> 

const [rooms , setrooms] = useState<RoomType[]>([]) 


useEffect(() => {
const fetchRooms = async () => {

  try {
    const response = await axios.get('/api/rooms')
    console.log("Rooms fetched successfully")

    const paredRooms = z.array(RoomSchema).parse(response.data) // telling zod it is arrays of object 
    console.log(paredRooms)
    setrooms(paredRooms)
  } catch (error) {
    console.log("Error while fetching rooms " , error)
  }
}
fetchRooms()
} 
, [])



  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Available Rooms</h1>
      
      {rooms.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 bg-gray-50 rounded-xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <h2 className="mt-4 text-xl font-medium text-gray-700">No rooms available to show</h2>
          <p className="mt-2 text-gray-500">Check back later or add new listings</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {rooms.map(room => (
            <div key={room._id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="bg-gray-200 border-2 border-dashed rounded-t-xl w-full h-48" />
              
              <div className="p-4">
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-lg truncate">{room.description}</h3>
                  <span className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="ml-1 text-gray-600">{room.rating}</span>
                  </span>
                </div>
                
                <p className="text-gray-500 text-sm mt-1">{room.location}</p>
                
                <div className="mt-3 flex justify-between items-center">
                  <div>
                    <span className="text-lg font-bold">${room.price}</span>
                    <span className="text-gray-600"> / night</span>
                  </div>
                  <button className="text-sm bg-rose-500 hover:bg-rose-600 text-white py-2 px-4 rounded-lg transition-colors duration-300">
                    Book Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Dashboard