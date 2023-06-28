import Layout from "@/components/layout";
import React, { useState, useEffect } from "react";
import { instanceCoreApi } from "@/services/setupAxios";
import StudentQuiz from "@/components/student/student-quiz";
import { useRouter } from "next/router";

const API = process.env.NEXT_PUBLIC_API;

export async function getServerSideProps(context) {
    let props = {};
    const quizID = context.params.quiz_id;

    try {
        await instanceCoreApi.get(`${API}/quizzes/${quizID}`).then((res) => {
            const quizData = res.data.data;
            instanceCoreApi.get('https://api.ipify.org/?format=json').then((response) => {
                const { ip } = response.data;
                props = {
                    quizDetail: quizData,
                    classDetail: quizData._class,
                    IP: ip
                }
            })
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
                    {Object.keys(props).length > 0 ? (
                        props.quizDetail.status === "In Progress" ? (
                            <StudentQuiz IP={props.IP} quizDetail={props.quizDetail} classDetail={props.classDetail} checkLat={latitude} checkLon={longitude} />
                        ) : (
                            <div style={{
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center"
                            }}>
                                <h1 style={{
                                    fontSize: "60px",
                                    fontWeight: "700"
                                }}>
                                    Oh no!
                                </h1>
                                <p style={{
                                    fontWeight: "100",
                                    fontSize: "20px"
                                }}>
                                    Sorry we can only take you half way there, because the server did not want to talk to us lmao.
                                </p>
                            </div>
                        )
                    ) : (
                        <div style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center"
                        }}>
                            <h1 style={{
                                fontSize: "60px",
                                fontWeight: "700"
                            }}>
                                Oh no!
                            </h1>
                            <p style={{
                                fontWeight: "100",
                                fontSize: "20px"
                            }}>
                                Sorry we can only take you half way there, because the server did not want to talk to us lmao.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default QuizForm;
