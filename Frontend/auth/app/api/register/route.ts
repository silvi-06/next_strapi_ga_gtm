import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL!;

export async function POST(request: NextRequest) {
    try {

        const body = await request.json();
        const { username, email, password } = body;

        const strapiRes = await fetch(`${BASE_URL}/api/auth/local/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await strapiRes.json();

        if (!strapiRes.ok) {
            return NextResponse.json(
                {
                    success: false,
                    message: data?.error?.message || "Strapi error",
                },
                { status: strapiRes.status }
            );
        }

        // ✅ CREATE RESPONSE
        const response = NextResponse.json({
            success: true,
            user: data.user,
        });

        // ✅ SET COOKIE HERE
        response.cookies.set("jwt", data.jwt, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        return response;

    } catch (error: any) {

        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            { status: 500 }
        );
    }
}
