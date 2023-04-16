import { NextResponse } from "next/server";
import dbConnect from "../../../../lib/dbConnect";
import type { NextApiRequest, NextApiResponse } from 'next'

type ResponseData = {
  message: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse){
  try {
    await dbConnect();
    NextResponse.json({message: "Connection established"}).status(200);
  } catch (error) {
    NextResponse.json({message: "Connection failed"}).status(300);
  }
};

