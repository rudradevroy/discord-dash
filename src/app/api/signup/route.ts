import { NextRequest, NextResponse } from "next/server"
import clientPromise from "../../../../lib/mongodb"
import User from "../../../../models/user"
import { hash } from "bcryptjs"
import {  Error } from "mongoose"
import { IUser } from "../../../../types/db"


type ResponseData = {
    message: string
    error: string
  }

export async function POST(req: Request){
    await clientPromise.catch(error => NextResponse.json({message: 'not workign'}))

    if (req.method === "POST"){
        //check if body exists 
        if(!req.body){
            return NextResponse.json({message: "Data is missing"},{status: 404})
        }
        else{
            // The main function that handles the auth
            const {fullName, email, password} = req.body
            
            // search for user in DB
            const userExists = await User.findOne({email})

            if(userExists){
                return NextResponse.json({message: "User exists"},{status: 409})
                }

            else{
                if(password.length < 6)
                {
                    return NextResponse.json({ message: "Password should be min 6 characters"},{status: 409})
                }
                else
                {
                    const hashedPassword = await hash(password, 12) 
                    //hash password and create a new user in DB
                    User.create({
                        fullName,
                        email,
                        password: hashedPassword
                    }, (error: unknown, data: IUser) => 
                    {
                        //catch validation error 
                        if (error && error instanceof Error.ValidationError)
                        {
                            for (let field in error.errors)
                            {
                                const msg = error.errors[field].message
                                return NextResponse.json({ error: msg }, {status: 409})
                            }
                        }
                        
                        const user = {
                            email: data.email,
                            fullName: data.fullName,
                            _id: data._id,
                        }

                        return NextResponse.json({success: true, user}, {status: 201})
                    })
                }  
            }
        }
    }   
    else{
        return NextResponse.json({message: "Method not allowed"},{status: 405});
        }
    }