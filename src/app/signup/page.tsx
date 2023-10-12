"use client";

import React, { use, useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { Finlandica } from "next/font/google";
import Link from "next/link";


export default function signup() {
    const router = useRouter();
    const [user,setUser]= React.useState({
        email:"",
        password:"",
        username:"",
    })
    const [signupFailed,setSignupFailed]= React.useState("")
    const [buttonDisabled,setButtonDisabled]= React.useState(false) 
    const onsignup = async () => {
        try{
            const response = await axios.post("/api/users/signup",user);
            router.push("/login");
        }
        catch(error: any){
            setSignupFailed(error.response.data.message);
        }
    }
    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        }
        else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <div className="bg-black flex  items-center w-screen h-screen justify-center">
            <span className="circle animate-loader animation-delay-400"></span>

        <div className="border-2 w-2/4 h-2/4 text-10xl flex flex-col items-center  content-center justify-center py-2 bg-black">
        <div className="flex justify-center p-6">
        <h1 className="text-4xl font-bold flex w-full h-full jusitfy-center text-white">{"SIGNUP"}</h1>
        </div>
        <div>
        <label className=" text-white p-3" htmlFor="username"></label>
        <input
        className="border-2 border-black p-2 rounded-md"
        id="username"
        type="text"
        value={user.username}
        placeholder="username"
        onChange={(e) => setUser({...user, username: e.target.value})}
        />
        </div>


        <div>
        <label className=" text-white p-3" htmlFor="email"></label>
        <input
        className="border-2 border-black p-2 rounded-md"
        id="email"
        type="email"
        value={user.email}
        placeholder="email"
        onChange={(e) => setUser({...user, email: e.target.value})}
        />
        </div>
        <div>
        <label className=" text-white p-3" htmlFor="password"></label>
        <input
         className="border-2 border-black p-2 rounded-md"
         placeholder="password"
         id="password"
         type="password"
         value={user.password}
         onChange={(e) => setUser({...user, password: e.target.value})}
         />
            {signupFailed ? <div className="text-red-500  flex justify-center p-3 content-center">{signupFailed}</div> : null}
         </div>
            <div className="flex justify-center p-3">
                <button onClick={onsignup} className="hover:cursor-pointer hover:border-3 border-2 hover:border-white border-black bg-white w-64 h-12 text-black hover:bg-black hover:text-white  rounded-md"> 
                    signup
                </button>
            
            </div>
            <div className="flex justify-center p-3 content-center">
                <button className="hover:cursor-pointer hover:border-3 border-2 hover:border-white border-black bg-white w-64 h-12 text-black hover:bg-black hover:text-white  rounded-md">
                    <Link href="/login" className="w-full h-full flex justify-center items-center">
                    login
                    </Link>
                </button>
            </div>
            </div>
    </div>
    )
}