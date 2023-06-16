import Menu from "@/components/dashboard/menu";
import Layout from "@/components/layout";
import React, { useState } from "react";
import QuizDashboard from "@/components/dashboard/quiz/dashboard";
import data from "@/components/dashboard/data.json";
import axios from "axios";
import { BoardProvider } from '@/components/dashboard/quiz/context';

const API = process.env.NEXT_PUBLIC_API;

export async function getServerSideProps() {
    let props = {};

    try {
        await axios.get(`${API}/quizzes/`).then((res) => {
            data.boards.quizzes.items = res.data.data;
            data.boards.quizzes.columns.map((column, i) => {
                let temp = [];
                res.data.data.map((item, j) => {
                    if (column.name === item.status) {
                        temp.push(item._id);
                    }
                })
                column.items = temp;
            })
        })
    }
    catch (err) {
        console.error(err);
    }

    props = data;
    return {
        props,
    }
}

const QuizzesDashboard = (props) => {
    let sidebar = React.createRef();
    const [full, setFull] = useState(true);

    const resize = () => {
        setFull(!full);
    }

    return (
        <Layout pageTitle="Quizzes | CNWeb">
            <div className="dashboard bg-background-1 h-screen bg-center bg-cover bg-no-repeat flex items-center">
                <div className={full ? `sidebar` : `sidebar minimal-size`} ref={sidebar}>
                    <Menu currentPath={"Dashboard"} minimized={full} />
                    <a className={full ? `resize-btn` : `resize-btn minimal-btn`} onClick={resize}>
                        <span className="up-arrow"></span>
                        <span className="down-arrow"></span>
                    </a>
                </div>
                <div className="main-container">
                    <BoardProvider data={props} type="quizzes" >
                        <QuizDashboard />
                    </BoardProvider>
                </div>
            </div>
        </Layout>
    );
}

export default QuizzesDashboard;
