"use client";

import React, { use, useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import Link from "next/link";

export default function login(){

    const router = useRouter();
    const [user,setUser]= React.useState({
        username:"",
        password:"",
    })
    const [loginFailed,setLoginFailed]= React.useState("")
    const [buttonDisabled,setButtonDisabled]= React.useState(false) 
    const onLogin = async () => {
        try{
            const response = await axios.post("/api/users/login",user);
            router.push("/");
        }
        catch(error: any){
            setLoginFailed(error.response.data.message);
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
        <div className="bg-black flex  items-center w-screen h-screen justify-center">
            <span className="circle animate-loader animation-delay-400"></span>

        <div className="border-2 w-2/4 h-2/4 text-10xl flex flex-col items-center  content-center justify-center py-2 bg-black">
        <div className="flex justify-center p-6">
        <h1 className="text-4xl font-bold flex w-full h-full jusitfy-center text-white">{"login"}</h1>
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

        <label className=" text-white p-3" htmlFor="password"></label>
        <input
         className="border-2 border-black p-2 rounded-md"
         placeholder="password"
         id="password"
         type="password"
         value={user.password}
         onChange={(e) => setUser({...user, password: e.target.value})}
         />
            <div>
            {loginFailed.length ? <div className="text-red-500 flex   justify-center">{loginFailed}</div> : null}
                </div>
         </div>
            <div className="flex justify-center p-3">
                <button onClick={onLogin} className="hover:cursor-pointer hover:border-3 border-2 hover:border-white border-black bg-white w-64 h-12 text-black hover:bg-black hover:text-white  rounded-md" disabled={buttonDisabled}>
                    login
                </button>
            
            </div>
            <div className="flex justify-center p-3 content-center">
                <button className="hover:cursor-pointer hover:border-3 border-2 hover:border-white border-black bg-white w-64 h-12 text-black hover:bg-black hover:text-white  rounded-md">
                    <Link href="/signup" className="w-full h-full flex justify-center items-center">
                        signup
                    </Link>
                </button>
            </div>
            </div>
    </div>
    )
}