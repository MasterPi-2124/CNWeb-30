import Menu from "@/components/dashboard/menu";
import Layout from "@/components/layout";
import React, { useState } from "react";
import Logo from "@/assets/logo/cnweb-30.png";
import Image from "next/image";
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
          <div className="content">
            <h1>Let's create a quiz</h1>
            <Image src={Logo} ></Image>
            <div className="form">
              <label>Choose a class to continue</label>

              <button type="button">Continue</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
