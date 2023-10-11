import { NextResponse } from "next/server"; 



export async function GET() {
    try {
        const response = NextResponse.json({ message: "logout success" }, { status: 200 });
        response.cookies.set("token", "", { httpOnly: true });
        return response;
    }
    catch (error: any) {
        console.log("logout failed :", error.message);
    }
}