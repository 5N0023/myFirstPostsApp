"use client";

import React, { use, useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { Finlandica } from "next/font/google";


export default function signup() {
    const router = useRouter();
    const [user,setUser]= React.useState({
        email:"",
        password:"",
        username:"",
    })
    const [buttonDisabled,setButtonDisabled]= React.useState(false) 
    const [loading,setLoading]= React.useState(false)
    const onsignup = async () => {
        try{
            setLoading(true)
            const response = await axios.post("/api/users/signup",user);
            console.log("signup response :",response.data);
            router.push("/login");
        }
        catch(error: any){
            console.log("signup failed :",error.message);
        }finally{
            setLoading(false)
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
        <div className="flex flex-col items-cente justify-center min-h-screen py-2">
            <h1 className="text-2xl font-bold">{loading ? "loading..." : "signup"}</h1>
            <hr />
            <label htmlFor="username">username</label>
            <input
                id="username"
                type="text"
                value={user.username}
                placeholder="username"
                onChange={(e) => setUser({...user, username: e.target.value})}
            />
            <label htmlFor="email">email</label>
            <input
                id="email"
                type="email"
                placeholder="email"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
            />
            <label htmlFor="password">password</label>
            <input
                placeholder="password"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
            />
            <button onClick={onsignup}>{buttonDisabled ? "No signup" : "signup"}</button>
        </div>
    );
}