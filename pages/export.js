import Menu from "@/components/dashboard/menu";
import Layout from "@/components/layout";
import React, { useState } from "react";
import Export from "@/components/export"

function ExportPage() {
  let sidebar = React.createRef();
  const [full, setFull] = useState(true);

  const resize = () => {
    setFull(!full);
  }

  return (
    <Layout pageTitle="Export | Dashboard">
      <div className="dashboard bg-[#212121] h-screen bg-center bg-cover bg-no-repeat flex items-center">
        <div className={full ? `sidebar` : `sidebar minimal-size`} ref={sidebar}>
          <Menu currentPath={"Export"} minimized={full} />
          <a className={full ? `resize-btn` : `resize-btn minimal-btn`} onClick={resize}>
            <span className="up-arrow"></span>
            <span className="down-arrow"></span>
          </a>
        </div>
        <div className="main-container">
          <Export />
        </div>
      </div>
    </Layout>
  );
}

export default ExportPage;