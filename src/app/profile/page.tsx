
"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Profile() {
    const router = useRouter();
    const [data, setData] = useState(null);
    const logout = async () => {
        try {
            await axios.get("/api/users/logout");
            router.push("/login");
        }
        catch (error:any) {
            console.log("logout failed :", error.message);
        }
    }
    const getUserDetails = async () => {
        const res = await axios.get("/api/users/me");
        console.log("user details :", res.data);
        setData(res.data.data.username);
    }
    return (
        <div className="bg-black flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className=" text-white text-2xl font-bold">profile</h1>
            <h2 className="text-white"> {data ? <Link href={`/profile/${data}`}>{data} </Link> : "no data"} </h2>
        <button className=" text-red-500 animate-bounce" onClick={logout}>
            logout
            </button>
            <button className="text-white" onClick={getUserDetails}>
                get user details
            </button>
        </div>
    );
}