"use client";

import { get } from 'http';
import { use, useEffect, useState } from 'react';
import axios from 'axios';
import { redirect, useRouter } from 'next/navigation';
import { render } from 'react-dom';



export default function UserProfile({params}: any) {
    const router = useRouter();
    const [loading,setLoading]= useState(true)
    let imageUrl = "/usersImages/" + params.id + ".jpeg";
    const [imageExist, setImage] = useState(false);
    const fetchImaeg =  () => {
         fetch(imageUrl)
        .then(res => {
            if (res.status === 200) {
                setImage(true);
            }
            else {
                setImage(false);
            }
        })
    }
    useEffect(() => {
        fetchImaeg();
    },[])
    const [data, setData] = useState(null);
    const getUserDetails = async () => {
        const res = await axios.get("/api/users/me");
        setData(res.data.data.username);
    }
    useEffect(() => {
        getUserDetails();
    },[])
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
    const[File, setFile] = useState<File>();
    const[fileError, setFileError] = useState<string>("");

    useEffect(() => {
        if(File){
            if(File.size > 1024 * 1024 * 5){
                setFileError("File size should be less than 5mb");
            }
            else if(File.type !== "image/jpeg" && File.type !== "image/png"){
                setFileError("File format is incorrect");
            }
            else{
                setFileError("");
            }
        }
    });
    const uploadImage = async (e : any) => {
        e.preventDefault();
        if(!File || fileError.length > 0)
            return;
        try {
            const data = new FormData();
            data.set("file", File);
            data.append("username", params.id);
            const res = await fetch("/api/users/upload", {
                method: "POST",
                body: data
            });
        }
            catch (error:any) {
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
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1>User not found</h1>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            { imageExist ? <img src={imageUrl} alt="user image" className="w-1/3 h-1/4 rounded-full"/> : <img src="/usersImages/default.png" alt="user image" className="w-1/3 h-1/4 rounded-full"/>}
            <div id="upload picture">
            </div>
            <h2 className=" p-2 ml-2 rounded bg-orange-500 text-black">{params.id}</h2>
            {data === params.id ? <div>
                    <input type="file" name="file" id="file" className="" onChange= {(e) => setFile(e.target.files![0])}/>
                    <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={uploadImage}>Upload</button>
                    <button className=" bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={logout}>Logout</button>
                    {fileError ? <div className="text-red-500">{fileError}</div> : null}
            </div>
            : null}
        </div>
    );
}