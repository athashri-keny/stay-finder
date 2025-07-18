import { NextResponse } from "next/server";

export const SucessResponse = (data: any , status: number = 200) => {
return NextResponse.json({success: true  , data } , {status})
}