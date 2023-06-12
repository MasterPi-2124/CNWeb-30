import Layout from "@/components/layout";
import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentQuiz from "@/components/student/student-quiz";
import { useRouter } from "next/router";
const API = process.env.NEXT_PUBLIC_API

export async function getServerSideProps(context) {
    let props = {};
    const quizID = context.params.quiz_id;

    try {
        await axios.get(`${API}/quizzes/${quizID}`).then((res) => {
            try {
                const quizData = res.data.data;
                props = {
                    quizDetail: quizData,
                    classDetail: quizData._class
                }
            } catch (error) {
                console.log(err);
            }
        })
    }
    catch (err) {
        console.error(err);
    }

    return {
        props,
    }
}


function QuizForm(props) {
    const router = useRouter();
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');

    useEffect(() => {
        const { lat, lon } = router.query;
        if (lat && lon) {
            setLatitude(lat);
            setLongitude(lon);
        }
    }, [router.query]);

    return (
        <Layout pageTitle="Quiz | CNWeb-30">
            <div className="dashboard bg-background-1 h-screen bg-center bg-cover bg-no-repeat flex items-center">
                <StudentQuiz quizDetail={props.quizDetail} classDetail={props.classDetail} checkLat={latitude} checkLon={longitude}/>
            </div>
        </Layout>
    );
}

export default QuizForm;
