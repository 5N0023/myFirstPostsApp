import { NextRequest, NextResponse } from "next/server";
import Post from "@/models/postModel";
import { connect } from "@/dbConfig/dbConfig";

// Initialize the database connection
connect();
export const revalidate=0 ;
export const dynamic = "force-dynamic";

// Check if user exists and return the last 10 posts
export  async function  POST (req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { postNumber } = reqBody;
        const posts = await Post.find().sort({ createdAt: -1 }).limit(postNumber);

        if (!posts || posts.length === 0) {
            return NextResponse.json({ message: "No posts found" }, { status: 404 });
        }

        const res = NextResponse.json({ message: "Posts found", posts }, { status: 200 });
        // vercel cache Disable

        //Cache-Control: s-maxage=60 Vercel-CDN-Cache-Control: max-age=300, s-maxage=1
        res.headers.set('Cache-Control', 's-maxage=0');
        res.headers.set('Vercel-CDN-Cache-Control', 'max-age=0, s-maxage=0');
        
        res.headers.set('X-Vercel-Cache', 'MISS');
        return res;
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
