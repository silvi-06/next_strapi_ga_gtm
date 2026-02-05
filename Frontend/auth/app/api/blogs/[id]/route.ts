import { BASE_URL } from "@/lib/strapi";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
    const JWT = (await cookies()).get('jwt')?.value

    const { id } = await context.params

    if (!JWT) {
        return NextResponse.json({
            message: "Not Authenticated",

        }, { status: 400 })
    }
    const res = await fetch(`${BASE_URL}/api/blogs/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${JWT}`
        }
    })



    return NextResponse.json({
        message: "Blog deleted",
    }, { status: 200 })
}


export async function PUT(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {

    const { id } = await params
    console.log('put : ', id)
    const cookieStore = cookies()
    const JWT = (await cookieStore).get("jwt")?.value

    const formData = await request.formData()
    const Title = formData.get("Title")
    const Content = formData.get("Content")
    console.log("API RECEIVED:", { Title, Content })

    if (!JWT) {
        return NextResponse.json({ message: "Not authenticated" }, { status: 401 })
    }

    const res = await fetch(`${BASE_URL}/api/blogs/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JWT}`
        },
        body: JSON.stringify({
            data: {
                Title,
                Content: [
                    {
                        type: "paragraph",
                        children: [
                            {
                                type: "text",
                                text: Content
                            }
                        ]
                    }
                ]
            }
        })
    })

    return NextResponse.json({
        message: 'done',
        success: true
    })
}