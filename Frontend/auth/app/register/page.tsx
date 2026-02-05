'use client'

import { registerForm } from "@/types/type"
import { useState } from "react"

export default function Register() {

    const [registerData, setRegisterData] = useState<registerForm>({
        username: '',
        email: '',
        password: ''
    })

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const response = await fetch(
            '/api/register',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(registerData)
            }
        )

        const data = await response.json()
        console.log(data)

        if (!data.success) {
            alert(data.message);
            return;
        }

        if (data.data.jwt) {
            alert("Registered successfully")
        } else {
            alert(data.error?.message || "Something went wrong")
        }
    }

    return (
        <center>
            <h3>Register page</h3>
            <form onSubmit={handleSubmit}>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                UserName:
                            </td>
                            <td>
                                <input type="text" name="username" value={registerData.username} onChange={(e) => setRegisterData({ ...registerData, username: e.target.value })} />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                Email:
                            </td>
                            <td>
                                <input type="text" name="email" value={registerData.email} onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })} />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                Password:
                            </td>
                            <td>
                                <input type="password" name="password" value={registerData.password} onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })} />
                            </td>
                        </tr>

                        <tr>
                            <td colSpan={2}>
                                <button>Register</button>
                            </td>
                        </tr>

                    </tbody>
                </table>
            </form>
        </center>

    )
}