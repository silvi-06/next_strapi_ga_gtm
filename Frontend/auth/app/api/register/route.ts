import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL!;

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { username, email, password } = body;

        const response = await fetch(`${BASE_URL}/api/auth/local/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await response.json();

        // 🔴 THIS IS THE IMPORTANT PART
        if (!response.ok) {
            return NextResponse.json(
                {
                    message: "Registration failed",
                    success: false,
                    error: data,
                },
                { status: response.status }
            );
        }

        // ✅ Only here means Strapi ACTUALLY succeeded
        return NextResponse.json(
            {
                message: "User Added",
                success: true,
                data,
            },
            { status: 201 }
        );

    } catch (error) {
        return NextResponse.json(
            {
                message: "Internal Server Error",
                success: false,
            },
            { status: 500 }
        );
    }
}
