import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL!;

export async function POST(request: NextRequest) {
    try {

        if (!BASE_URL) {
            return NextResponse.json(
                { success: false, message: "STRAPI URL missing" },
                { status: 500 }
            );
        }

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

        console.log("STRAPI RESPONSE:", data);

        if (!strapiRes.ok) {
            return NextResponse.json(
                {
                    success: false,
                    message: data?.error?.message || "Strapi error",
                    error: data,
                },
                { status: strapiRes.status }
            );
        }

        return NextResponse.json({
            success: true,
            jwt: data.jwt,
            user: data.user,
        });

    } catch (error: any) {

        console.error("REGISTER ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            { status: 500 }
        );
    }
}
