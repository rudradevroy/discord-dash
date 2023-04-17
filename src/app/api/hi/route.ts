// check if we are connecting to mongo DB

import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";


type ResponseData = {
    message: string
  }
  
  async function GET(request: NextRequest) {
    try {
        await clientPromise
        return NextResponse.json({message: "Connection established"});
    } catch (error) {
        return NextResponse.json({message: "Connection failed"});
    }
  }
  
  export {GET};