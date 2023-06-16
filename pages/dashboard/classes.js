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
            data.boards.classes.items = res.data.data;
        })
    }
    catch (err) {
        console.error(err);
    }

    props = data;
    console.log(data)
    return {
        props,
    }
}

const ClassesDashboard = (props) => {
    let sidebar = React.createRef();
    const [full, setFull] = useState(true);

    const resize = () => {
        setFull(!full);
    }

    return (
        <Layout pageTitle="Classes | CNWeb">
            <div className="dashboard bg-background-1 h-screen bg-center bg-cover bg-no-repeat flex items-center">
                <div className={full ? `sidebar` : `sidebar minimal-size`} ref={sidebar}>
                    <Menu currentPath={"Dashboard"} minimized={full} />
                    <a className={full ? `resize-btn` : `resize-btn minimal-btn`} onClick={resize}>
                        <span className="up-arrow"></span>
                        <span className="down-arrow"></span>
                    </a>
                </div>
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
a