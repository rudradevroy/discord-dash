import { NextRequest, NextResponse } from "next/server";
import clientPromise from "../../../../lib/mongodb";
import User from "../../../../models/user";
import { hash } from "bcryptjs";
import { Error } from "mongoose";
import { IUser } from "../../../../types/db";
import dbConnect from "../../../../lib/dbConnect";

type ResponseData = {
  message: string;
  error: string;
};

export async function POST(req: Request) {
  await dbConnect().catch((error) =>
    NextResponse.json({ message: "not workign" })
  );

  if (req.method === "POST") {
    //check if body exists
    if (!req.body) {
      return NextResponse.json({ message: "Data is missing" }, { status: 404 });
    } else {
      // The main function that handles the auth
      const { fullName, email, password } = await req.json();
      console.log(fullName, email, password);

      // search for user in DB
      const userExists = await User.findOne({ email });
      console.log(userExists);

      if (userExists) {
        return NextResponse.json({ message: "User exists" }, { status: 409 });
      }

      if (!password) {
        return NextResponse.json(
          { message: "please supply post body" },
          { status: 400 }
        );
      }

      if (password.length < 6) {
        return NextResponse.json(
          { message: "Password should be min 6 characters" },
          { status: 409 }
        );
      }

      const hashedPassword = await hash(password, 12);
      //hash password and create a new user in DB
      const u = await User.create({
        fullName,
        email,
        password: hashedPassword,
      });
      return NextResponse.json({ message: "ok" });
    }
  } else {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }
}

