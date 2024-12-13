import React, { useState, useEffect } from "react"
import axios from "axios"

const Register = () => {
    // State variables to store form input values and display errors
    const [email, setEmail] = useState("")
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [repeatedPassword, setRepeatedPassword] = useState("")
    const [ip, setIp] = useState("")
    const [showPasswordHint, setShowPasswordHint] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        getIP()
    }, [])

    // Function to fetch the user's IP address
    const getIP = async () => {
        try {
            const response = await axios.get(
                "https://api.ipify.org/?format=json",
            )
            setIp(response.data.ip)
        } catch (error) {
            console.error("Error fetching IP:", error)
        }
    }

    // Validates whether a password meets the specified criteria
    const isPasswordValid = password => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/
        return passwordRegex.test(password)
    }

    // Handles the focus event on the password input field to show password hint
    const handlePasswordFocus = () => {
        setShowPasswordHint(true)
    }

    // Handles the blur event on the password input field to hide password hint
    const handlePasswordBlur = () => {
        setShowPasswordHint(false)
    }

    // Handles the form submission
    const handleSubmit = async e => {
        e.preventDefault()

        // Form validation: checks if fields are filled and passwords match
        if (
            email !== "" &&
            username !== "" &&
            isPasswordValid(password) &&
            password === repeatedPassword
        ) {
            try {
                // Sends a registration POST request with user data
                const response = await axios.post(
                    `${process.env.REACT_APP_API_BASE_URL}/api/register`,
                    {
                        email: email,
                        password: password,
                        ip: ip,
                        referer: "None",
                        referrals: 0,
                        timestamp: Date.now(),
                        username: username,
                    },
                )
                console.log(response.data.token)
            } catch (error) {
                console.error("Error registering:", error)
                setError(
                    "An error occurred while registering. Please try again later.",
                )
            }
        } else {
            setError("Please fill in all fields correctly.")
        }
    }

    return (
        <div>
            <h1>Registration</h1>

            {/* Display error message if registration error */}
            {error && <p className="error">{error}</p>}

            <form onSubmit={handleSubmit}>
                {/* Email input field */}
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                </div>
                {/* Username input field */}
                <div>
                    <label>Name</label>
                    <input
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        required
                    />
                </div>
                {/* Password input field with focus and blur events */}
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        onFocus={handlePasswordFocus}
                        onBlur={handlePasswordBlur}
                        required
                    />
                    {/* Display password hint if requirements not met */}
                    {showPasswordHint && !isPasswordValid(password) && (
                        <p className="password-hint">
                            Password must be at least 8 characters long and
                            contain at least one uppercase letter and one digit.
                        </p>
                    )}
                </div>
                {/* Repeat password input field */}
                <div>
                    <label>Repeat Password</label>
                    <input
                        type="password"
                        value={repeatedPassword}
                        onChange={e => setRepeatedPassword(e.target.value)}
                        required
                    />
                </div>
                {/* Submit button */}
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default Register
