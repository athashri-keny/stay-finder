'use client'

import React from 'react'
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


function Page() {

  type AddPropertySchema  = z.infer<typeof AddpropertySchema>

  const form = useForm<AddPropertySchema>({
    defaultValues: {
      description: '',
      location: '',
      price: 0,
      images: [],
      rating: '',
      amenities: '',
      availableDates: {
        from: new Date,
        to: new Date  
      }
    }
  });

  const onSubmit = async (data: AddPropertySchema) => {
   const formdata = new FormData()

  formdata.append("description" , data.description),
  formdata.append("location", data.location);
 formdata.append("price", data.price.toLocaleString()); // always a string 
  formdata.append("rating", data.rating);
  formdata.append("amenities", data.amenities);

  formdata.append("availableDates.from", data.availableDates.from.toISOString());
formdata.append("availableDates.to", data.availableDates.to?.toISOString() || "");

formdata.append('images' , JSON.stringify(data.images))

    try {
      const response = await axios.post('/api/addproperty' , formdata ,
        {
          headers: {"Content-Type": "multipart/form-data"}
        }
      )
      console.log("Property added sucessfully" , response.data)
    
    } catch (error) {
      console.log("Error while ")
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-black rounded-2xl shadow-sm border">
      <h1 className="text-2xl font-bold mb-6">Add New Property</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          
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
                <FormDescription>Highlight key features and amenities.</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Location */}
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter location" {...field} />
                  </FormControl>
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
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Rating */}
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating</FormLabel>
                  <FormControl>
                    <Input placeholder="0 - 5" type="number" step="0.1" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                           value={field.value ? field.value.toISOString().split('T')[0] : ''} // converting string to date 
                        onChange={e => field.onChange(new Date(e.target.value))}
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
                          value={field.value ? field.value.toISOString().split('T')[0] : ''}
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
                      multiple
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
