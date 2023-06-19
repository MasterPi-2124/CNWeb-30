import Image from "next/image";
import Logo from "@/assets/logo/cnweb-30.png";
import { Input, Switch } from "@nextui-org/react";
import axios from "axios";
import React, { useState } from "react"

const API = process.env.NEXT_PUBLIC_API;

const NewClass = () => {
    const [submitted, setSubmitted] = useState(false);
    const [classID, setClassID] = useState(0);
    const [subject, setSubject] = useState("");
    const [semester, setSemester] = useState(0);
    const [totalStudent, setTotalStudent] = useState(0);
    const [description, setDescription] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const data = {
            codename: classID,
            subject: subject,
            semester: semester,
            studentCount: totalStudent,
            note: description
        }

        console.log(data)
        axios.post(`${API}/classes`, data).then(response => {
            console.log(response.data);
            setSubmitted(true);
            setClassID(0);
            setSubject("");
            setSemester(0);
            setTotalStudent(0);
            setDescription("");
        }).catch(error => {
            console.error(error)
            setSubmitted(false);
        })
    };

    return (
        <>
            {!submitted ? (
                <div className="content">
                    <h1>Create a new quiz</h1>
                    <Image src={Logo}></Image>
                    <form className="form" onSubmit={handleSubmit}>

                        <Input
                            width="186px"
                            label="Class ID"
                            type="number"
                            placeholder="713412"
                            onChange={(e) => setClassID(e.target.value)}
                        />

                        <Input
                            width="186px"
                            label="Subject"
                            placeholder="CN Web"
                            onChange={(e) => setSubject(e.target.value)}
                        />

                        <Input
                            width="186px"
                            label="Semester"
                            placeholder="20222"
                            type="number"
                            bordered
                            onChange={(e) => setSemester(e.target.value)}
                        />


                        <Input
                            width="186px"
                            label="totalStudent"
                            placeholder="50"
                            type="number"
                            bordered
                            onChange={(e) => setTotalStudent(e.target.value)}
                        />


                        <Input
                            width="186px"
                            label="Description"
                            placeholder="A note here"
                            onChange={(e) => setDescription(e.target.value)}
                        />

                        {console.log(`Class ID: ${classID}`)}
                        {console.log(`Subject: `, subject)}
                        {console.log(`Semester: `, semester)}
                        {console.log(`Total Student: `, totalStudent)}
                        {console.log(`Description: `, description)}

                        <button type="submit">Create</button>
                    </form>
                </div>
            ) : (
                <div className="content">
                    <h1>Class {classID} is created!</h1>
                    <p>You can get the QR code by going to Dashboard - Classes</p>
                    <button>Let&apos;s go!</button>
                </div>
            )}
        </>

    );
};

export default NewClass;