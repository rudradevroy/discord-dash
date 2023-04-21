import { NextRequest, NextResponse } from "next/server"
import clientPromise from "../../../../lib/mongodb"
import User from "../../../../models/user"
import { hash } from "bcryptjs"
import {  Error } from "mongoose"
import { IUser } from "../../../../types/db"

const handler =async (req: NextRequest, res: NextResponse) => {
    await clientPromise.catch(error => res.json())

    if (req.method === "POST"){
        if(!req.body){
            return NextResponse.json({message: "Data is missing"},{status: 404})
        }
        else{
            // The main function 
            const {fullName, email, password} = req.body
            
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
                    User.create({
                        fullName,
                        email,
                        password: hashedPassword
                    }, (error: unknown, data: IUser) => 
                    {
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

    export default handler