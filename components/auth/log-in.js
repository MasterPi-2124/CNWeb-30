import React, { useState, useEffect } from "react";
import Image from "next/image";
import CNWeb from "@/assets/logo/cnweb-30.png";
import Link from "next/link";

const LogInForm = ({ currentPath }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        // TODO: handle form submission
    };
    return (
        <div className="form">
            <h1>Welcome Back!</h1>
            <p>Welcome Back!</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="checkbox"
                        id="remember-me"
                        checked={rememberMe}
                        onChange={(event) => setRememberMe(event.target.checked)}
                    />
                    <label htmlFor="remember-me">Remember Me</label>
                </div>
                <button type="submit">Sign In</button>
            </form>

            <hr />
            <button type="submit">Continue with Google</button>
            <button type="submit">Don't have an account? Sign Up</button>
            
        </div>
    );
};

export default LogInForm;
