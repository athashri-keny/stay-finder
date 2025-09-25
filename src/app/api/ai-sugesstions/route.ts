import axios from "axios";
import { NextRequest , NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    const API_KEY = process.env.HF_API_KEY
    try {


        const {description} = await request.json()
        
        if (!description) {
            return NextResponse.json({
                message: "Description is required!"
            } , {status: 404})
        }

        const response = await axios.post('https://api-inference.huggingface.co/models/sshleifer/distilbart-cnn-12-6' ,
            {inputs: description},
            {
                headers: {
                    Authorization: `Bearer ${API_KEY}`,
                    'Content-Type': 'application/json'
                }
            }
        )

        const summary = response.data

        return NextResponse.json({
            message: "Sucess",
            summary
        } , {status: 200})


    } catch (error) {
        console.log("Error while getting response " , error)
        return NextResponse.json({
            message: "Error while getting response"
        } , {status: 500})
    }
}