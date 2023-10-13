import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import {NextRequest, NextResponse} from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect();
let TOKEN_SECRET =process.env.TOKEN_SECRET;

export  async function  POST (req: NextRequest) {
    try {
        const reqBody = await req.json();

        const {username , password} = reqBody;
        if(!username || !password)
            return NextResponse.json({message: "please fill in all fields"},{status: 400});
        const user = await User.findOne({username});
        if(!user)
            return NextResponse.json({message: "user not found"},{status: 404});
        const validPassword = await bcryptjs.compare(password,user.password);
        if(!validPassword)
            return NextResponse.json({message: "invalid password"},{status: 400});

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
        }
        const token = await jwt.sign(tokenData,TOKEN_SECRET!, {expiresIn: "1d"});

        const response = NextResponse.json({message: "login success"},{status: 200});
        response.cookies.set("token",token,{httpOnly: true});
        return response;

    }
    catch(error: any){
        console.log("login failed :",error.message);
    }

}