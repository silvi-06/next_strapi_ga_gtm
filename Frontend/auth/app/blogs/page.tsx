import BlogButtons from "@/components/BlogButtons";
import { getBlog } from "@/lib/strapi";

export default async function Blogs() {
    const res = await getBlog()
    console.log(res.data)
    const blogs = res.data || []

    return (
        <div>
            <center>
                <h3>All Blogs</h3>
            </center>

            {blogs.map((blog: any) => (
                <div key={blog.id} style={{ background: 'white', color: 'black', border: "1px solid black", padding: "10px", margin: "10px" }}>
                    <h4>{blog.Title}</h4>

                    <p>
                        {blog.Content?.[0]?.children?.[0]?.text || "No content"}
                    </p>

                    <small>
                        Author: {blog.user?.email}
                    </small>

                    <BlogButtons id={blog.documentId} />
                </div>
            ))}
        </div>
    )
}
