import { NextRequest, NextResponse } from "next/server";
import Post from "@/models/postModel";
import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

connect();
export const revalidate=0 ;
export const dynamic = "force-dynamic";

// like post
export  async function  POST (req: NextRequest) {
    try {
        const reqBody = await req.json();
        const { postID, _id } = reqBody;
        const post = await Post.findById(postID);
        if (!post) {
            return NextResponse.json({ message: "Post not found" }, { status: 404 });
        }
        const user = await User.findById(_id);
        if (!user) {
            return NextResponse.json({ message: "User not found" }, { status: 404 });
        }
        if (post.likes.includes(_id)) {
            await post.updateOne({ $pull: { likes: _id } });
            await user.updateOne({ $pull: { likedPosts: postID } });
            return NextResponse.json({ message: "Post disliked" }, { status: 200 });
        }
        else {
            await post.updateOne({ $push: { likes: _id } });
            await user.updateOne({ $push: { likedPosts: postID } });
            return NextResponse.json({ message: "Post liked" }, { status: 200 });
        }
    }
    catch(error: any){
        return NextResponse.json({message: error.message},{status: 500});
    }
}
