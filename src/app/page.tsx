
"use client";
import axios from "axios";
import { Updock } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { UploadButton } from "../utils/uploadthing";

export default function Profile() {
    const router = useRouter();
    const [postsNumber,setPostNumbers] = useState<number>(10);

    const [posts,setPosts] = useState<any>([]);
    const [refresh,setRefresh] = useState<boolean>(false);
    const [postDesc, setPostDesc] = useState<string>("")
    const [postImageUrl,setPostImageUrl] =useState<string>("");
    const [error, setError] = useState<string>("");
    const [disable,setDisable] = useState<boolean>(false);
    const [_id,set_id] = useState<string>("");
    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            router.push("/login");
        }
        catch (error:any) {
            console.log("logout failed :", error.message);
        }
    }
    const [data, setData] = useState(null);
    const getUserDetails = async () => {
        const res = await axios.get("/api/users/me");
        setData(res.data.data.username);
        set_id(res.data.data._id);
    }

    const handlePostInput = (e: any) => {
        setPostDesc(e.target.value);
    }
    const getPosts = async () => {
        const res = await axios.post("/api/posts/getLastPosts",{postNumber : postsNumber});
        setPosts(res.data.posts);
    }
    const createNewPost = async ()=>{
        setRefresh(true);
        if((postDesc.length === 0 && postImageUrl.length === 0) || disable)
        {
            setError("post must have desc or image");
            return;
        }
        const NewPost ={username:data ,desc:postDesc,img:postImageUrl}
        try{
            setDisable(true);
            const res = await axios.post("/api/posts/newPost",NewPost)
            if(res)
                setRefresh(false);
            console.log(res);
        }
        catch(err)
        {
            console.log(err);
        }
        setPostDesc("");
        setPostImageUrl("");
        setDisable(false);
    }

    const likePost = async (postID:string)=>{
        try{
            const res = await axios.post("/api/posts/likePost",{postID:postID, _id:_id});
            setRefresh(!refresh);
        }
        catch(err)
        {
            console.log(err);
        }
    }

    useEffect(() => {
        getUserDetails();
    },[])
    useEffect(() => {
        getPosts();
    },[refresh , postsNumber])

    return (
        <main className="flex flex-col items-center justify-center w-full h-full">
            <div className="flex flex-row  bg-black h-16 w-full">
                <div className="flex  items-center justify-center w-1/3 h-full  bg-blue-800 ">
                <Link className="text-black flex  items-center justify-center  font-bold text-2xl w-full h-full " href={`/`}>HOME</Link>
                </div>
                <div className="flex  items-center justify-center w-1/3 h-full   bg-white">
                <Link className="text-black flex  items-center justify-center  font-bold text-2xl w-full h-full bg-green-800 " href={`/profile/${data}`}>my profile</Link>
                    </div>
                <div className="flex  items-center justify-center w-1/3 h-full   bg-red-500 font-bold">
            <button className=" text-black text-2xl w-full h-full " onClick={logout}>
                logout
                </button>
                    </div>
            </div>
            <div className="flex-col items-center justify-center py-2 w-full px-2">
                <h1 className="text-black py-2">New Post : </h1>
                <h1 className="text-black py-2">desc : </h1>
                <input className="text-black py-2 px-4 rounded-lg border-2 border-black w-full h-32" type="text" placeholder="desc " onChange={handlePostInput} value={postDesc} />
                <div className="flex px-4 py-4">
                    <UploadButton
                    endpoint="imageUploader"
                    onClientUploadComplete={(res:any) => {
                        setPostImageUrl(res[0].fileUrl);
                    }}
                    onUploadError={(error: Error) => {
                    console.log(error);
                }}
                />
                </div>
                {postImageUrl.length ? (
                    <div className="flex flex-row items-center justify-center w-32 h-32 py-2 px-2">
                    <img className="w-full h-full" src={postImageUrl} alt="post img" />
                    </div>
                    ) : null}
                {error.length ? (
                    <h1 className="text-red-500">{error}</h1>
                ) : null}
                <div className="w-32 px-4">
                <button className="py-2 bg-blue-800 text-white   w-full h-full" onClick={createNewPost}>Post</button>
                    </div>
                    <div className="w-32 px-4 py-4 flex justify-center items-center">
                        <button className="py-2 bg-blue-800 text-white   w-full h-full" onClick={()=>setRefresh(!refresh)}>refresh</button>
                    </div>
                <div className="flex flex-col items-center justify-center w-2/4 px-2 py-8">
                {posts.length !== 0 ? posts.map((post: any, key: number) => {
                    return (
                        <div className="flex flex-col items-center justify-center py-2 m-2 w-full px-2 border-2 border-black" key={key}>
                            <div className="flex flex-row items-center justify-center py-2 w-full px-2 border-2 border-blue-500 bg-slate-500">
                            <Link className="text-black flex  items-center justify-center  font-bold text-2xl w-full h-full " href={`/profile/${post.username}`}>{post.username}</Link>
                            </div>
                            <div className="flex flex-row items-center justify-center py-2 w-full px-2 border-2 border-blue-500 bg-slate-500">
                            <h1 className="text-black py-2"> At: {new Date(post.createdAt).toLocaleString()}</h1>
                                </div>
                            { post.desc.length ? (
                            <h1 className="text-black py-2 bg-slate-400 w-full h-full px-2  flex flex-row items-center justify-center">{post.desc}</h1>) : null}
                            {post.img.length ? (
                                <img className="w-1/2 h-1/2 py-2" src={post.img} alt="post img" />
                            ) : null}
                            <div id="Likes" className="flex flex-row items-center justify-center py-2 w-full px-2 border-2 border-blue-500 bg-slate-500">
                                <h1 className="text-black py-2 px-2">Likes: {post.likes.length}</h1>
                                {post.likes.includes(_id) ? (
                                    <button className="py-2 bg-blue-800 text-white   w-full h-full" onClick={()=>likePost(post._id)}>unlike</button>
                                ) : (
                                    <button className="py-2 bg-blue-800 text-white   w-full h-full" onClick={()=>likePost(post._id)}>like</button>
                                )}
                            </div>
                        </div>
                    );
                }) : <h1>no posts</h1>}
                    </div>
                    <div className="flex flex-row items-center justify-center py-2 m-2 w-full px-2 border-2 border-black">
                        <button className="py-2 bg-blue-800 text-white   w-full h-full" onClick={()=>setPostNumbers(postsNumber+5)}>load more</button>
                        </div>
            </div>
        </main>
    );
}