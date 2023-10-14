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
        const res = NextResponse.json({message: "posts not found"},{status: 202});;
        if(!posts)
            return res;
        else 
        {
            const res = NextResponse.json({message: "posts found", posts},{status: 200});
            res.headers.set('cache: ', 'no-store');
            res.headers.set('Cache-Control', 's-maxage=1, stale-while-revalidate=59')
            res.headers.set('CDN-Cache-Control', 'public, s-maxage=60')
            res.headers.set('Vercel-CDN-Cache-Control', 'public, s-maxage=3600')
            return res;
        }
    }
    catch(error: any){
        return NextResponse.json({message: error.message},{status: 500});
    }

}