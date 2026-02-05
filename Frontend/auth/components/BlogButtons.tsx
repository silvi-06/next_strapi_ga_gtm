'use client'

import { useRouter } from "next/navigation"

export default function BlogButtons({ id }: { id: string }) {

    const handleDelete = async () => {
        const res = await fetch(`/api/blogs/${id}`, {
            method: 'DELETE'
        })

        if (!res.ok) {
            alert("Delete failed")
            return
        }
        const text = await res.text()

        if (text) {
            const data = JSON.parse(text)
            alert(data.message)
        } else {
            alert("Blog deleted")
        }
    }

    const router = useRouter()
    return (
        <div>
            <button onClick={() => router.push(`/blogs/edit/${id}`)} style={{ cursor: 'pointer', margin: '5px', backgroundColor: 'green', padding: '5px', color: 'white' }}>Edit</button>
            <button onClick={handleDelete} style={{ cursor: 'pointer', margin: '5px', backgroundColor: 'red', padding: '5px', color: 'white' }}>Delete</button>

        </div>

    )
}