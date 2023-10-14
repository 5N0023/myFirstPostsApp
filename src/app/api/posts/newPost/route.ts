import {connect} from '@/dbConfig/dbConfig';
import Posts from '@/models/postModel';
import {NextRequest, NextResponse} from 'next/server';

connect()

export async function POST (request: NextRequest)
{
            try {
                const reqBody = await request.json()
                const {username, desc, img} = reqBody;
                const newPost = new Posts({
                    username,
                    desc,
                    img
                });
                console.log(newPost);
                const savedPost = await newPost.save();
                return NextResponse.json({message: 'Post created successfully', succes : true}, {status: 200});
            }
            catch (error:any) {
                return NextResponse.json({error: error.message}, {status: 500});
            }
}