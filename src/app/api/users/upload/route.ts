import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import {join} from 'path';


export    async function POST(request: NextRequest) {
    try
    {
        const data = await request.formData();
        const file :File | null = data.get('file') as unknown as File;
        const username:string = data.get('username') as unknown as string;
        if(!file)
            return NextResponse.json({message:"No file uploaded"},{status:400});
        if(!username)
            return NextResponse.json({message:"No username provided"},{status:400});
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const currentPath = process.cwd();
        const path = join(currentPath,'public',"usersImages",username+'.jpeg');
        await writeFile(path, buffer);
        return NextResponse.json({message:"File uploaded"},{status:200});
    }
    catch(err)
    {
        console.log(err);
        return NextResponse.json({message:"Internal server error"},{status:500});
    }

}