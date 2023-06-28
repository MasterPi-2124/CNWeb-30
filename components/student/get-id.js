
import React, { useState } from "react"
import { Input } from "@nextui-org/react";

const GetID = ({ quizDetail, classDetail, studentID, studentName, setStudentID, handleSubmit, IDList }) => {
    const [existed, setExisted] = useState(false);
    console.log(IDList);

    const checkID = (value) => {
        const vv = IDList.find((item) => item === value);
        if (vv) {
            setExisted(true);
        }
        else {
            setExisted(false);
            setStudentID(value);
        }
    }

    return (
        !existed ? (
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
                        onChange={(e) => checkID(e.target.value)}
                    />
                    <button type="submit">Continue</button>
                </form>
            </>

        ) : (
            <>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                    <h1 style={{
                        fontSize: "60px",
                        fontWeight: "700"
                    }}>
                        Gotcha cheater!!
                    </h1>
                    <p style={{
                        fontWeight: "100",
                        fontSize: "20px"
                    }}>
                        Sorry but we only have one chance to try, and you already wasted it lol.
                    </p>
                </div>
            </>
        )
    );
};

export default GetID;