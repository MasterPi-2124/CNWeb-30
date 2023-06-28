import Layout from "@/components/layout";
import React, { useState, useEffect } from "react";
import { instanceCoreApi } from "@/services/setupAxios";
import StudentQuiz from "@/components/student/student-quiz";
import { decodePath } from "@/services/securePath";

const API = process.env.NEXT_PUBLIC_API;

export async function getServerSideProps(context) {
    let props = {};

    const decodedPath = decodePath(context.params.encoded_quiz_id);
    const quizID = decodedPath.split('?')[0];
    const queryString = decodedPath.split('?')[1];
    const searchParam = new URLSearchParams(queryString);
    const lat = searchParam.get('lat');
    const lon = searchParam.get('lon');

    console.log(quizID, lat, lon)

    try {
        const { data: { data: quizData } } = await instanceCoreApi.get(`${API}/quizzes/${quizID}`);
        const { data: { ip } } = await instanceCoreApi.get('https://api.ipify.org/?format=json');

        props = {
            quizDetail: quizData,
            classDetail: quizData._class,
            IP: ip,
            latitude: lat,
            longitude: lon
        }
    }
    catch (err) {
        console.error(err);
    }
    console.log(props)

    return {
        props,
    }
}

const QuizForm = (props) => {
    console.log("------", props)

    return (
        <Layout pageTitle="Quiz | CNWeb-30">
            <div className="dashboard bg-[#212121] h-screen bg-center bg-cover bg-no-repeat flex items-center">
                <div className="main-container">
                    {Object.keys(props).length > 0 ? (
                        props.quizDetail.status === "In Progress" ? (
                            <StudentQuiz IP={props.IP} quizDetail={props.quizDetail} classDetail={props.classDetail} checkLat={props.latitude} checkLon={props.longitude} />
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
                                    The party was end!!
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


// wuu0yFvAjjb0i1unYM2mT0iGEumunkRX3Q48gKRDsorMQydOLNy5BnFE6DoFACrsH9LqGkSP8ctyg6iZ1QCIfaJ7gAsn4BiOMGJBcP4jCpK1GKQesUrBioeOKp2bkI