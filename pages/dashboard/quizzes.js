import axios from "axios";
import React, { useState } from "react";
import Layout from "@/components/layout";
import Menu from "@/components/dashboard/menu";
import Dashboard from "@/components/dashboard/dashboard";
import { BoardProvider } from '@/components/dashboard/context';
import data from "@/components/dashboard/data.json";

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
    return (
        <Layout pageTitle="Quizzes | CNWeb">
            <div className="dashboard bg-[#212121] h-screen bg-center bg-cover bg-no-repeat flex items-center">
                <Menu currentPath={"Dashboard"} />
                <div className="main-container">
                    <BoardProvider data={props} type="quizzes" >
                        <Dashboard />
                    </BoardProvider>
                </div>
            </div>
        </Layout>
    );
}

export default QuizzesDashboard;
