
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
        <div className="bg-black flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className=" text-white text-2xl font-bold">profile</h1>
            <h2 className="text-white"> {<Link href={`/profile/${data}`}>My Profile </Link> } </h2>
        <button className=" text-red-500 animate-bounce" onClick={logout}>
            logout
            </button>
        </div>
    );
}