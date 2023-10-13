"use client";

import React, { use, useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { Finlandica } from "next/font/google";
import Link from "next/link";

const emailpattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const passwordpattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
const usernamepattern = /^[a-zA-Z0-9]+$/;

function signupCheck(user: any) {
    if (user.username.length === 0 || user.password.length === 0 || user.email.length === 0) {
        return "Please fill in all fields"
    }
    if (!usernamepattern.test(user.username)) {
        return "Username must only contain letters and numbers";
    }
    if (!emailpattern.test(user.email)) {
        return "Please enter a valid email";
    }
    if (!passwordpattern.test(user.password)) {
        return "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }
        
    return "";
}


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
        if (signupCheck(user) !== "") {
            setSignupFailed(signupCheck(user));
            return;
        }
        if(user.password.length < 8){
            setSignupFailed("Password must be at least 8 characters long");
            return;
        }

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
            </div>
         <div>
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