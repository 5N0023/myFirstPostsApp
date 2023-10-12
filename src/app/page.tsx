"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

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
        setData(res.data.data.username);
    }
    useEffect(() => {
        getUserDetails();
    },[])
    
    return (
      <main>

        <div className="bg-black flex flex-row  min-h-screen py-2 justify-center">
          <div className="border-2 w-1/3 h-1/4 text-10xl  flex flex-col items-center  content-center justify-center py-2 bg-black">
            <h1 className=" text-white text-2xl font-bold p-2 m-2">Home</h1>
            </div>
            <div className="border-2 w-1/3 h-1/4 text-10xl  flex flex-col items-center  content-center justify-center py-2 bg-black">
            <Link href={`/profile/${data}`} className="w-full h-full justify-center items-center flex">
            <h2 className="text-white text-2xl font-bold p-2 m-2 w-"> My Profile </h2></Link>
            </div>
            <div className="border-2 w-1/3 h-1/4 text-10xl  flex flex-col items-center  content-center justify-center py-2 bg-black">
        <button className=" text-red-500 text-2xl font-bold p-2 m-2" onClick={logout}>
            logout
            </button>
        </div>
        </div>
      </main>
    );
}