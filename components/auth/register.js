import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';

const RegisterForm = ({ currentPath }) => {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        // TODO: handle form submission
    };
    return (
        <div className="auth-form flex flex-row items-center">
            {new Date().getHours() < 12 ? (
                <div className="left-form text-right w-6/12 pr-5">
                    <h1 className="text-4xl font-bold">Good Morning!</h1>
                    <p className="leading-7 font-thin">Welome to our service!</p>
                </div>
            ) : new Date().getHours() < 18 ? (
                <div className="left-form text-right w-6/12 pr-5">
                    <h1 className="text-4xl font-bold">Good Afternoon!</h1>
                    <p className="leading-7 font-thin">Welome to our service!</p>
                </div>
            ) : (
                <div className="left-form text-right w-6/12 pr-5">
                    <h1 className="text-4xl font-bold">Good Evening!</h1>
                    <p className="leading-7 font-thin">Welome to our service!</p>
                </div>
            )}
            <div className="separator w-px h-full ml-5" />
            <div className="right-form w-3/5">
                <form onSubmit={handleSubmit} className="mt-8 flex flex-col">
                    <input
                        type="text"
                        className="placeholder-gray-200 h-10 font-thin text-white"
                        id="name"
                        placeholder="Name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                    />
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
                        placeholder="New Password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <input
                        type="password"
                        className="placeholder-gray-200 h-10 font-thin text-white"
                        // id="password"
                        placeholder="Type password again"
                        // value={password}
                        // onChange={(event) => setPassword(event.target.value)}
                    />

                    <button type="submit" className="h-12 bg-blue w-full font-thin text-lg">Create Account</button>
                </form>

                <div className="separator flex items-center text-center">Or</div>
                <button type="button" className="h-12 bg-blue w-full font-thin text-lg">Connect with Google</button>
                <button type="button" className="h-12 bg-blue w-full font-thin text-lg" onClick={() => router.push('/login')}>Already have an account? Log In</button>
            </div>


        </div>
    );
};

export default RegisterForm;
