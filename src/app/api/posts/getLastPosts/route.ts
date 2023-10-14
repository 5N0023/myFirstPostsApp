import { NextRequest, NextResponse } from "next/server";
import Post from "@/models/postModel";
import { connect } from "@/dbConfig/dbConfig";

// Initialize the database connection
connect();

// Check if user exists and return the last 10 posts
export async function GET(req: NextRequest) {
    try {
        const posts = await Post.find().sort({ createdAt: -1 }).limit(10);

        if (!posts || posts.length === 0) {
            return NextResponse.json({ message: "No posts found" }, { status: 404 });
        }

        const res = NextResponse.json({ message: "Posts found", posts }, { status: 200 });
        res.headers.set('Cache-Control', 's-maxage=0, stale-while-revalidate')
        return res;
    } catch (error: any) {
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
