import Menu from "@/components/dashboard/menu";
import Layout from "@/components/layout";
import React, { useState, useEffect } from "react";
import Dashboard from "@/components/dashboard/dashboard";
import data from "@/assets/data/dashboard.json";
import axios from "axios";
import Link from "next/link";
import { BoardProvider } from '@/components/dashboard/context';
import Cookies from "universal-cookie";

const cookies = new Cookies();
const API = process.env.NEXT_PUBLIC_API;
const token = cookies.get("TOKEN");

const ClassesDashboard = () => {
    let sidebar = React.createRef();
    const [full, setFull] = useState(true);
    const [props, setProps] = useState(data);

    const resize = () => {
        setFull(!full);
    }

    console.log(token)

    useEffect(() => {
        try {
            axios.get(
                `${API}/classes?groupBy=semester`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            ).then((res) => {
                let classes = [];
                let columns = [];
                console.log(res);
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
                setProps(data);
                console.log(data)
            })
        }
        catch (err) {
            console.error(err);
        }
    }, [])

    return (
        <Layout pageTitle="Classes | CNWeb">
            <div className="dashboard bg-[#212121] h-screen bg-center bg-cover bg-no-repeat flex items-center">
                {token ? (
                    <>
                        {console.log("ahoho", props)}
                        <div className={full ? `sidebar` : `sidebar minimal-size`} ref={sidebar}>
                            <Menu currentPath={"Dashboard"} minimized={full} />
                            <a className={full ? `resize-btn` : `resize-btn minimal-btn`} onClick={resize}>
                                <span className="up-arrow"></span>
                                <span className="down-arrow"></span>
                            </a>
                        </div>
                        <div className="main-container">
                            <BoardProvider data={props} type="classes" token={token}>
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

export default ClassesDashboard;