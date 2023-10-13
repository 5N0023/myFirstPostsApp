import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import {NextRequest, NextResponse} from 'next/server';
import bcryptjs from 'bcryptjs';

connect()
const emailpattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const passwordpattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const usernamepattern = /^[a-zA-Z0-9]+$/;

export async function POST (request: NextRequest)
{
            try {
                const reqBody = await request.json()
                const {username, email, password} = reqBody;
                if (!username || !email || !password) {
                    return NextResponse.json({message: 'Please fill all fields'}, {status: 400});
                }
                if (!emailpattern.test(email)) {
                    return NextResponse.json({message: 'Invalid email'}, {status: 400});
                }
                if (!passwordpattern.test(password)) {
                    return NextResponse.json({message: 'Password must contain at least 8 characters, one uppercase, one lowercase and one number'}, {status: 400});
                }
                if (!usernamepattern.test(username)) {
                    return NextResponse.json({message: 'Username must contain only letters and numbers'}, {status: 400});
                }
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