import Menu from "@/components/dashboard/menu";
import Layout from "@/components/layout";
import React, { useState } from "react";
import Dashboard from "@/components/dashboard/dashboard";
import data from "@/components/dashboard/data.json";
import axios from "axios";
import { BoardProvider } from '@/components/dashboard/context';

const API = process.env.NEXT_PUBLIC_API;

export async function getServerSideProps() {
    let props = {};
    
    try {
        await axios.get(`${API}/classes?groupBy=semester`).then((res) => {
            let classes = [];
            let columns = [];
            res.data.data.map((semester, id) => {
                semester._classes.map(item => {
                    classes.push(item);
                })
                columns.push({
                    "name": semester.semester,
                    "color": "#123456",
                    "items": semester._classes.map(item => item._id)
                })
            })
        data.boards.classes.items = classes;
        data.boards.classes.columns = columns;
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

const ClassesDashboard = (props) => {

    return (
        <Layout pageTitle="Classes | CNWeb">
            <div className="dashboard bg-[#212121] h-screen bg-center bg-cover bg-no-repeat flex items-center">
                <Menu currentPath={"Dashboard"} />
                <div className="main-container">
                    <BoardProvider data={props} type="classes" >
                        <Dashboard />
                    </BoardProvider>
                </div>
            </div>
        </Layout>
    );
}

export default ClassesDashboard;