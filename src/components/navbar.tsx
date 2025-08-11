"use client"

import React from 'react'
import Link from 'next/link'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { useSession } from 'next-auth/react'

function Navbar() {
  const { data: session } = useSession()

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4 container mx-auto">
        {/* Logo on left */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="bg-rose-500 w-8 h-8 rounded-lg"></div>
          <span className="font-bold text-xl">StayFinder</span>
        </Link>
        
        {/* Centered Menu Items */}
        <div className="flex-1 flex justify-center">
          <Menubar className="border-none bg-transparent">
            {/* Stays Menu */}
            <MenubarMenu>
              <MenubarTrigger className="cursor-pointer font-medium text-md">Stays</MenubarTrigger>
              <MenubarContent>
                <MenubarItem asChild>
                  <Link href="/stays">Browse Stays</Link>
                </MenubarItem>
                <MenubarSeparator />
                <MenubarItem asChild>
                  <Link href="/host">Become a Host</Link>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>

            {/* Messages Menu */}
            <MenubarMenu>
              <MenubarTrigger className="cursor-pointer font-medium text-md">Messages</MenubarTrigger>
              <MenubarContent>
                <MenubarItem asChild>
                  <Link href="/messages">Inbox</Link>
                </MenubarItem>
                <MenubarItem asChild>
                  <Link href="/messages/notifications">Notifications</Link>
                </MenubarItem>
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
        
        {/* Right side — Become a Host + Account Menu */}
        <div className="flex items-center space-x-4">
          {/* Become a Host link */}
          <Link
            href="/addproperty"
            className="px-4 py-2 rounded-full border font-medium text-sm hover:bg-gray-100 transition"
          >
            Become a Host
          </Link>

          {/* Account Menu */}
          <Menubar className="border-none bg-transparent">
            <MenubarMenu>
              <MenubarTrigger className="cursor-pointer">
                <div className="flex items-center space-x-2">
                  <div className="rounded-full border p-1">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
              </MenubarTrigger>

              {/* Logged in vs not logged in */}
              <MenubarContent className="min-w-[180px]" align="end">
                {session?.user ? (
                  <>
                    <MenubarItem asChild>
                      <Link href="/account">Account Settings</Link>
                    </MenubarItem>
                    <MenubarItem asChild>
                      <Link href="/wishlists">Favourites</Link>
                    </MenubarItem>
                    <MenubarSeparator />
                    <MenubarItem>Log Out</MenubarItem>
                  </>
                ) : (
                  <>
                    <MenubarItem asChild>
                      <Link href="/sign-in">Login</Link>
                    </MenubarItem>
                    <MenubarItem asChild>
                      <Link href="/sign-up">Sign Up</Link>
                    </MenubarItem>
                  </>
                )}
              </MenubarContent>
            </MenubarMenu>
          </Menubar>
        </div>
      </div>
    </div>
  )
}

export default Navbar
