
import React from "react"
import { Input } from "@nextui-org/react";

const GetID = ({ quizDetail, classDetail, studentID, studentName, setStudentID, handleSubmit }) => {

    return (
        <>
            <h1>Welcome to Class {classDetail.codename}!</h1>
            <p>Subject: {classDetail.subject} - {classDetail.semester}</p>
            <br />
            <form className="form" onSubmit={handleSubmit}>
                <label>Hello {studentName}, what&apos;s your ID?</label>
                <Input
                    width="186px"
                    label="Your full ID"
                    type="number"
                    onChange={(e) => setStudentID(e.target.value)}
                />
                <button type="submit">Continue</button>
            </form>
        </>
    );
};

export default GetID;