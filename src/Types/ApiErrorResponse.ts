import { NextResponse } from "next/server";
export const errorResponse = (message: string = "Something went wrong", status: number = 400) => {
  return NextResponse.json({ success: false, message }, { status });
};
