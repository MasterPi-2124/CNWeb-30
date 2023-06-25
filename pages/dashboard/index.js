import Menu from "@/components/dashboard/menu";
import Layout from "@/components/layout";
import Link from "next/link";
import React, { useState } from "react";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const token = cookies.get("TOKEN");

function Dashboard() {
  let sidebar = React.createRef();
  const [full, setFull] = useState(true);

  const resize = () => {
    setFull(!full);
  }

  return (
    <Layout pageTitle="Dashboard | CNWeb">
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
              <div className="content">
                <Link href="/dashboard/quizzes">
                  <div className="item-dashboard">
                    Quiz Dashboard
                  </div>
                </Link>
                <Link href="/dashboard/classes">
                  <div className="item-dashboard">
                    Class Dashboard
                  </div>
                </Link>
              </div>
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
    </Layout >
  );
}

export default Dashboard;
