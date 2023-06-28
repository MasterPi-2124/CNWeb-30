
import React, { useState } from "react"
import { Input } from "@nextui-org/react";

const API = process.env.NEXT_PUBLIC_API

const GetName = ({ quizDetail, classDetail, studentName, setStudentName, handleSubmit }) => {
    return (
        <>
            <h1>Welcome to Class {classDetail.codename}!</h1>
            <p>Subject: {classDetail.subject} - {classDetail.semester}</p>
            <br />
            <form className="form" onSubmit={handleSubmit}>
                <label>What&apos;s your full name?</label>
                <Input
                    width="186px"
                    label="Your full name"
                    onChange={(e) => setStudentName(e.target.value)}
                />
                <button type="submit">Continue</button>
            </form>
        </>
    );
};

export default GetName;