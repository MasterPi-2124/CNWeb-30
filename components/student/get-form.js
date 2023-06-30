import React, { useState, useEffect } from "react"
import { instanceCoreApi } from "@/services/setupAxios";

const API = process.env.NEXT_PUBLIC_API

const GetForm = ({ IP, studentName, studentID, quizDetail, classDetail, studentLocation, submit, setSubmit, handleSubmit }) => {
    const [ready, setReady] = useState(false);
    const [event, setEvent] = useState(null);

    useEffect(() => {
        if (quizDetail.formLink === "") {
            console.log(quizDetail.formLink)
            const fakeEvent = {
                preventDefault: () => { },
                target: null,
            }
            console.log("submit", submit);
            handleClick(fakeEvent);
        }
    }, [quizDetail.formLink]);

    useEffect(() => {
        if (submit && event) {
            console.log(event);
            handleSubmit(event);
        }
    }, [submit, event]); // eslint-disable-next-line react-hooks/exhaustive-deps

    const handleClick = (event) => {
        event.preventDefault();
        const data = {
            studentId: studentID,
            studentName: studentName,
            ipAddress: IP
        }
        console.log(data)
        instanceCoreApi.put(`${API}/quizRecords/${quizDetail._id}`, data).then(response => {
            console.log(response.data);
            setSubmit(true);
            setEvent(event);
        }).catch(error => {
            console.error(error);
            setSubmit(false);
        })
    }

    return (
        ready ? (
            <div>
                Quiz Status: {quizDetail.status}<br />
                Class Name: {classDetail.subject} <br />
                Student Name: {studentName} <br />
                Student ID: {studentID} <br />
                Student Location: ({studentLocation.latitude}, {studentLocation.longitude}) <br />
                <iframe src={quizDetail.formLink} width="640" height="534" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
                <button className="ok" style={{ padding: "10px 50px", transitionDuration: "200ms" }} onClick={handleClick} type="submit">
                    Finish
                </button>
            </div>
        ) : (
            <div>
                You will enter the quiz. Finish the q Are you ready?<br />
                Quiz Status: {quizDetail.status}<br />
                Class Name: {classDetail.subject} <br />
                Student Name: {studentName} <br />
                Student ID: {studentID} <br />
                Student Location: ({studentLocation.latitude}, {studentLocation.longitude}) <br />

                <button className="ok" style={{ padding: "10px 50px", transitionDuration: "200ms" }} onClick={() => setReady(true)}>
                    Ready
                </button>
            </div>
        )
    );
};

export default GetForm;