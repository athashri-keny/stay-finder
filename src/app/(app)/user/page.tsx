'use client'

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { UserSchema } from '@/Schemas/UserdataSchema';
import z from 'zod';
import Link from 'next/link';

function ProfilePage() {
  type data = z.infer<typeof UserSchema>

  type Property = {
    _id: string;
    title: string;
    description: string;
    images: string;
    propertyId: string
  }

type Booking = {
_id: string,
checkin: Date,
checkout: Date,
guests: string,
numberOfNights: string,
paymentStatus: string,
totalPrice: number,
BookingId: string
}


  const [userdata, setUserdata] = useState<data>()
  const [properties, setProperties] = useState<Property[]>([])
  const [booking , setbooking] = useState<Booking[]>()
  

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await axios.get('/api/user')
        console.log(response.data)
        setUserdata(response.data.user)
        setProperties(response.data.user.PropertyPosted)
        setbooking(response.data.bookings)
      } catch (error) {
        console.log("error while getting details for current user", error)
      }
    }
    getCurrentUser()
  }, [])



return (
<div className="min-h-screen bg-black py-8">

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-purple-300">StayFinder</h1>
          <div className="flex items-center space-x-4">
          </div>
        </header>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Profile Header */}
          <div className="relative h-48 bg-gradient-to-r from-indigo-500 to-purple-600">
            <div className="absolute bottom-0 left-0 transform translate-y-1/2 ml-8">
              <div className="relative">
                <div className="w-32 h-32 rounded-full border-4 border-white bg-white flex items-center justify-center shadow-lg">
                  <div className="w-28 h-28 rounded-full bg-indigo-200 flex items-center justify-center text-indigo-800 text-4xl font-bold">
                    {userdata?.name}
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute bottom-4 right-4">
              <Link
              href={'/edit-profile'}
              className="bg-white text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-lg font-medium transition duration-200 shadow-md">
                Edit Profile
              </Link>
            </div>
          </div>

          {/* User Info */}
          <div className="pt-20 pb-6 px-8">
            <div className="mb-4">
              <h1 className="text-3xl font-bold text-gray-900">{userdata?.name}</h1>
              <p className="text-gray-600">{userdata?.email}</p>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 gap-8">
              {/* Personal Info */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
                      <div className="bg-white p-3 rounded-lg border border-gray-200 text-black shadow-sm">
                        {userdata?.name}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
                    <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm text-black">
                      {userdata?.email}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600 mb-1">Phone Number</label>
                    <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm text-black">
                      {userdata?.phone || 'Not provided'}
                    </div>
                  </div>
                </div>
              </div>

              {/* Upcoming Bookings Section */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Bookings</h2>
                <div className="space-y-4">
                  {booking && booking.length > 0 ? (
                    booking.map(booking => {
                      // Format dates
                      const checkinDate = new Date(booking.checkin).toLocaleDateString();
                      const checkoutDate = new Date(booking.checkout).toLocaleDateString();
                      
                      return (
                        <div key={booking._id} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-lg text-black">Booking ID: {booking.BookingId}</h3>
                              <div className="mt-2 text-sm text-gray-600">
                                <p><span className="font-medium">Check-in:</span> {checkinDate}</p>
                                <p><span className="font-medium">Check-out:</span> {checkoutDate}</p>
                                <p><span className="font-medium">Nights:</span> {booking?.numberOfNights}</p>
                                <p><span className="font-medium">Guests:</span> {booking.guests}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-indigo-700">{booking.totalPrice * 100}</div>
                              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                booking.paymentStatus === 'completed' 
                                  ? 'bg-green-100 text-green-800' 
                                  : booking.paymentStatus === 'pending'
                                  ? 'bg-yellow-100 text-yellow-800'
                                  : 'bg-red-100 text-red-800'
                              }`}>
                                {booking.paymentStatus}
                              </span>
                            </div>
                          </div>
                          <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between items-center">
                            <Link 
                              href={`/bookings/${booking._id}`}
                              className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                              View Details
                            </Link>
                          </div>
                        </div>
                      );
                    })

                  ) : (
                    <div className="text-center py-8">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-gray-500">You do not have any upcoming bookings.</p>
                      <button className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg">
                        Browse Properties
                      </button>
                    </div>
                  )}
                </div>
              </div>


              {/* Your Properties Section */}
              <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Properties</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {properties.map(property => (
                    <div key={property._id} className="bg-white text-black rounded-lg border border-gray-200 shadow-sm overflow-hidden">
                      <img 
                        src={property.images} 
                        alt={property.title}
                        className="w-full h-48 object-cover"
                      />
                     <Link 
                      href={`/room/${property.propertyId}`} className="p-4">
                        <h3 className="font-medium text-lg mb-2">{property.title}</h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{property.description}</p>
                        <div className="flex justify-between items-center">
                        </div>
                      </Link>
                    </div>
                  ))}
                  
                  {properties.length === 0 && (
                    <div className="col-span-full text-center py-8">
                      <p className="text-gray-500">You have&apos;t posted any properties yet.</p>
                      <button className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg">
                        Post Your First Property
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



export default ProfilePage;