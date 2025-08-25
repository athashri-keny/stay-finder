'use client'

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {  ImagePlus } from "lucide-react";
import axios from 'axios';
import { AddpropertySchema } from '@/Schemas/Addpropertyschema';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useRouter } from "next/navigation"
import { useDebounceValue } from 'usehooks-ts'
import { Skeleton } from '@/components/ui/skeleton';


function Page() {
const [loading , setloading] = useState(false)
const [location , setlocation] = useState("")
const [locationsuggestion ,  setlocationsuggestions] = useState([])

 const [deboncedLocation] = useDebounceValue(location , 1000) // extracts element 

const router =  useRouter()

  type AddPropertySchema  = z.infer<typeof AddpropertySchema>

  const form = useForm<AddPropertySchema>(    {
    resolver: zodResolver(AddpropertySchema), 
    defaultValues: {
      title: '',
      description: '',
      location: '',
      price: '',
      images: [],
      amenities: '',
      availableDates: {
        from: new Date(),
        to: new Date()
      }
    }
  });

useEffect(() => {
  // pervent unnesscary api calls 
if (!deboncedLocation || deboncedLocation.length < 2) {
  setlocationsuggestions([])
  return // exits 
}
  const getLocationSuggestion = async () => {

    setloading(true);
    try { 
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search`,
        {
          params: {
            q: deboncedLocation,
            format: "json",
            // addressdetails: 1,
            limit: 5,
            countrycodes: "IN",
          },
          timeout: 5000,
        },
        
      );
      setlocationsuggestions(response.data);
      console.log(response.data)
    } catch (error) {
      console.log("Error while fetching location suggests", error);
    } finally {
      setloading(false);
    }
  };

  getLocationSuggestion();
}, [deboncedLocation]);

  const onSubmit = async (data: AddPropertySchema) => {
    setloading(true)
   const formdata = new FormData()

 formdata.append("title" , data.title)
  formdata.append("description" , data.description),
  formdata.append("location", data.location);
 formdata.append("price", String(data.price)); // brower always requires a string 
  formdata.append("amenities", data.amenities);

  formdata.append("availableDates.from", data.availableDates.from.toISOString());
formdata.append("availableDates.to", data.availableDates.to?.toISOString() || "");  


   for(const image of data.images) {
      formdata.append("images" , image)
   }


    try {
      const response = await axios.post('/api/addproperty' , formdata ,
        {
          headers: {"Content-Type": "multipart/form-data"}
        }
      )
      console.log("Property added sucessfully" , response.data)
      toast.success("Property added sucessfully")
      router.push('/dashboard')
      

    
    } catch (error) {
      console.log("Error while " , error)
    }
    finally{
      setloading(false)
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-black rounded-2xl shadow-sm border">
      <h1 className="text-2xl font-bold mb-6">Add New Property</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
          
          {/*  Title */}
           <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Title</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter a title for your property" className="resize-none" {...field} />
                </FormControl>
                <FormDescription> Write a catchy title that describes your space and location (e.g., "Luxury Villa with Pool" or "Budget-Friendly Apartment Downtown")</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />


          {/* Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe your property..." className="resize-none" {...field} />
                </FormControl>
                <FormDescription> Describe your space, amenities, and neighborhood. Mention what makes it special - WiFi, parking, nearby attractions, house rules, etc.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            {/* Location */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input
                    className='p-5'
                    placeholder="Enter location" {...field}
                    value={location}
                    onChange={(e) => {
                      field.onChange(e)
                      setlocation(e.target.value)
                    }}
                    />
                  </FormControl>
                  <FormDescription>  Enter your property's location - include neighborhood, city, and nearby landmarks to help guests find and choose your place.</FormDescription>
                     {loading ? (
  <div className="space-y-2 mt-1">
    <Skeleton className="h-6 w-full rounded-md" />
    <Skeleton className="h-6 w-full rounded-md" />
    <Skeleton className="h-6 w-full rounded-md" />
  </div>
) : (
  locationsuggestion.length > 0 && (
    <div className="absolute bg-black  border rounded-md mt-20  w-full shadow ">
      {locationsuggestion.map((sulg, id) => (
        <div
          key={id}
          className="p-2 hover:bg-white-100 cursor-pointer"
          onClick={() => {
            setlocation(sulg.display_name);
            field.onChange(sulg.display_name);
            setlocationsuggestions([]);
          }}
        >
          {sulg.display_name}
        </div>
      ))}
    </div>
  )
)} 

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Price */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price per night</FormLabel>
                  <FormControl>
                    <Input placeholder="₹" type="number" {...field} />
                  </FormControl>
                  <FormDescription> Price your property competitively. Too high = fewer bookings, too low = less profit. Check similar listings nearby.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>


          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                

            {/* Available Dates (Simple Range) */}
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="availableDates.from"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Available From</FormLabel>
                    <FormControl>
                       <Input
                        type="date"
                          {...field}
                          // TODO: Check this out how it works 
                          value={field.value ? field.value.toISOString().split('T')[0] : ''} // Always valid string
                        onChange={e => field.onChange(new Date(e.target.value))}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="availableDates.to"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Available To</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                          {...field}
                          value={field.value ? field.value.toISOString().split('T')[0] : ''} // Always valid string
                        onChange={e => field.onChange(new Date(e.target.value))}
                        onBlur={field.onBlur}
                        name={field.name}
                        ref={field.ref}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Image Upload */}
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Property Images</FormLabel>
                <FormControl>
                  <label className="border border-dashed rounded-lg p-6 text-center cursor-pointer hover:bg-gray-50 transition">
                    <Input
                      type="file"
                      className="hidden"
                      onChange={(e) => field.onChange(e.target.files)}
                    />
                    <ImagePlus className="mx-auto h-10 w-10 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">Click to upload or drag and drop</p>
                  </label>
                </FormControl>
                <FormDescription>Upload high-quality images for better visibility.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button type="submit" className="px-8 py-2 text-lg">Add Property</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default Page;

// 
// flow of debonce value 
// Step 1: Extract string from hook

// const [debouncedLocation] = useDebounceValue(location, 1000)
// // debouncedLocation = "New York" (string)


// // Step 2: Send that string to API
// const response = await axios.get('...', {
//   params: { q: debouncedLocation } // "New York"
// })


// // Step 3: API returns array of location objects
// console.log(response.data) 
// [
//   {display_name: "New York, NY"}, 
//   {display_name: "New York, England"}, 
//   {display_name: "New York Mills"}
// ]