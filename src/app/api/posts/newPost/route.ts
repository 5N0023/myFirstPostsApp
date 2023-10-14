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
                const savedPost = await newPost.save();
                const res = NextResponse.json({message: 'Post created successfully', succes : true}, {status: 200});
                res.headers.set('Cache-Control', 'no-store, max-age=0');
                return res;
            }
            catch (error:any) {
                return NextResponse.json({error: error.message}, {status: 500});
            }
}