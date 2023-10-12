import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import {NextRequest, NextResponse} from 'next/server';
import bcryptjs from 'bcryptjs';

connect()

export async function POST (request: NextRequest)
{
            try {
                const reqBody = await request.json()
                const {username, email, password} = reqBody;
                const user = await User.findOne({email});
                if (user) {
                    return NextResponse.json({message: 'Email already exists'}, {status: 400});
                }
                const user2 = await User.findOne({username});
                if (user2) {
                    return NextResponse.json({message: 'Username already exists'}, {status: 400});
                }
                const salt = await bcryptjs.genSalt(10);
                const hashedPassword = await bcryptjs.hash(password, salt);
                const newUser = new User({
                    username,
                    email,
                    password: hashedPassword
                });
                const savedUser = await newUser.save();

                return NextResponse.json({message: 'User created successfully', succes : true,savedUser}, {status: 201});

            }
            catch (error:any) {
                return NextResponse.json({error: error.message}, {status: 500});
            }
}


