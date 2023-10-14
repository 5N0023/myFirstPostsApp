//getLastPosts.ts

import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import Post from "@/models/postModel";
import { connect } from "@/dbConfig/dbConfig";

connect();
// check if user exists
export  async function  GET (req: NextRequest) {
    try {
        // get last 10 posts
        const posts = await Post.find().sort({ createdAt: -1 }).limit(10);
        if(!posts)
            return NextResponse.json({message: "posts not found"},{status: 202});
        else 
            return NextResponse.json({message: "posts found", posts},{status: 200});
    }
    catch(error: any){
        return NextResponse.json({message: error.message},{status: 500});
    }

}