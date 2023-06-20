import React, { useState } from "react"
import axios from "axios";

const API = process.env.NEXT_PUBLIC_API

const GetForm = ({ IP, studentName, studentID, quizDetail, classDetail, studentLocation }) => {
    const [ready, setReady] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = {
            studentId: studentID,
            studentName: studentName,
            ipAddress: IP,
            isValid: true,
            note: "OK"
        }
        console.log(data)
        axios.put(`${API}/quizRecords/${quizDetail._id}`).then(response => {
             console.log(response.data);
             setSubmitted(true);
        }).catch(error => {
            console.error(error);
            setSubmitted(false)
        })
    }

    return (
        <>
            {ready ? (
            <div>
                ahihi this is form <br />
                Quiz Status: {quizDetail.status}<br />
                Class Name: {classDetail.subject} <br />
                Student Name: {studentName} <br />
                Student ID: {studentID} <br />
                Student Location: ({studentLocation.latitude}, {studentLocation.longitude}) <br />
                <iframe src="https://forms.gle/1dvnTdPR2F5sTsPS9" width="640" height="534" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
                <button type="submit" onClick={handleSubmit}>Finish</button>
            </div>
            ) : (
                <div>
                    You will enter the quiz, and it will last for 15 minutes. Are you ready?<br />
                    <button onClick={() => setReady(true)}>Ready</button>
                </div>
            )}
        </>


    );
};

export default GetForm;