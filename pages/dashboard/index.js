import Menu from "@/components/dashboard/menu";
import Layout from "@/components/layout";
import React, { useState } from "react";

function Dashboard() {
  let sidebar = React.createRef();
  const [full, setFull] = useState(true);

  const resize = () => {
    setFull(!full);
  }

  return (
    <Layout pageTitle="Dashboard | CNWeb">
      <div className="dashboard bg-background-1 h-screen bg-center bg-cover bg-no-repeat flex items-center justify-center">
        <div className={full ? `sidebar` : `sidebar minimal-size`} ref={sidebar}>
          <Menu />
          <a className={full ? `resize-btn` : `resize-btn minimal-btn`} onClick={resize}>
            <span class="up-arrow"></span>
            <span class="down-arrow"></span>
          </a>
        </div>
        <div className="main-container">

        </div>
      </div>
    </Layout>
  );
}

export default Dashboard;
