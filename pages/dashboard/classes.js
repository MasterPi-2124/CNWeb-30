import Menu from "@/components/dashboard/menu";
import Layout from "@/components/layout";
import React, { useState, useEffect } from "react";
import Dashboard from "@/components/dashboard/dashboard";
import data from "@/assets/data/dashboard.json";
import { instanceCoreApi } from "@/services/setupAxios";
import Link from "next/link";
import { BoardProvider } from '@/components/dashboard/context';
import validToken from "@/services/validToken";
import Cookies from "universal-cookie";

const API = process.env.NEXT_PUBLIC_API;

const ClassesDashboard = () => {
    const cookies = new Cookies();
    const [token, setToken] = useState(cookies.get("TOKEN"))
    const [props, setProps] = useState(data);

    useEffect(() => {
        const token = cookies.get("TOKEN");
        if (validToken(token)) {
            setToken(token);
        } else {
            setToken(null);
        }

    }, [token]);

    useEffect(() => {
        try {
            instanceCoreApi.get(
                `${API}/classes?groupBy=semester`,
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
    }, []);

    return (
        <Layout pageTitle="Classes | CNWeb">
            <div className="dashboard bg-[#212121] h-screen bg-center bg-cover bg-no-repeat flex items-center">
                {token ? (
                    <>
                        {console.log("ahoho", props)}
                        <Menu currentPath={"Dashboard"} />
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