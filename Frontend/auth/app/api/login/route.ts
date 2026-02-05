import { NextRequest, NextResponse } from "next/server";

const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL!;

export async function POST(request: NextRequest) {
    try {
        console.log("STRAPI URL:", process.env.NEXT_PUBLIC_STRAPI_URL);
        const body = await request.json()
        const { identifier, password } = body

        const response = await fetch(`${BASE_URL}/api/auth/local`, {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
                identifier, password
            })
        })

        const data = await response.json()
        console.log('login data', data)

        if (!data.jwt) {
            return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
        }

        const token = data.jwt

        const res = NextResponse.json({
            success: true,
            message: 'Successfully login.',
            data
        }, { status: 200 })

        res.cookies.set('jwt', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 60 * 60
        })

        return res

    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: 'Internal server error.',
            error
        }, { status: 500 })
    }
}