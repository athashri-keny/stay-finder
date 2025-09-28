'use client'

import React, { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { CalendarIcon,  Home,  } from 'lucide-react'
import { format } from 'date-fns'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import axios from 'axios'
import { toast } from 'sonner'


// get property Details api call 
// add book this property api call

type PropertyData = {
  images: string,
  title: string,
  location: string,
}

export default function BookingPage() {
  const params = useParams()
  const roomId = params?.id as string

  const [checkin, setCheckin] = useState<Date>()
  const [checkout, setCheckout] = useState<Date>()
  const [roomsdata , setroomdata] = useState<PropertyData>()
  const [guests, setGuests] = useState('1')
  const [numberOfNights , setnumberOfnights] = useState('')
  const [totalPrice , setTotalPrice] = useState()
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  
  
  // get property details 
  useEffect(() => {
   const getPropertyDetails = async() => {
     try {
      const response = await axios.get(`/api/rooms/${roomId}`)
      setroomdata(response.data.result[0])
     console.log("room details found on book page " , response.data)
      
     } catch (error) {
      console.log("error while getting propertyDetails" , error)
     }
   }
   getPropertyDetails()
  } , [roomId])



  // for booking 
 const handleBooking = async() => {
  try {
    setIsLoading(true)
    const response = await axios.post(`/api/book/${roomId}` , {
      checkin: checkin?.toISOString(),
      checkout: checkout?.toISOString(),
      guests,
      })
      const bookingID = response.data.newBooking._id
      toast("Booked sucessfully! Redirecting you to payment!")
      router.push(`/payment?amount=${totalPrice}&BookingId=${bookingID}`)
    console.log("Property Booked Sucessfully" , response.data)
  } catch (error) {
    console.log("Error while booking" , error)
    setIsLoading(false)
  }
 }



// calulate price 
useEffect(() => {
  const handlePriceBooking = async () => {
    try {
      const response = await axios.post(`/api/calulate-price/${roomId}`, {
        checkin: checkin?.toISOString(), 
        checkout: checkout?.toISOString(),
        guests
      });

      setTotalPrice(response.data.totalPrice);
      setnumberOfnights(response.data.numberOfNights)
      setGuests(response.data.guests)

    } catch (error) {
      console.log("Error while getting price", error);
    }
  }
  handlePriceBooking();
}, [checkin, checkout, guests]);


  

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-2">Complete your booking</h1>
      <p className="text-muted-foreground mb-8">Confirm your stay at {roomsdata?.title}</p>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left column - Booking form */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CalendarIcon className="h-5 w-5" />
                Select Dates
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Check-in</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !checkin && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {checkin ? format(checkin, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={checkin}
                        onSelect={setCheckin}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Check-out</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !checkout && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {checkout ? format(checkout, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={checkout}
                        onSelect={setCheckout}
                        initialFocus
                        disabled={checkin ? { before: checkin } : undefined}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Guests</label>
                <Select value={guests} onValueChange={setGuests}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select guests" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6].map(num => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} 
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
          
         
         
        </div>
        
        {/* Right column - Summary */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Home className="h-5 w-5" />
                Booking Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4 mb-4">
                <div className="h-20 w-20 bg-muted rounded-md overflow-hidden">
                  <img 
                    src={roomsdata?.images} 
                    alt={roomsdata?.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold">{roomsdata?.title}</h3>
                  <p className="text-sm text-muted-foreground">{roomsdata?.location}</p>
                  <div className="flex items-center mt-1">
                    <Badge variant="secondary" className="flex items-center gap-1">
                    <h2>{totalPrice}</h2>
                    </Badge>
                  </div>
                </div>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">
                   Nights 
                  </span>
                  <span>{numberOfNights}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Guests </span>
                  <span> {guests}</span>
                </div>
                <Separator className="my-2" />
                
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹ {totalPrice}</span>
                </div>
              </div>
              
              <Button 
                className="w-full mt-6" 
                size="lg"
                onClick={handleBooking}
                disabled={isLoading}
              >
                {isLoading ? "Processing..." : "Confirm Booking"}
              </Button>
               <p className="text-xs text-muted-foreground text-center mt-4">
               Total price = price per night × number of nights × number of guests
              </p>

            <p className="text-xs text-muted-foreground text-center mt-4">
  {"You won't be charged until the host accepts your request"}
</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Cancellation Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Free cancellation for 48 hours. After that, cancel before check-in and get a 50% refund, minus the service fee.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}