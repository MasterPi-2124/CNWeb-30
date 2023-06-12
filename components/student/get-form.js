import React, { useState } from "react"

const API = process.env.NEXT_PUBLIC_API

const GetForm = ({ studentName, studentID, quizDetail, classDetail, studentLocation }) => {
    const [ready, setReady] = useState(false);

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