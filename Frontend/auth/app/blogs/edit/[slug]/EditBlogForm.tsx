"use client"

import { useRouter } from "next/navigation"

export default function EditBlogForm({ blog, slug }: any) {
    const router = useRouter()

    async function handleSubmit(e: any) {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)

        console.log('slug which is id:', slug)

        const res = await fetch(`/api/blogs/${slug}`, {
            method: "PUT",
            body: formData
        })
        const json = await res.json()
        console.log("PUT RESPONSE:", json)
        if (json.success == true) {
            router.push('/blogs')
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input
                name="Title"
                defaultValue={blog.Title}
                placeholder="Title"
            />

            <br />

            <textarea
                name="Content"
                defaultValue={blog.Content?.[0]?.children?.[0]?.text}
            />

            <br />

            <button type="submit">Update</button>
        </form>
    )
}
