import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connect } from "@/dbConfig/dbConfig";

connect();
// check if user exists
export  async function  POST (req: NextRequest) {
    try {
        const reqBody = await req.json();
        const {username,profilePic} = reqBody;
        const user = await User.findOne({username});
        if(!user)
            return NextResponse.json({message: "user not found"},{status: 202});
        else {
            user.profilePic = profilePic;
            await user.save();
            return NextResponse.json({message: "user found", user},{status: 200});
        }

    }
    catch(error: any){
        return NextResponse.json({message: error.message},{status: 500});
    }

}