
"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function Profile() {
    const router = useRouter();
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
    }
    useEffect(() => {
        getUserDetails();
    },[])
    
    return (
        <main>
            <div className="flex flex-row  bg-black h-16 w-full">
                <div className="flex  items-center justify-center w-1/3 h-full  bg-blue-800">
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
        </main>
    );
}