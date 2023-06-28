import React, { useState, useEffect } from "react";
import { instanceCoreApi } from "@/services/setupAxios";

const API = process.env.NEXT_PUBLIC_API;

const Account = ({ cookies, setToken }) => {
    // const [quizzes, setQuizzes] = useState([]);
    // const [quiz, setQuiz] = useState("");

    // useEffect(() => {
    //     instanceCoreApi.get(`${API}/quizzes`).then(res => {
    //         setQuizzes(res.data.data);
    //     }).catch(err => {
    //         console.error(err);
    //     })
    // }, []);

    return (
        <>
            {new Date().getHours() < 12 ? (
                <div className="left-form text-right w-6/12 pr-5">
                    <h1 className="text-4xl font-bold">Good Morning!</h1>
                    <p className="leading-7 font-thin">Hope you bring pizza!</p>
                </div>
            ) : new Date().getHours() < 18 ? (
                <div className="left-form text-right w-6/12 pr-5">
                    <h1 className="text-4xl font-bold">Good Afternoon!</h1>
                    <p className="leading-7 font-thin">How is it going?</p>
                </div>
            ) : (
                <div className="left-form text-right w-6/12 pr-5">
                    <h1 className="text-4xl font-bold">Good Evening!</h1>
                    <p className="leading-7 font-thin">How was your day?</p>
                </div>
            )}

            <button onClick={() => {
                cookies.remove("TOKEN");
                setToken(null);
            }}>
                Sign Out
            </button>
        </>
    )
};

export default Account;