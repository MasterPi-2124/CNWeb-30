
import React, { useState } from "react"
import { Input } from "@nextui-org/react";

const API = process.env.NEXT_PUBLIC_API

const GetID = ({ quizDetail, classDetail, studentID, studentName, setStudentID, handleSubmit }) => {


    return (
        <>
            <h1>Welcome to Class {classDetail.codename}!</h1>
            <p>Subject: {classDetail.subject} - {classDetail.semester}</p>
            <br />
            <form className="form" onSubmit={handleSubmit}>
                <label>Hello {studentName}, what's your ID?</label>
                <Input
                    width="186px"
                    label="Your full ID"
                    onChange={(e) => setStudentID(e.target.value)}
                />
                <button type="submit">Continue</button>
            </form>
        </>
    );
};

export default GetID;