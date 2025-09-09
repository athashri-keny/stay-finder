'use client'

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

function ProfilePage() {
const [userdata , setUserdata] = useState("")


    useEffect(() => {
     const getCurrentUser = async() => {
        try {
           const response = await axios.get('/api/user')
           console.log(response.data)
           setUserdata(response.data.user)

    } catch (error) {
        console.log("error while getting details for current user" , error)
    }
     }
     getCurrentUser()
    } , [])



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
              JD
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
                    JD
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
              <h1 className="text-3xl font-bold text-gray-900"></h1>
              <p className="text-gray-600">john.doe@example.com</p>
            </div>
            <div className="flex items-center text-gray-500 mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Joined January 2023</span>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <div className="bg-indigo-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-indigo-800">12</div>
                <div className="text-gray-600">Trips Booked</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-purple-800">7</div>
                <div className="text-gray-600">Favorite Stays</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-blue-800">3</div>
                <div className="text-gray-600">Reviews</div>
              </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Personal Info */}
              <div className="lg:col-span-2">
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Personal Information</h2>
                  
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">First Name</label>
                        <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                          John
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 mb-1">Last Name</label>
                        <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                          Doe
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Email Address</label>
                      <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                        john.doe@example.com
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Phone Number</label>
                      <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                        +1 (555) 123-4567
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Bio</label>
                      <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm min-h-[100px]">
                        Passionate traveler and explorer. Love to discover hidden gems and unique stays around the world.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Upcoming Trips */}
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm mt-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Upcoming Trips</h2>
                  
                  <div className="space-y-4">
                    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                      <div className="flex justify-between">
                        <h3 className="font-medium">Beachfront Villa in Bali</h3>
                        <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">Upcoming</span>
                      </div>
                      <div className="text-sm text-gray-600 mt-2">June 15 - June 22, 2023</div>
                    </div>
                    
                    <div className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm">
                      <div className="flex justify-between">
                        <h3 className="font-medium">Mountain Cabin in Aspen</h3>
                        <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded-full">Confirmed</span>
                      </div>
                      <div className="text-sm text-gray-600 mt-2">July 10 - July 17, 2023</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Preferences & Settings */}
              <div className="space-y-6">
                {/* Preferences */}
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Travel Preferences</h2>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Accommodation Type</label>
                      <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm">
                        Hotels & Vacation Rentals
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-600 mb-1">Travel Interests</label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <span className="bg-indigo-100 text-indigo-800 text-xs px-3 py-1 rounded-full">Beach</span>
                        <span className="bg-indigo-100 text-indigo-800 text-xs px-3 py-1 rounded-full">Mountains</span>
                        <span className="bg-indigo-100 text-indigo-800 text-xs px-3 py-1 rounded-full">City Breaks</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Account Settings */}
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Account Settings</h2>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <div>
                        <h3 className="font-medium">Email Notifications</h3>
                        <p className="text-sm text-gray-600">Receive booking updates</p>
                      </div>
                      <div className="relative inline-block w-12 h-6 rounded-full bg-indigo-600">
                        <input type="checkbox" className="sr-only" defaultChecked />
                        <span className="absolute left-6 top-0.5 bg-white w-5 h-5 rounded-full transition-transform"></span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <div>
                        <h3 className="font-medium">SMS Notifications</h3>
                        <p className="text-sm text-gray-600">Receive text alerts</p>
                      </div>
                      <div className="relative inline-block w-12 h-6 rounded-full bg-gray-300">
                        <input type="checkbox" className="sr-only" />
                        <span className="absolute left-0.5 top-0.5 bg-white w-5 h-5 rounded-full transition-transform"></span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center py-2">
                      <div>
                        <h3 className="font-medium">Language</h3>
                        <p className="text-sm text-gray-600">English (US)</p>
                      </div>
                      <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                        Change
                      </button>
                    </div>
                  </div>
                </div>

                {/* Security */}
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4">Security</h2>
                  
                  <div className="space-y-3">
                    <button className="w-full text-left py-2 px-3 hover:bg-indigo-50 rounded-lg text-indigo-600 font-medium">
                      Change Password
                    </button>
                    <button className="w-full text-left py-2 px-3 hover:bg-indigo-50 rounded-lg text-indigo-600 font-medium">
                      Two-Factor Authentication
                    </button>
                    <button className="w-full text-left py-2 px-3 hover:bg-red-50 rounded-lg text-red-600 font-medium">
                      Delete Account
                    </button>
                  </div>
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