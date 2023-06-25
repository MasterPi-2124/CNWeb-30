import Menu from "@/components/dashboard/menu";
import Layout from "@/components/layout";
import React, { useState } from "react";
import Export from "@/components/export"
import Cookies from "universal-cookie";
import Link from "next/link";

const cookies = new Cookies();
const token = cookies.get("TOKEN");

function ExportPage() {
  let sidebar = React.createRef();
  const [full, setFull] = useState(true);

  const resize = () => {
    setFull(!full);
  }

  return (
    <Layout pageTitle="Export | Dashboard">
      <div className="dashboard bg-[#212121] h-screen bg-center bg-cover bg-no-repeat flex items-center">
        {token ? (
          <>
            <div className={full ? `sidebar` : `sidebar minimal-size`} ref={sidebar}>
              <Menu currentPath={"Export"} minimized={full} />
              <a className={full ? `resize-btn` : `resize-btn minimal-btn`} onClick={resize}>
                <span className="up-arrow"></span>
                <span className="down-arrow"></span>
              </a>
            </div>
            <div className="main-container">
              <div className="content">
                <Export token={token} />
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
    </Layout>
  );
}

export default ExportPage;
