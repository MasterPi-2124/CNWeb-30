import Layout from "@/components/layout";
import React, { useState, useEffect } from "react";
import axios from "axios";
import StudentQuiz from "@/components/student/student-quiz";
import { useRouter } from "next/router";
const API = process.env.NEXT_PUBLIC_API;

export async function getServerSideProps(context) {
    let props = {};
    const quizID = context.params.quiz_id;
    const IP = context.req.headers['x-forwarded-for'] || context.req.connection.remoteAddress;

    try {
        await axios.get(`${API}/quizzes/${quizID}`).then((res) => {
            const quizData = res.data.data;
            props = {
                quizDetail: quizData,
                classDetail: quizData._class,
                IP: IP
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

const QuizForm = (props) => {
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
            <div className="dashboard bg-[#212121] h-screen bg-center bg-cover bg-no-repeat flex items-center">
                <div className="main-container">
                    <StudentQuiz IP={props.IP} quizDetail={props.quizDetail} classDetail={props.classDetail} checkLat={latitude} checkLon={longitude} />
                </div>
            </div>
        </Layout>
    );
}

export default QuizForm;
