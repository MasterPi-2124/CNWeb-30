import Menu from "@/components/dashboard/menu";
import Layout from "@/components/layout";
import Link from "next/link";
import React, { useState } from "react";


function Dashboard() {
  let sidebar = React.createRef();
  const [full, setFull] = useState(true);

  const resize = () => {
    setFull(!full);
  }

  return (
    <Layout pageTitle="Dashboard | CNWeb">
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
            <div className="quiz-dashboard">
              <Link href="/dashboard/quizzes">
                Quiz Dashboard
              </Link>
            </div>
            <div className="quiz-dashboard">
              <Link href="/dashboard/classes">
                Class Dashboard
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
