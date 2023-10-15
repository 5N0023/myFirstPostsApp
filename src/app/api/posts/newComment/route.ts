

import {connect} from '@/dbConfig/dbConfig';
import Posts from '@/models/postModel';
import User from '@/models/userModel';
import {NextRequest, NextResponse} from 'next/server';

connect()

export async function POST (request: NextRequest)
{
            try {
                const reqBody = await request.json()
                const { postID , _id ,comment, createdAt } = reqBody;
                const post = await Posts.findById(postID);
                if (!post) {
                    return NextResponse.json({ message: "Post not found" }, { status: 404 });
                }
                const user = await User.findById(_id);
                const username = user.username;
                const newComment = {
                    comment: comment,
                    postedBy: _id,
                    username: username,
                    createdAt: createdAt,
                }
                await post.updateOne({$push: {comments: newComment}});
                const res = NextResponse.json({message: 'Comment created successfully', succes : true}, {status: 200});
              
                return res;
            }
            catch (error:any) {
                return NextResponse.json({error: error.message}, {status: 500});
            }
}