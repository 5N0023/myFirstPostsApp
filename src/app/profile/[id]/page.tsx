
"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { UploadButton } from "../../../utils/uploadthing";
import "@uploadthing/react/styles.css";



export default function UserProfile({params}: any) {
    const router = useRouter();
    const [loading,setLoading]= useState(true)
    const [imageUrl, setUserImage] = useState<string>("/usersImages/default.webp");
    const getUserDetails = async () => {
        const res = await axios.get("/api/users/me");
        setData(res.data.data.username);
        if(res.data.data.profilePic && res.data.data.profilePic.length > 0)
            setUserImage(res.data.data.profilePic);
    }

    const [data, setData] = useState(null);
    useEffect(() => {
        getUserDetails();
    },[imageUrl])
    const [userExist, setUserExist] = useState(false);

    const userExistCheck = async () => {
        const res = await axios.post("/api/users/search/", {username: params.id});
        if (res.status === 200) {
            setUserExist(true);
        }
        else {
            setUserExist(false);
        }
    }
    useEffect(() => {
        userExistCheck();
        setLoading(false);

    },[])

    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            router.push("/login");
        }
        catch (error:any) {
            console.log("logout failed :", error.message);
        }
    }
    const updateUserProfilePic = async (url: string) => {
        try {
            const req = {profilePic: url, username: data};
            await axios.post("/api/users/updateProfilePic", req);
            setUserImage(url);
        }
        catch (error:any) {
            console.log("update profile pic failed :", error.message);
        }
    }
    
    if(loading){
        return (
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1>loading...</h1>
            </div>
        );
    }
    if(!userExist){
        return (
            <div className="flex flex-col items-center justify-center py-2">
                <h1>User not found</h1>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center py-2">
            <h1>Profile</h1>
            <img src={imageUrl} alt="user image" className="w-1/3 h-1/4 rounded-full"/>
            <div className=" p-2 rounded bg-orange-500 flex flex-col items-center justify-center text-black">
            <h2 >{params.id}</h2>
                </div>
            {data === params.id ? <div>
            <div className="w-5 p-8 m-8 h-5 flex flex-col items-center justify-center py-2">
            <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res:any) => {
                // Do something with the response
                updateUserProfilePic(res[0].fileUrl);
                }}
                onUploadError={(error: Error) => {
                // Do something with the error.
                console.log(error);
                }}
            />
            </div>
                <div className="flex flex-col items-center justify-center  py-2">
                    <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={logout}>Logout</button>
                </div>
            </div>
            : null}
        </div>
    );
}

        
