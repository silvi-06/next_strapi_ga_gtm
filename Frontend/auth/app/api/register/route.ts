import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL!;

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { username, email, password } = body
        const response = await fetch(`${BASE_URL}/api/auth/local/register`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                username,
                email,
                password
            })
        })

        const data = await response.json()

        return NextResponse.json({
            message: 'User Added.',
            success: true,
            data
        }, { status: 201 })

    } catch (e: any) {
        return NextResponse.json({
            message: "Internal Server Error.",
            success: "false",
            error: e.error
        }, { status: 500 })
    }
}
