import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { signIn } from "next-auth";

const LogInForm = ({ currentPath }) => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        // TODO: handle form submission
    };
    return (
        <div className="auth-form flex flex-row items-center">
            {new Date().getHours() < 12 ? (
                <div className="left-form text-right w-6/12 pr-5">
                    <h1 className="text-4xl font-bold">Good Morning!</h1>
                    <p className="leading-7 font-thin">Hope you bring pizza!</p>
                </div>
            ) : new Date().getHours() < 18 ? (
                <div className="left-form text-right w-6/12 pr-5">
                    <h1 className="text-4xl font-bold">Good Afternoon!</h1>
                    <p className="leading-7 font-thin">Hope you bring pizza!</p>
                </div>
            ) : (
                <div className="left-form text-right w-6/12 pr-5">
                    <h1 className="text-4xl font-bold">Good Evening!</h1>
                    <p className="leading-7 font-thin">How was your day?</p>
                </div>
            )}
            <div className="separator w-px h-full ml-5" />
            <div className="right-form w-3/5">
                <form onSubmit={handleSubmit} className="mt-8 flex flex-col">
                    <input
                        type="email"
                        className="placeholder-gray-200 h-10 font-thin text-white"
                        id="email"
                        placeholder="Email"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                    <input
                        type="password"
                        className="placeholder-gray-200 h-10 font-thin text-white"
                        id="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <div>
                        <input
                            type="checkbox"
                            id="remember-me"
                            checked={rememberMe}
                            onChange={(event) => setRememberMe(event.target.checked)}
                            style={{ "display": "none" }}
                        />
                        <label for="remember-me" className="select-none cursor-pointer font-thin">
                            <span className="inline-block align-middle relative w-6 h-6 align-middle">
                                <svg className="absolute stroke-2" width="12px" height="9px" viewbox="0 0 12 9">
                                    <polyline points="1 5 4 8 11 1"></polyline>
                                </svg>
                            </span>
                            <span className="ml-2">
                                Remember Me
                            </span>
                        </label>
                    </div>
                    <button type="submit" className="h-12 bg-blue w-full font-thin text-lg">Sign In</button>
                </form>

                <div className="separator flex items-center text-center">Or</div>
                <button type="button" className="h-12 bg-blue w-full font-thin text-lg" onClick={() => signIn()}>Continue with Google</button>
                <button type="button" className="h-12 bg-blue w-full font-thin text-lg" onClick={() => router.push('/register')}>Don&apos;t have an account? Sign Up</button>
                <a className="block font-thin text-center underline w-full">Forgot your password?</a>
            </div>


        </div>
    );
};

export default LogInForm;
