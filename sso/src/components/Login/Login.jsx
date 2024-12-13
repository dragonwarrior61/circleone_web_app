import React, { useState } from "react"
import axios from "axios"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loginError, setLoginError] = useState(null) // State to manage login error messages

    const handleSubmit = async () => {
        try {
            if (email !== "" && password !== "") {
                const response = await axios.post(
                    `${process.env.REACT_APP_API_BASE_URL}/api/login`,
                    {
                        email,
                        password,
                    },
                )
                const data = response.data

                if (data.token) {
                    localStorage.setItem("userToken", data.token)
                    // Storing the authentication token in localStorage.
                    // Perform redirection or post-login actions here.
                } else {
                    setLoginError(
                        "Invalid credentials. Please check your email and password.",
                    )
                    // Setting an error message in case of invalid credentials
                }
            }
        } catch (error) {
            console.error("Error during login:", error)
            setLoginError(
                "An error occurred during login. Please try again later.",
            )
            // Setting an error message in case of a login error
        }
    }

    return (
        <div>
            <h1>Login</h1>

            <h3>Email</h3>
            <input
                type="email"
                onChange={e => setEmail(e.target.value)}
                value={email}
            />

            <h3>Password</h3>
            <input
                type="password"
                onChange={e => setPassword(e.target.value)}
                value={password}
            />
            {loginError && <p className="error-message">{loginError}</p>}
            {/* Display the error message if loginError is not null */}
            <button onClick={() => handleSubmit()}>Login</button>
        </div>
    )
}

export default Login
