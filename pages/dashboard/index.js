import Menu from "@/components/dashboard/menu";
import Layout from "@/components/layout";
import Link from "next/link";
import React, { useState } from "react";


function Dashboard() {
  return (
    <Layout pageTitle="Dashboard | CNWeb">
      <div className="dashboard bg-[#212121] h-screen bg-center bg-cover bg-no-repeat flex items-center">
        <Menu currentPath={"Dashboard"} />
        <div className="main-container">
          <div className="content">
            <div className="item-dashboard">
              <Link href="/dashboard/quizzes">
                Quiz Dashboard
              </Link>
            </div>
            <div className="item-dashboard">
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
