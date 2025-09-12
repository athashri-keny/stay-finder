'use client'

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
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

  const [userdata, setUserdata] = useState<data>()
  const [properties, setProperties] = useState<Property[]>([])
  

  useEffect(() => {
    const getCurrentUser = async () => {
      try {
        const response = await axios.get('/api/user')
        console.log(response.data)
        setUserdata(response.data.user)
        setProperties(response.data.user.PropertyPosted)
      } catch (error) {
        console.log("error while getting details for current user", error)
      }
    }
    getCurrentUser()
  }, [])



  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-indigo-900">StayFinder</h1>
          <div className="flex items-center space-x-4">
            <button className="text-indigo-700 hover:text-indigo-900">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
              {userdata?.name}
            </div>
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
                <button className="absolute bottom-2 right-2 bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-full shadow-md">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="absolute bottom-4 right-4">
              <button className="bg-white text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-lg font-medium transition duration-200 shadow-md">
                Edit Profile
              </button>
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
                      <p className="text-gray-500">You haven't posted any properties yet.</p>
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