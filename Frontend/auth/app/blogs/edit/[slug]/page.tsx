import { getBlogByDocumentId } from "@/lib/strapi"
import EditBlogForm from "./EditBlogForm"

export default async function EditBlog({ params }: { params: Promise<{ slug: string }> }) {

    const { slug } = await params
    console.log(slug)
    const blog = await getBlogByDocumentId(slug)

    return (
        <div>
            <h3>Edit Blog</h3>
            <EditBlogForm blog={blog} slug={slug} />
        </div>
    )
}
