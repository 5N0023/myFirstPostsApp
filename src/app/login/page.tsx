"use client";

import React, { use, useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";

export default function login(){

    const router = useRouter();
    const [user,setUser]= React.useState({
        username:"",
        password:"",
    })
    const [loading,setLoading]= React.useState(false)
    const [buttonDisabled,setButtonDisabled]= React.useState(false) 
    const onLogin = async () => {
        try{
            setLoading(true)
            const response = await axios.post("/api/users/login",user);
            console.log("login response :",response.data);
            router.push("/");
        }
        catch(error: any){
            console.log("login failed :",error.message);
        }
        finally{
            setLoading(false)
        }
    }

        useEffect(() => {  
            if (user.username.length > 0 && user.password.length > 0) {
                setButtonDisabled(false);
            }
            else {
                setButtonDisabled(true);
            }
        });


    return(
        <div className="bg-black flex flex-col items-center w-screen h-screen justify-center">
            <div className="border-2 w-2/4 h-2/4  flex flex-col items-center  content-center justify-center py-2 bg-black">

        <h1 className="text-2xl font-bold flex jusitfy-center text-white">{loading ? "loading..." : "login"}</h1>
        <label className=" text-white p-3" htmlFor="username">username</label>
        <input
        className="border-2 border-black p-2"
            id="username"
            type="text"
            value={user.username}
            placeholder="username"
            onChange={(e) => setUser({...user, username: e.target.value})}
            />
        <label className=" text-white p-3" htmlFor="password">password</label>
        <input
         className="border-2 border-black p-2"
            placeholder="password"
            id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}
            />
            <div className="flex justify-center p-3">
        <button onClick={onLogin} className=" hover:border-3 border-2 hover:border-white border-black bg-white w-64 h-12 text-black hover:bg-black hover:text-white  rounded-md" disabled={buttonDisabled}>
            login
        </button>
            </div>
            </div>
    </div>
    )
}