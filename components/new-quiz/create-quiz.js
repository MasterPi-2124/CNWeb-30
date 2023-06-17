import axios from "axios";
import React, { useState } from "react"
import { Input, Switch } from "@nextui-org/react";
import Image from "next/image";
import Logo from "@/assets/logo/cnweb-30.png";

const API = process.env.NEXT_PUBLIC_API

const CreateQuiz = ({ classSelected, setClassSelected, handleReset }) => {
    const [submitOK, setSubmitOK] = useState(false);
    const [startDate, setStartDate] = useState();
    const [startTime, setStartTime] = useState();
    const [interval, setInterval] = useState(0);
    const [quizzed, setQuizzed] = useState(false);
    const [url, setURL] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const calculateEndTime = (startDate, startTime, interval) => {
            const startDateTime = new Date(`${startDate}T${startTime}`);
            startDateTime.setMinutes(startDateTime.getMinutes() + parseInt(interval));
            const endDateTime = startDateTime.toISOString();
            return endDateTime;
        }
        const startDateTime = new Date(`${startDate}T${startTime}`).toISOString();
        const endDateTime = calculateEndTime(startDate, startTime, interval);
        console.log(startDateTime, endDateTime)

        const data = {
            startTime: startDateTime,
            endTime: endDateTime,
            formLink: url,
            _class: classSelected.classID
        }

        console.log(data)
        axios.post(`${API}/quizzes`, data).then(response => {
            console.log(response.data);
            setStartDate();
            setStartTime();
            setInterval(0);
            setQuizzed(false);
            setURL("");
            setClassSelected({})
            localStorage.setItem("classSelected", JSON.stringify({}))
            console.log(classSelected, startDate, startTime, interval, quizzed, url);
            setSubmitOK(true);
        }).catch(error => {
            console.error(error)
            setSubmitOK(false);
        })
    };

    return (
        <>
            {!submitOK ? (
                <>
                    <h1>Create a new quiz</h1>
                    <Image src={Logo}></Image>
                    <form className="form" onSubmit={handleSubmit}>
                        <label>found class {classSelected.className}!</label>

                        <Input
                            width="186px"
                            label="Date"
                            type="date"
                            onChange={(e) => setStartDate(e.target.value)}
                        />

                        <Input
                            width="186px"
                            label="Time"
                            type="time"
                            onChange={(e) => setStartTime(e.target.value)}
                        />

                        <Input
                            width="186px"
                            label="Interval"
                            type="number"
                            bordered
                            min={0}
                            max={120}
                            onChange={(e) => setInterval(e.target.value)}
                        />

                        <Switch bordered
                            isSelected={quizzed}
                            onChange={(e) => setQuizzed(e.target.checked)}
                        />
                        {console.log(quizzed)}
                        {quizzed ? <Input
                            label="Url"
                            type="url"
                            labelLeft="https://"
                            labelRight=".org"
                            onChange={(e) => setURL(e.target.value)}

                        /> : <Input
                            label="Url"
                            type="url"
                            labelLeft="https://"
                            labelRight=".org"
                            disabled
                        />}
                        {console.log(`Class Name: ${classSelected.className}`)}
                        {console.log(`Start Date: `, startDate)}
                        {console.log(`Start Time: `, startTime)}
                        {console.log(`Interval: `, interval)}
                        {console.log(`URL: `, url)}

                        <button type="submit">Create</button>
                        <button onClick={handleReset}>back</button>
                    </form>
                </>
            ) : (
                <>
                    <h1>The quiz for Class {classSelected.className} is created!</h1>
                    <p>You can get the QR code by going to Dashboard - Quiz - Quiz</p>
                    <button>Let&apos;s go!</button>
                </>
            )}
        </>
    );
};

export default CreateQuiz;