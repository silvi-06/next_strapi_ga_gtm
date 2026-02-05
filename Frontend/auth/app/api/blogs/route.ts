import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const BASE_URL = 'http://localhost:4001'

export async function GET(request: NextRequest) {
    try {

        const cookiestore = await cookies()
        const JWT = cookiestore.get('jwt')?.value

        console.log('cookie: ',
            JWT
        )
        const res = await fetch(`${BASE_URL}/api/blogs?populate[user]=true`, {
            headers: {
                Authorization: `Bearer ${JWT}`
            }
        })

        const data = await res.json()
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'Internal Server Error.',
            error
        }, { status: 500 })
    }
}