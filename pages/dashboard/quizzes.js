import axios from "axios";
import React, { useState, useEffect } from "react";
import Layout from "@/components/layout";
import Menu from "@/components/dashboard/menu";
import Dashboard from "@/components/dashboard/dashboard";
import Link from "next/link";
import { BoardProvider } from '@/components/dashboard/context';
import data from "@/assets/data/dashboard.json";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const API = process.env.NEXT_PUBLIC_API;
const token = cookies.get("TOKEN");

const QuizzesDashboard = () => {
    let sidebar = React.createRef();
    const [full, setFull] = useState(true);
    const [props, setProps] = useState(data);

    const resize = () => {
        setFull(!full);
    }

    useEffect(() => {
        try {
            axios.get(
                `${API}/quizzes/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            ).then((res) => {
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
                setProps(data);
            })
        }
        catch (err) {
            console.error(err);
        }
    }, [])

    return (
        <Layout pageTitle="Quizzes | CNWeb">
            <div className="dashboard bg-[#212121] h-screen bg-center bg-cover bg-no-repeat flex items-center">
                {token ? (
                    <>
                        <div className={full ? `sidebar` : `sidebar minimal-size`} ref={sidebar}>
                            <Menu currentPath={"Dashboard"} minimized={full} />
                            <a className={full ? `resize-btn` : `resize-btn minimal-btn`} onClick={resize}>
                                <span className="up-arrow"></span>
                                <span className="down-arrow"></span>
                            </a>
                        </div>
                        <div className="main-container">
                            <BoardProvider data={props} type="quizzes" token={token} >
                                <Dashboard token={token} />
                            </BoardProvider>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="main-container">
                            <div className="content">
                                <p>You are not logged in. Please log in to continue.</p>
                                <Link href="/login">Log In</Link>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </Layout>
    );
}

export default QuizzesDashboard;
