import Menu from "@/components/dashboard/menu";
import Layout from "@/components/layout";
import React, { useState, useEffect } from "react";
import QuizDashboard from "@/components/dashboard/quiz/dashboard";

function Dashboard() {
    let sidebar = React.createRef();
    const [full, setFull] = useState(true);

    const resize = () => {
        setFull(!full);
    }

    // const getQuizzes = async () => {
    //     try {
    //         let classes = await axios.get(`${API}/quizzes`).then((res) => {
    //             setClasses(res.data.data)
    //         })
    //         console.log(classes)
    //     }
    //     catch (err) {
    //         console.error(err);
    //     }
    // }

    // useEffect(() => {
    //     getQuizzes();
    // });

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
                    <div className="content">
                        <QuizDashboard />
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Dashboard;
