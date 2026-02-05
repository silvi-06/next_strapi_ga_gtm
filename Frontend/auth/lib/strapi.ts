import { cookies } from "next/headers"

export const BASE_URL = process.env.NEXT_PUBLIC_STRAPI_URL!;

export async function getBlog() {
    const JWT = (await cookies()).get('jwt')?.value
    const response = await fetch(`${BASE_URL}/api/blogs?populate[user]=true`, {
        headers: {
            Authorization: `Bearer ${JWT}`
        }, cache: 'no-store'
    })
    const data = await response.json()
    console.log(data)
    return data
}




// lib/strapi.ts
export async function getBlogByDocumentId(documentId: string) {
    const JWT = (await cookies()).get('jwt')?.value
    const url = `${BASE_URL}/api/blogs?filters[documentId][$eq]=${documentId}`
    console.log("FETCHING:", url)

    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${JWT}`
        }, cache: 'no-store'
    })
    const json = await res.json()

    console.log("STRAPI RESPONSE:", json)

    return json.data[0] || null
}

