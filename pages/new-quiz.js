import Menu from "@/components/dashboard/menu";
import Layout from "@/components/layout";
import React, { useState } from "react";
import NewQuiz from "@/components/new-quiz/new-quiz"
// import { getServerSession } from "next-auth";
// import { NextAuth } from "@/pages/api/[...nextauth]";

function Dashboard() {
  let sidebar = React.createRef();
  const [full, setFull] = useState(true);

  const resize = () => {
    setFull(!full);
  }

  return (
    <Layout pageTitle="New Quiz | Dashboard">
      <div className="dashboard bg-background-1 h-screen bg-center bg-cover bg-no-repeat flex items-center">
        <div className={full ? `sidebar` : `sidebar minimal-size`} ref={sidebar}>
          <Menu currentPath={"New Quiz"} minimized={full} />
          <a className={full ? `resize-btn` : `resize-btn minimal-btn`} onClick={resize}>
            <span className="up-arrow"></span>
            <span className="down-arrow"></span>
          </a>
        </div>
        <div className="main-container">
          <NewQuiz />
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
