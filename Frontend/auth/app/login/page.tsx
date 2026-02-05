'use client'

import { loginForm } from "@/types/type"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Login() {

    const [loginData, setLoginData] = useState<loginForm>({
        identifier: '',
        password: ''
    })

    const router = useRouter()

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(loginData)
        })

        const data = await response.json()
        console.log(data)
        if (data.success == true) {
            alert("Login successfully")
            router.push('/blogs')
        } else {
            alert(data.error?.message || "Something went wrong")
        }
    }

    return (
        <center>
            <h3>Login Page</h3>

            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                Identifier:
                            </td>
                            <td>
                                <input type="text" name="identifier" value={loginData.identifier} onChange={(e) => setLoginData({ ...loginData, identifier: e.target.value })} />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                Password:
                            </td>
                            <td>
                                <input type="password" name="password" value={loginData.password} onChange={(e) => setLoginData({ ...loginData, password: e.target.value })} />
                            </td>
                        </tr>

                        <tr>
                            <td colSpan={2}>
                                <button>Login</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        </center>
    )
}